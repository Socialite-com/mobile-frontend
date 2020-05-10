import {SELECT_EVENT_PAGE, SET_EVENT_TYPE} from '../index';

const eventState = {
  type: 'invite',
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
    default:
      return state;
  }
};
