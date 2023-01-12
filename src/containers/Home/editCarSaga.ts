import { call, put, take } from 'redux-saga/effects';

import { EDIT_CAR_REQUEST } from './types';
import { editCarSuccess, editCarError } from './actions';
import { Car, NewCar } from '../../interfaces/Car';

type EditCarApi = (
  carData: Car | NewCar,
  userId: string,
  accessToken: string
) => Promise<Car>;

// worker
function* editCar(
  editCarApi: EditCarApi,
  carData: Car | NewCar,
  userId: string,
  accessToken: string
): unknown {
  try {
    const response = yield call(editCarApi, carData, userId, accessToken);
    yield put(editCarSuccess(response.data));
  } catch (err) {
    let message = 'Error while updating a car';
    if (err instanceof Error) {
      message = err.message;
    }
    console.log(message);
    yield put(editCarError(message));
  }
}

// watcher
export default function* editCarSaga(editCarApi: EditCarApi): unknown {
  while (true) {
    const editCarRequest = yield take(EDIT_CAR_REQUEST);
    if (editCarRequest.payload) {
      const { carData, userId, accessToken } = editCarRequest.payload;

      carData.year = Number(carData.year);
      carData.horsePower = Number(carData.horsePower);
      carData.price = Number(carData.price);
      carData.mileage = Number(carData.mileage);

      yield call(editCar, editCarApi, carData, userId, accessToken);
    }
  }
}
