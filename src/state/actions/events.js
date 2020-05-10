import {
  CHANGE_CAROUSEL_HEIGHT,
  TOGGLE_EVENT_CAROUSEL,
  REQUEST_MY_EVENTS,
  RECEIVE_EVENTS,
  TOGGLE_CREATE_STAGE,
  SET_CREATE_PAYLOAD,
  RESET_CREATE_EVENT,
  INVALIDATE_MY_EVENTS,
  QUERY_EVENT_FROM_KEY,
  QUERY_EVENT_FAIL,
  SAVE_EVENT_DATA,
  RESET_EVENT_QUERY,
} from '../index';

import db from '../database';

export function changeCarouselHeight(invites, hosting) {
  let height;
  if (invites === 0 && hosting === 0) height = 100;
  else if (invites >= hosting) height = invites * 316 + 20;
  else height = hosting * 316 + 20;
  return {
    type: CHANGE_CAROUSEL_HEIGHT,
    payload: height,
  };
}

export function toggleCarousel(page) {
  return {
    type: TOGGLE_EVENT_CAROUSEL,
    payload: page,
  };
}

export function requestUserEvents(eventType) {
  return {
    type: REQUEST_MY_EVENTS,
    eventType: eventType,
  };
}

export function receiveEventInvites(events, eventType) {
  return {
    type: RECEIVE_EVENTS,
    payload: {type: eventType, data: events},
    receivedAt: Date.now(),
  };
}

function invalidateUserEvents() {
  return {
    type: INVALIDATE_MY_EVENTS,
  };
}

export function _handlePendingInvites() {
  return (dispatch, getState) => {
    const findEvent = getState().findEvent;
    if (findEvent.newEvent) {
      const eid = findEvent.eventId;
      const uid = getState().user.uid;
      if (findEvent.data === null) return Promise.resolve();
      else if (findEvent.data.creator.uid === uid) return Promise.resolve();
      else {
        return db.addEventToProfile(eid, uid, 'eventInvites');
      }
    } else return Promise.resolve();
  };
}

function shouldFetchUserEvents(state, eventType) {
  const events = state.userEvents[eventType];
  // add condition for firebase data listener
  if (events.data.length === 0 || !events.data) {
    return true;
  } else if (events.isFetching) {
    return false;
  } else {
    return events.didInvalidate;
  }
}

function fetchUserEvents(uid, eventType) {
  return dispatch => {
    dispatch(requestUserEvents(eventType));
    return db
      .getEvents(uid, eventType)
      .then(
        async raw_data =>
          await Promise.all(
            raw_data.map(async event => await db.reselectEventCard(event)),
          ),
      )
      .then(data => dispatch(receiveEventInvites(data, eventType)));
  };
}

export function fetchUserEventsIfNeeded(uid, eventType) {
  return (dispatch, getState) => {
    if (shouldFetchUserEvents(getState(), eventType)) {
      return dispatch(fetchUserEvents(uid, eventType));
    } else {
      return Promise.resolve();
    }
  };
}

export function toggleCreateStage(index) {
  return {
    type: TOGGLE_CREATE_STAGE,
    payload: index,
  };
}

export function setCreatePayload(payload) {
  return {
    type: SET_CREATE_PAYLOAD,
    payload: payload,
  };
}

function resetCreatePayload() {
  return {
    type: RESET_CREATE_EVENT,
  };
}

export function createEvent() {
  return (dispatch, getState) => {
    const uid = getState().user.uid;
    const payload = getState().newEvent.payload;
    return db
      .createEvent(uid, payload)
      .then(() => {
        return Promise.all([
          dispatch(resetCreatePayload()),
          dispatch(invalidateUserEvents()),
        ]);
      })
      .catch(err => Promise.reject(err));
  };
}

function queryNewEvent(key) {
  return {
    type: QUERY_EVENT_FROM_KEY,
    payload: key,
  };
}

export function queryFail(error) {
  return {
    type: QUERY_EVENT_FAIL,
    payload: error,
  };
}

function receiveQuery(data) {
  return {
    type: SAVE_EVENT_DATA,
    payload: {data: data, receivedAt: Date.now()},
  };
}

const _validateCode = barcode => {
  function byteCount(s) {
    return encodeURI(s).split(/%..|./).length - 1;
  }
  // add validation steps for a Socialite event Id
  if (['.', '..', '', null].includes(barcode)) {
    return 'Invalid code';
  } else if (byteCount(barcode) >= 1500) {
    return 'QR encoding is over byte limit.';
  } else if (barcode.includes('/')) {
    return 'Code cannot contain forward slashes.';
  } else {
    return null;
  }
};

export function queryEvent(key) {
  return dispatch => {
    dispatch(queryNewEvent(key));
    let error = _validateCode(key);
    if (error === null) {
      return db
        .getEventData(key)
        .then(d => db.reselectEventCard(d))
        .then(data => dispatch(receiveQuery(data)))
        .catch(() =>
          dispatch(queryFail('Sorry, we could not find your event.')),
        );
    } else {
      dispatch(queryFail(error));
      return Promise.resolve();
    }
  };
}

export function resetEventQuery() {
  return {
    type: RESET_EVENT_QUERY,
  };
}
