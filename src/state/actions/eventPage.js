import {SELECT_EVENT_PAGE, SET_EVENT_TYPE} from '../index';

import db from '../database';

function setEventType(type) {
  return {
    type: SET_EVENT_TYPE,
    payload: type,
  };
}

function setEventData(data) {
  return {
    type: SELECT_EVENT_PAGE,
    payload: data,
  };
}

//known bugs: UNDEFINED TIME, NOT FOUND EVENT, SKIPPING LOCATION

function checkEventTodos(data) {
  return dispatch => {
    let needsUpdating = false;
    console.log('check');
    //check for wrong data
    if (data.details.todos) {
      const todos = data.details.todos;
      for (let i = 0; i < todos.length; i++) {
        console.log(i);
        switch (todos[i].type) {
          case 1: //time
            if (Boolean(data.details.startTime) !== todos[i].completed) {
              needsUpdating = true;
              data.details.todos[i].completed = Boolean(data.details.startTime);
            }
            break;
          case 2: //location
            if (Boolean(data.details.location.length) !== todos[i].completed) {
              needsUpdating = true;
              data.details.todos[i].completed = Boolean(
                data.details.location.length,
              );
            }
            break;
          case 3: //invite
            if (Boolean(data.attendees.length) !== todos[i].completed) {
              needsUpdating = true;
              data.details.todos[i].completed = Boolean(data.attendees.length);
            }
            break;
          case 4: //price
            if (Boolean(!data.details.paid) !== todos[i].completed) {
              needsUpdating = true;
              data.details.todos[i].completed = Boolean(!data.details.paid);
            } //add else statment for paid events
            break;
        }
      }
      if (needsUpdating) {
        dispatch(updateTodos(data.details.todos));
      }
    }
  };
}

function getData(type) {
  return (dispatch, getState) => {
    const eid = getState().eventPage.data.eid;
    let updatedData = getState().eventPage.data;
    return db
      .getEventData(eid)
      .then(newData => {
        if (type === 'announcements') {
          updatedData.announcements = newData.announcements;
        } else if (type === 'todos') {
          updatedData.details.todos = newData.details.todos;
        }
        return Promise.all([dispatch(setEventData(updatedData))]);
      })
      .catch(err => Promise.reject(err));
  };
}

function updateTodos(todos) {
  return (dispatch, getState) => {
    const eid = getState().eventPage.data.eid;
    console.log('GOING TO SEND TO DB');
    console.log(eid);
    console.log(todos);
    return db
      .updateTodos(eid, todos)
      .then(() => {
        console.log('success');
        return Promise.all([dispatch(getData('todos'))]);
      })
      .catch(err => Promise.reject(err));
  };
}

export function postAnnouncement(message) {
  return (dispatch, getState) => {
    const eid = getState().eventPage.data.eid;
    return db
      .addAnnouncement(eid, message)
      .then(() => {
        console.log('success');
        return Promise.all([dispatch(getData('announcements'))]);
      })
      .catch(err => Promise.reject(err));
  };
}

export function selectEvent(type, data) {
  return dispatch => {
    dispatch(setEventType(type));
    dispatch(setEventData(data));
    dispatch(checkEventTodos(data));
    return Promise.resolve();
  };
}
