import { Car, NewCar } from '../../interfaces/Car';

import {
  GET_CARS_REQUEST,
  GET_CARS_SUCCESS,
  GET_CARS_ERROR,
  CREATE_CAR_REQUEST,
  CREATE_CAR_SUCCESS,
  CREATE_CAR_ERROR,
  // EDIT_CAR_REQUEST,
  // EDIT_CAR_SUCCESS,
  // EDIT_CAR_ERROR,
  // REMOVE_CAR_REQUEST,
  // REMOVE_CAR_SUCCESS,
  // REMOVE_CAR_ERROR,
} from './types';

// get cars
export function getCars() {
  return {
    type: GET_CARS_REQUEST,
  };
}

export function getCarsSuccess(payload: Car[]) {
  return {
    type: GET_CARS_SUCCESS,
    payload,
  };
}

export function getCarsError(payload: string) {
  return {
    type: GET_CARS_ERROR,
    payload,
  };
}

// create car
export function createCarRequest(payload: NewCar) {
  return {
    type: CREATE_CAR_REQUEST,
    payload,
  };
}

export function createCarSuccess(payload: Car) {
  return {
    type: CREATE_CAR_SUCCESS,
    payload,
  };
}

export function createCarError(payload: string) {
  return {
    type: CREATE_CAR_ERROR,
    payload,
  };
}
