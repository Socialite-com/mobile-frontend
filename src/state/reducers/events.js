import {
  UPDATE_EVENT,
  RECEIVE_EVENTS,
  REQUEST_MY_EVENTS,
  INVALIDATE_MY_EVENTS,
  TOGGLE_EVENT_CAROUSEL,
  CHANGE_CAROUSEL_HEIGHT,
} from '../index';

const userEventState = {
  activeSlide: 0,
  carouselHeight: 50,
  eventInvites: {
    isFetching: false,
    didInvalidate: false,
    data: [],
  },
  eventCreations: {
    isFetching: false,
    didInvalidate: false,
    updatingEvent: false,
    data: [],
  },
};

export const userEventReducer = (state = userEventState, action) => {
  switch (action.type) {
    case TOGGLE_EVENT_CAROUSEL:
      return Object.assign({}, state, {
        activeSlide: action.payload,
      });
    case CHANGE_CAROUSEL_HEIGHT:
      return Object.assign({}, state, {
        carouselHeight: action.payload,
      });
    case REQUEST_MY_EVENTS:
      return Object.assign({}, state, {
        [action.eventType]: {
          ...state[action.eventType],
          didInvalidate: false,
          isFetching: true,
        },
      });
    case RECEIVE_EVENTS:
      return Object.assign({}, state, {
        [action.payload.type]: {
          isFetching: false,
          didInvalidate: false,
          data: action.payload.data,
          lastUpdated: action.receivedAt,
        },
      });
    case INVALIDATE_MY_EVENTS:
      return Object.assign({}, state, {
        eventInvites: {
          ...state.eventInvites,
          didInvalidate: true,
        },
        eventCreations: {
          ...state.eventCreations,
          didInvalidate: true,
        },
      });
    default:
      return state;
  }
};
