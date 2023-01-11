import { LoginUser, User } from '../../interfaces/User';
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from './types';

export function loginRequest(payload: LoginUser) {
  return {
    type: LOGIN_REQUEST,
    payload,
  };
}

export function loginSuccess(payload: User) {
  return {
    type: LOGIN_SUCCESS,
    payload,
  };
}

export function loginFailure(payload: string) {
  return {
    type: LOGIN_FAILURE,
    payload,
  };
}
