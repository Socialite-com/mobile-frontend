import {createStore, combineReducers, applyMiddleware} from 'redux';
import {authReducer, userReducer} from './reducers/users';
import {onboardingReducer} from './reducers/onboarding';
import {userEventReducer} from './reducers/events';
import thunkMiddleware from 'redux-thunk';

const appReducer = combineReducers({
  user: userReducer,
  authentication: authReducer,
  userEvents: userEventReducer,
  onBoarding: onboardingReducer,
});

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT_USER') {
    state = undefined;
  }
  return appReducer(state, action);
};

const configureStore = () => {
  return createStore(rootReducer, applyMiddleware(thunkMiddleware));
};

export default configureStore;
