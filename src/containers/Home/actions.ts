import { Car } from '../../interfaces/Car';

import {
  GET_CARS_REQUEST,
  GET_CARS_SUCCESS,
  GET_CARS_ERROR,
  // REMOVE_CAR_REQUEST,
  // REMOVE_CAR_SUCCESS,
  // REMOVE_CAR_ERROR,
  // EDIT_CAR_REQUEST,
  // EDIT_CAR_SUCCESS,
  // EDIT_CAR_ERROR,
  // CREATE_CAR_REQUEST,
  // CREATE_CAR_SUCCESS,
  // CREATE_CAR_ERROR,
} from './types';

export function getCars() {
  return {
    type: GET_CARS_REQUEST,
  };
}

export function getCarsSuccess(cars: Car[]) {
  return {
    type: GET_CARS_SUCCESS,
    payload: cars,
  };
}

export function getCarsError(errorMsg: string) {
  return {
    type: GET_CARS_ERROR,
    payload: errorMsg,
  };
}
