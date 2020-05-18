import {
  SET_EVENT_TYPE,
  RECEIVE_EVENTS,
  SET_EVENT_ACTION,
  REQUEST_MY_EVENTS,
  SELECT_EVENT_PAGE,
  INVALIDATE_MY_EVENTS,
  TOGGLE_EVENT_CAROUSEL,
  CHANGE_CAROUSEL_HEIGHT,
} from '../index';

const activeEvent = {
  // selector for active party
  type: 'eventInvites', // upcomingEvents, eventInvites, eventCreations, publicEvents, pastEvents
  action: 'respond', // respond, ticket, edit, past
  selected: 0,
};

export const eventPageReducer = (state = activeEvent, action) => {
  switch (action.type) {
    case SELECT_EVENT_PAGE:
      return Object.assign({}, state, {
        selected: action.payload,
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

const userEventState = {
  activeSlide: 0,
  carouselHeight: 50,

  // consider pulling this from firebase

  upcomingEvents: {
    // contains parties that I've paid for or that I've responded GOING
    isFetching: false,
    didInvalidate: false,
    data: [],
  },
  eventInvites: {
    // contains all upcoming parties for which I've been INVITED or SAVED
    isFetching: false,
    didInvalidate: false,
    data: [],
  },
  eventCreations: {
    // contains all upcoming parties that I'm HOSTING
    isFetching: false,
    didInvalidate: false,
    updatingEvent: false,
    data: [],
  },
  pastEvents: {
    // contains past parties that I've SAVED, HOSTED or been INVITED to.
    isFetching: false,
    didInvalidate: false,
    data: [],
  },

  publicEvents: {
    // contains parties that are displayed on the BROWSING page
    isFetching: false,
    didInvalidate: false,
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
        [action.payload]: {
          ...state[action.payload],
          didInvalidate: true,
        },
      });
    default:
      return state;
  }
};
