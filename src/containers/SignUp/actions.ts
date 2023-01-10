import { RegisterUser } from '../../interfaces/User';
import { SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE } from './types';

export function signUpRequest(payload: RegisterUser) {
  return {
    type: SIGNUP_REQUEST,
    payload,
  };
}

export function signUpSuccess(payload: 'Success') {
  return {
    type: SIGNUP_SUCCESS,
    payload,
  };
}

export function signUpFailure(payload: string) {
  return {
    type: SIGNUP_FAILURE,
    payload,
  };
}
