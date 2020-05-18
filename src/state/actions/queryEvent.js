import {
  QUERY_EVENT_FAIL,
  QUERY_EVENT_FROM_KEY,
  RESET_EVENT_QUERY,
  SAVE_EVENT_DATA,
} from '../index';

import db from '../database';

function queryNewEvent(key) {
  return {
    type: QUERY_EVENT_FROM_KEY,
    payload: key,
  };
}

export function queryFail(error) {
  return {
    type: QUERY_EVENT_FAIL,
    payload: error,
  };
}

function receiveQuery(data) {
  return {
    type: SAVE_EVENT_DATA,
    payload: {data: data, receivedAt: Date.now()},
  };
}

const _validateCode = barcode => {
  function byteCount(s) {
    return encodeURI(s).split(/%..|./).length - 1;
  }
  // add validation steps for a Socialite event Id
  if (['.', '..', '', null].includes(barcode)) {
    return 'Invalid code';
  } else if (byteCount(barcode) >= 1500) {
    return 'QR encoding is over byte limit.';
  } else if (barcode.includes('/')) {
    return 'Code cannot contain forward slashes.';
  } else {
    return null;
  }
};

export function queryEvent(key) {
  return dispatch => {
    dispatch(queryNewEvent(key));
    let error = _validateCode(key);
    if (error === null) {
      return db
        .getEventData(key)
        .then(d => db.reselectEventCard(d))
        .then(data => dispatch(receiveQuery(data)))
        .catch(() =>
          dispatch(queryFail('Sorry, we could not find your event.')),
        );
    } else {
      dispatch(queryFail(error));
      return Promise.resolve();
    }
  };
}

export function resetEventQuery() {
  return {
    type: RESET_EVENT_QUERY,
  };
}
