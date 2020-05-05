import {
  CHANGE_CAROUSEL_HEIGHT,
  TOGGLE_EVENT_CAROUSEL,
  REQUEST_MY_EVENTS,
  RECEIVE_EVENTS,
  TOGGLE_MODAL,
} from '../constants';

import db from '../database';

export function changeCarouselHeight(invites, hosting) {
  let height;
  if (invites >= hosting) height = invites * 316 + 20;
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
