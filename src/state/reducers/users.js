import {
  STORE_UID,
  LOGIN_USER,
  FETCH_USER_PROFILE,
  FETCH_USER_SUCCESS, LOGOUT_USER,
} from '../index';

const authState = {
  loggedIn: false,
  checkedLoggedIn: false,
};

const userState = {
  uid: '',
  isFetching: true,
  didInvalidate: false,
  lastUpdated: '',
  profile: {
    displayName: '',
    profilePic: '',
    location: '',
    score: '',
  },
};

export const authReducer = (state = authState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        loggedIn: action.payload,
        checkedLoggedIn: true,
      };
    case LOGOUT_USER:
      return {
        ...state,
        loggedIn: false,
        checkedLoggedIn: true,
      };
    default:
      return state;
  }
};

export const userReducer = (state = userState, action) => {
  switch (action.type) {
    case STORE_UID:
      return {
        ...state,
        uid: action.payload,
      };
    case FETCH_USER_PROFILE:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false,
      });
    case FETCH_USER_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        profile: action.payload.data,
        lastUpdated: action.receivedAt,
      });
    default:
      return state;
  }
};
