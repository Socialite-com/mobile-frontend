import {
  TOGGLE_CREATE_STAGE,
  SET_CREATE_PAYLOAD,
  RESET_CREATE_EVENT,
} from '../index';

const newEventState = {
  stage: 'EventType',
  payload: {},
};

export const createEventReducer = (state = newEventState, action) => {
  switch (action.type) {
    case TOGGLE_CREATE_STAGE:
      return Object.assign({}, state, {
        stage: action.payload,
      });
    case SET_CREATE_PAYLOAD:
      return Object.assign({}, state, {
        payload: action.payload,
      });
    case RESET_CREATE_EVENT:
      return Object.assign({}, state, {
        newEventState,
      });
    default:
      return state;
  }
};
