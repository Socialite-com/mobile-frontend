import {SELECT_EVENT_PAGE, SET_EVENT_ACTION, SET_EVENT_TYPE} from '../index';

function setEventType(type) {
  return {
    type: SET_EVENT_TYPE,
    payload: type,
  };
}

export function setEventAction(action) {
  return {
    type: SET_EVENT_ACTION,
    payload: action,
  };
}

function setEventData(data) {
  return {
    type: SELECT_EVENT_PAGE,
    payload: data,
  };
}

export function setDefaultAction(type, data) {
  return dispatch => {
    const private_ = data.details.private;
    const paid = data.details.paid;
    // add variable for response status --> confirmed, declined, unknown
    const status = 'unknown';
    switch (type) {
      case 'invite':
        if (paid && status === 'confirmed')
          return dispatch(setEventAction('ticket'));
        else return dispatch(setEventAction(status));
      case 'manage':
        // add logic for publish action
        return dispatch(setEventAction('edit'));
      case 'displayed':
        // maybe add logic for allowing staring / sharing action
        return dispatch(setEventAction('respond'));
    }
  };
}

export function selectEvent(type, data) {
  return async dispatch => {
    await dispatch(setEventType(type));
    // add dispatches to further parse event data --> invites, guests, todos
    await dispatch(setEventData(data));
    await dispatch(setDefaultAction(type, data));
    return Promise.resolve();
  };
}
