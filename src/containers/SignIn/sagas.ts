import { call, put, take } from 'redux-saga/effects';

import { LOGIN_REQUEST } from './types';
import { loginSuccess, loginFailure } from './actions';
import { LoginUser } from '../../interfaces/User';

type LoginApi = (loginCredentials: LoginUser) => void;

// worker
function* authorizeUser(
  loginApi: LoginApi,
  loginCredentials: LoginUser
): unknown {
  try {
    const response = yield call(loginApi, loginCredentials);
    const userData = response.data;
    console.log(userData);
    yield put(loginSuccess(userData));
  } catch (err) {
    let message = 'Unknown Error';
    if (err instanceof Error) {
      message = err.message;
    }
    console.log(message);
    yield put(loginFailure(message));
  }
}

// watcher
export default function* loginSaga(loginApi: LoginApi): unknown {
  while (true) {
    const loginRequest = yield take(LOGIN_REQUEST);

    if (loginRequest.payload) {
      const loginCredentials = loginRequest.payload;
      yield call(authorizeUser, loginApi, loginCredentials);
    }
  }
}
