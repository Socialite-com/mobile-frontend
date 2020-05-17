import {
  SELECT_EVENT_PAGE,
  SET_EVENT_ACTION,
  SET_EVENT_TYPE,
} from '../index';

const eventState = {
  type: 'invite', // invite, manage, displayed
  action: 'respond', // see envelopeActions.js
  data: {},
};

export const eventPageReducer = (state = eventState, action) => {
  switch (action.type) {
    case SELECT_EVENT_PAGE:
      return Object.assign({}, state, {
        data: action.payload,
      });
    case SET_EVENT_TYPE:
      return Object.assign({}, state, {
        type: action.payload,
      });
    case SET_EVENT_ACTION:
      return Object.assign({}, state, {
        action: action.payload,
      });
    default:
      return state;
  }
};
