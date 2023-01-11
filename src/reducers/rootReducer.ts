import { combineReducers } from 'redux';
import redirectReducer from './redirectReducer';
import authReducer from './authReducer';
import catalogReducer from './catalogReducer';

// TODO:Import reducers

const rootReducer = combineReducers({
  // TODO: set reducers
  auth: authReducer,
  catalog: catalogReducer,
  redirect: redirectReducer,
});

export default rootReducer;
