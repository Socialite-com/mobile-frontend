import {
  SAVE_EVENT_DATA,
  QUERY_EVENT_FROM_KEY,
  QUERY_EVENT_FAIL,
  RESET_EVENT_QUERY,
} from '../index';

const newEventState = {
  eventId: '',
  searching: false,
  newEvent: false,
  queryError: null,
  receivedAt: null,
  data: null,
};

export const addEventReducer = (state = newEventState, action) => {
  switch (action.type) {
    case QUERY_EVENT_FROM_KEY:
      return Object.assign({}, state, {
        searching: true,
        queryError: null,
        eventId: action.payload,
      });
    case SAVE_EVENT_DATA:
      return Object.assign({}, state, {
        newEvent: true,
        searching: false,
        data: action.payload.data,
        receivedAt: action.payload.receivedAt,
      });
    case QUERY_EVENT_FAIL:
      return Object.assign({}, state, {
        queryError: action.payload,
        searching: false,
      });
    case RESET_EVENT_QUERY:
      return Object.assign({}, state, newEventState);
    default:
      return state;
  }
};
