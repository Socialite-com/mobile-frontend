import {
  STORE_UID,
  LOGIN_USER,
  LOGOUT_USER,
  FETCH_USER_PROFILE,
  FETCH_USER_FAILURE,
  FETCH_USER_SUCCESS,
  INVALIDATE_USER_PROFILE,
} from '../index';

import db from '../database';

export function login(result) {
  return {
    type: LOGIN_USER,
    payload: result,
  };
}

export function logout() {
  return {
    type: LOGOUT_USER,
  };
}

export function saveUid(uid) {
  return {
    type: STORE_UID,
    payload: uid,
  };
}

function invalidateUserProfile() {
  return {
    type: INVALIDATE_USER_PROFILE,
  };
}

export function requestUserProfile(uid) {
  return {
    type: FETCH_USER_PROFILE,
    payload: uid,
  };
}

export function receiveUserProfile(uid, json) {
  return {
    type: FETCH_USER_SUCCESS,
    payload: {uid: uid, data: json},
    receivedAt: Date.now(),
  };
}

function shouldFetchUserProfile(state) {
  const profile = state.user.profile;
  // add condition for firebase data change listener
  if (profile.displayName === '') {
    return true;
  } else if (state.user.isFetching) {
    return false;
  } else {
    return state.user.didInvalidate;
  }
}

export function fetchUserProfileIfNeeded(uid) {
  return (dispatch, getState) => {
    if (shouldFetchUserProfile(getState())) {
      return dispatch(fetchUserProfile(uid));
    } else {
      return Promise.resolve();
    }
  };
}

function fetchUserProfile(uid) {
  return (dispatch, getState) => {
    dispatch(requestUserProfile(uid));
    if (getState().onBoarding.userDetails.newUser) {
      return Promise.reject('User does not exist.');
    } else {
      return db
        .getProfileData(uid)
        .then(data => dispatch(receiveUserProfile(uid, data)));
    }
  };
}
