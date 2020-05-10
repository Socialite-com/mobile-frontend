import {SELECT_EVENT_PAGE, SET_EVENT_TYPE} from '../index';

function setEventType(type) {
  return {
    type: SET_EVENT_TYPE,
    payload: type,
  };
}

function setEventData(data) {
  return {
    type: SELECT_EVENT_PAGE,
    payload: data,
  };
}

export function selectEvent(type, data) {
  return dispatch => {
    dispatch(setEventType(type));
    // add dispatches to further parse event data --> invites, guests, todos
    dispatch(setEventData(data));
    return Promise.resolve();
  };
}
