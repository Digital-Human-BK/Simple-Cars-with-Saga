import { combineReducers } from 'redux';
import redirectReducer from './redirectReducer';

// TODO:Import reducers

const rootReducer = combineReducers({
  // TODO: set reducers
  redirect: redirectReducer,
});

export default rootReducer;
