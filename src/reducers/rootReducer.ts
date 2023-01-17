import { combineReducers } from 'redux';
import authReducer from './authReducer';
import catalogReducer from './catalogReducer';

// TODO:Import reducers

const rootReducer = combineReducers({
  // TODO: set reducers
  auth: authReducer,
  catalog: catalogReducer,
});

export default rootReducer;
