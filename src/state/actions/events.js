import {
  CHANGE_CAROUSEL_HEIGHT,
  TOGGLE_EVENT_CAROUSEL,
  INVALIDATE_MY_EVENTS,
  REQUEST_MY_EVENTS,
  RECEIVE_EVENTS,
} from '../index';

import db from '../database';
import R from 'res/R';

export function changeCarouselHeight(cards) {
  let height;
  if (cards === 0) height = R.constants.screenHeight * 0.55;
  else height = cards * 316 + 20;
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

export function invalidateUserEvents(type) {
  return {
    type: INVALIDATE_MY_EVENTS,
    payload: type,
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
      .then(data => {
        dispatch(receiveEventInvites(data, eventType));
      });
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
