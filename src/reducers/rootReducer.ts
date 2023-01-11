import { combineReducers } from 'redux';
import redirectReducer from './redirectReducer';
import authReducer from './authReducer';

// TODO:Import reducers

const rootReducer = combineReducers({
  // TODO: set reducers
  auth: authReducer,
  redirect: redirectReducer,
});

export default rootReducer;
