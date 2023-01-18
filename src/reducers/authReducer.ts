import { AnyAction } from 'redux';

import LOGOUT_REQUEST from '../components/NavBar/types';

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
} from '../containers/SignIn/types';

import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
} from '../containers/SignUp/types';

import { UserState } from '../interfaces/User';

const initialState: UserState = {
  userData: null,
  loading: false,
  error: null,
};

function authReducer(state = initialState, action: AnyAction) {
  switch (action.type) {
    // ========================
    // REGISTER
    // ========================
    case SIGNUP_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case SIGNUP_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // ========================
    // LOGIN
    // ========================
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_SUCCESS:
      return {
        userData: action.payload,
        loading: false,
        error: null,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    // ========================
    // LOGOUT
    // ========================
    case LOGOUT_REQUEST:
      return initialState;

    default:
      return state;
  }
}

export default authReducer;
