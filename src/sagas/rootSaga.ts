import { all } from 'redux-saga/effects';
// Saga
// **** TODO: IMPORT SAGA FILES
import loginSaga from '../containers/SignIn/sagas';
// API
// **** TODO: IMPORT API
import loginApi from '../api/carsBackend/loginApi';

function* rootSaga() {
  yield all([
    // TODO: connect saga files with api
    loginSaga(loginApi),
  ]);
}

export default rootSaga;
