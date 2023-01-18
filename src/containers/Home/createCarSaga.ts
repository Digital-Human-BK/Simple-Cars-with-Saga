import { put, take, call } from 'redux-saga/effects';

import { CREATE_CAR_REQUEST } from './types';
import { createCarSuccess, createCarError } from './actions';
import { Car } from '../../interfaces/Car';

type CreateCarApi = (carData: Car, accessToken: string) => Promise<Car>;

// worker
function* createCar(
  createCarApi: CreateCarApi,
  carData: Car,
  accessToken: string
): unknown {
  try {
    const response = yield call(createCarApi, carData, accessToken);
    yield put(createCarSuccess(response.data));
  } catch (err) {
    let message = 'Error while creating a car';
    if (err instanceof Error) {
      message = err.message;
    }
    console.error(message);
    yield put(createCarError(message));
  }
}

// watcher
export default function* createCarSaga(createCarApi: CreateCarApi): unknown {
  while (true) {
    const createCarRequest = yield take(CREATE_CAR_REQUEST);
    if (createCarRequest.payload) {
      const { carData, accessToken } = createCarRequest.payload;

      carData.year = Number(carData.year);
      carData.horsePower = Number(carData.horsePower);
      carData.price = Number(carData.price);
      carData.mileage = Number(carData.mileage);

      yield call(createCar, createCarApi, carData, accessToken);
    }
  }
}
