import db from '../database';
import shorthash from 'shorthash';
let RNFS = require('react-native-fs');
import {Platform} from 'react-native';
import {login, saveUid} from './users';
import auth from '@react-native-firebase/auth';
import {facebookLogin} from '../../library/networking/facebook/FBauthentication';
import {getFacebookProfile} from '../../library/networking/facebook/FBprofilePicture';
import {
  SET_PROFILE_PICTURE,
  USER_DETAILS_ERROR,
  SET_CONFIRM_RESULT,
  PHONE_AUTH_ERROR,
  CREATE_USERNAME,
  SET_USER_STATE,
  SET_TEMP_UID,
  RESET_AUTH,
} from '../constants';

const paths = {
  SET_MODE: 'mode',
  TOGGLE_LANDING_CAROUSEL: 'activeSlide',

  SET_TEMP_UID: 'user',
  PHONE_AUTH_ERROR: 'error',
  SET_PHONE_NUMBER: 'phoneNumber',
  SET_CONFIRM_RESULT: 'confirmResult',
  SET_VERIFICATION_CODE: 'verificationCode',

  SET_USER_STATE: 'newUser',
  CREATE_USERNAME: 'userName',
  USER_DETAILS_ERROR: 'error',
  SET_PROFILE_PICTURE: 'profilePicture',
};

export function resetAuth() {
  return {
    type: RESET_AUTH,
  };
}

export function setValue(type, value) {
  return {
    type: type,
    payload: value,
    path: paths[type],
  };
}

function validateCodeVerification(state) {
  return !!(
    state.onBoarding.phoneAuth.confirmResult &&
    state.onBoarding.phoneAuth.verificationCode.length === 6
  );
}

function validatePhoneNumber(state) {
  const regexp = /^\+[0-9]?()[0-9](\s|\S)(\d[0-9]{8,16})$/;
  return regexp.test(state.onBoarding.phoneAuth.phoneNumber);
}

export function handleSendCode() {
  return (dispatch, getState) => {
    if (validatePhoneNumber(getState())) {
      return auth()
        .signInWithPhoneNumber(getState().onBoarding.phoneAuth.phoneNumber)
        .then(result => {
          dispatch(setValue(SET_CONFIRM_RESULT, result));
        });
    } else {
      // dispatch invalid phone number error
      return Promise.resolve();
    }
  };
}

function confirmCode(state) {
  return dispatch => {
    return state.onBoarding.phoneAuth.confirmResult
      .confirm(state.onBoarding.phoneAuth.verificationCode)
      .then(user => dispatch(setValue(SET_TEMP_UID, user)));
  };
}

export function checkUserExists(uid) {
  return dispatch => {
    return db
      .checkUserExists(uid)
      .then(res => dispatch(setValue(SET_USER_STATE, !res)));
  };
}

export function handleVerifyCode() {
  return (dispatch, getState) => {
    const state = getState();
    if (validateCodeVerification(state)) {
      return dispatch(confirmCode(state)).then(() => {
        const user = getState().onBoarding.phoneAuth.user;
        return dispatch(checkUserExists(user.uid));
      });
    } else {
      // dispatch invalid confirmation code error
      return Promise.resolve();
    }
  };
}

function uploadProfilePicture(user) {
  return async dispatch => {
    dispatch(setValue(CREATE_USERNAME, user.displayName));
    if (user.photoURL) {
      const photoURL = await getFacebookProfile();
      const name = shorthash.unique(photoURL);
      const extension = Platform.OS === 'android' ? 'file://' : '';

      const path = `${extension}${RNFS.CachesDirectoryPath}/${name}.jpeg`;
      const remotePath = `users/${user.uid}/${name}.jpeg`;

      return RNFS.downloadFile({
        fromUrl: photoURL,
        toFile: path,
      }).promise.then(status => {
        return db
          .uploadFile(path, remotePath)
          .then(res => {
            console.log(res);
            return dispatch(setValue(SET_PROFILE_PICTURE, remotePath));
          })
          .catch(err => console.log(err.message));
      });
    } else {
      return Promise.resolve();
    }
  };
}

export function connectFbAccount() {
  return (dispatch, getState) => {
    return facebookLogin().then(user => {
      return dispatch(checkUserExists(user.uid)).then(async () => {
        let profile = {};
        if (getState().onBoarding.userDetails.newUser) {
          // upload profile picture and setup account
          await dispatch(uploadProfilePicture(user)).then(() => {
            profile = getState().onBoarding.userDetails.profile;
          });
        }
        const uid = user.uid;
        return db
          .setupAccount(uid, profile)
          .then(() => dispatch(saveUid(uid)))
          .then(() => dispatch(checkUserExists(uid)))
          .then(() => dispatch(login(true)))
          .catch(err => console.log(err.message));
      });
    });
  };
}

export function createUserAccount() {
  return (dispatch, getState) => {
    const state = getState();
    // verify username --> maybe unique ?
    if (state.onBoarding.userDetails.profile.userName) {
      const uid = state.onBoarding.phoneAuth.user.uid;
      const profile = state.onBoarding.userDetails.profile;
      return db
        .setupAccount(uid, profile)
        .then(() => dispatch(saveUid(uid)))
        .then(() => dispatch(checkUserExists(uid)))
        .then(() => dispatch(login(true)))
        .catch(err => console.log(err.message));
    } else return dispatch(setValue(USER_DETAILS_ERROR, 'Invalid username'));
  };
}
