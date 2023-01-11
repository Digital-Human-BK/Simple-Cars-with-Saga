import { put, take, call } from 'redux-saga/effects';
import { GET_CARS_REQUEST } from './types';
import { getCarsSuccess, getCarsError } from './actions';

type GetCarsApi = () => void;

// worker
function* getAllCars(getCarsApi: GetCarsApi): unknown {
  try {
    const response = yield call(getCarsApi);
    if (response.ok !== 200) {
      throw new Error('Something went wrong');
    }
    yield put(getCarsSuccess(response.data));
  } catch (err) {
    let message = 'Fetch data error';
    if (err instanceof Error) {
      message = err.message;
    }
    console.log(message);
    yield put(getCarsError(message));
  }
}

// watcher
export default function* getCarsSaga(getCarsApi: GetCarsApi): unknown {
  while (true) {
    yield take(GET_CARS_REQUEST);
    yield call(getAllCars, getCarsApi);
  }
}
