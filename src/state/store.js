import {createStore, combineReducers, applyMiddleware} from 'redux';
import {authReducer, userReducer} from './reducers/users';
import {createEventReducer} from './reducers/createEvent';
import {onboardingReducer} from './reducers/onboarding';
import {eventPageReducer} from './reducers/eventPage';
import {addEventReducer} from './reducers/addEvent';
import {userEventReducer} from './reducers/events';
import thunkMiddleware from 'redux-thunk';

const appReducer = combineReducers({
  user: userReducer,
  findEvent: addEventReducer,
  authentication: authReducer,
  eventPage: eventPageReducer,
  userEvents: userEventReducer,
  newEvent: createEventReducer,
  onBoarding: onboardingReducer,
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

const configureStore = () => {
  return createStore(rootReducer, applyMiddleware(thunkMiddleware));
};

export default configureStore;
