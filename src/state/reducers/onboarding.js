import {
  SET_MODE,
  RESET_AUTH,
  SET_TEMP_UID,
  SET_USER_STATE,
  CREATE_USERNAME,
  PHONE_AUTH_ERROR,
  SET_PHONE_NUMBER,
  USER_DETAILS_ERROR,
  SET_CONFIRM_RESULT,
  SET_PROFILE_PICTURE,
  SET_VERIFICATION_CODE,
  TOGGLE_LANDING_CAROUSEL,
} from '../constants';

const onboarding = {
  mode: 'register',
  activeSlide: 0,
  phoneAuth: {
    verificationCode: '',
    confirmResult: null,
    phoneNumber: '+1',
    error: null,
    user: {},
  },
  fbAuth: {
    user: {},
    error: null,
  },
  userDetails: {
    newUser: true,
    error: null,
    profile: {
      userName: '',
      profilePicture: null,
    },
  },
};

export const onboardingReducer = (state = onboarding, action) => {
  switch (action.type) {
    case TOGGLE_LANDING_CAROUSEL:
    case SET_MODE:
      return Object.assign({}, state, {
        [action.path]: action.payload,
      });
    case SET_VERIFICATION_CODE:
    case SET_CONFIRM_RESULT:
    case PHONE_AUTH_ERROR:
    case SET_PHONE_NUMBER:
    case SET_TEMP_UID:
      return Object.assign({}, state, {
        phoneAuth: {
          ...state.phoneAuth,
          [action.path]: action.payload,
        },
      });
    case USER_DETAILS_ERROR:
    case SET_USER_STATE:
      return Object.assign({}, state, {
        userDetails: {
          ...state.userDetails,
          [action.path]: action.payload,
        },
      });
    case CREATE_USERNAME:
    case SET_PROFILE_PICTURE:
      return Object.assign({}, state, {
        userDetails: {
          ...state.userDetails,
          profile: {
            ...state.userDetails.profile,
            [action.path]: action.payload,
          },
        },
      });
    case RESET_AUTH:
      return Object.assign({}, state, {
        userDetails: onboarding.userDetails,
        phoneAuth: onboarding.phoneAuth,
        fbAuth: onboarding.fbAuth,
      });
    default:
      return state;
  }
};
