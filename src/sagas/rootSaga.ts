import { all } from 'redux-saga/effects';
// Saga
// **** TODO: IMPORT SAGA FILES
import loginSaga from '../containers/SignIn/sagas';
import signUpSaga from '../containers/SignUp/saga';
import getCarsSaga from '../containers/Home/getCarsSaga';
import createCarSaga from '../containers/Home/createCarSaga';
// API
// **** TODO: IMPORT API
import loginApi from '../api/carsBackend/loginApi';
import signUpApi from '../api/carsBackend/signUpApi';
import getCarsApi from '../api/carsBackend/getCarsApi';
import createCarApi from '../api/carsBackend/createCarApi';

function* rootSaga() {
  yield all([
    // TODO: connect saga files with api
    loginSaga(loginApi),
    signUpSaga(signUpApi),
    getCarsSaga(getCarsApi),
    createCarSaga(createCarApi),
  ]);
}

export default rootSaga;
