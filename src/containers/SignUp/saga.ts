import { put, take, call } from 'redux-saga/effects';

import { SIGNUP_REQUEST } from './types';

import { signUpFailure } from './actions';
import { loginRequest } from '../SignIn/actions';
import { RegisterUser } from '../../interfaces/User';

type SignUpApi = (registerCredentials: RegisterUser) => void;

// worker
function* createUser(
  signUpApi: SignUpApi,
  registerCredentials: RegisterUser
): unknown {
  try {
    const response = yield call(signUpApi, registerCredentials);

    if (response.status === 200) {
      yield put(
        loginRequest({
          username: registerCredentials.username,
          password: registerCredentials.password,
        })
      );
    }
  } catch (err) {
    let message = 'Unknown Error';
    if (err instanceof Error) {
      message = err.message;
    }
    console.error(message);
    yield put(signUpFailure(message));
  }
}

// watcher
export default function* signUpSaga(signUpApi: SignUpApi): unknown {
  while (true) {
    const signUpRequest = yield take(SIGNUP_REQUEST);
    if (signUpRequest.payload) {
      const registerCredentials = signUpRequest.payload;
      yield call(createUser, signUpApi, registerCredentials);
    }
  }
}
