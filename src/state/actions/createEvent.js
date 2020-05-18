import {
  RESET_CREATE_EVENT,
  SET_CREATE_PAYLOAD,
  TOGGLE_CREATE_STAGE,
} from '../index';

import {invalidateUserEvents} from './events';
import db from '../database';

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
          dispatch(invalidateUserEvents('eventCreations')),
        ]);
      })
      .catch(err => Promise.reject(err));
  };
}
