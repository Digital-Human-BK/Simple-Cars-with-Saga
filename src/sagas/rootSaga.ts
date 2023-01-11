import { all } from 'redux-saga/effects';
// Saga
// **** TODO: IMPORT SAGA FILES
import loginSaga from '../containers/SignIn/sagas';
import signUpSaga from '../containers/SignUp/saga';
// API
// **** TODO: IMPORT API
import loginApi from '../api/carsBackend/loginApi';
import signUpApi from '../api/carsBackend/signUpApi';

function* rootSaga() {
  yield all([
    // TODO: connect saga files with api
    loginSaga(loginApi),
    signUpSaga(signUpApi),
  ]);
}

export default rootSaga;
