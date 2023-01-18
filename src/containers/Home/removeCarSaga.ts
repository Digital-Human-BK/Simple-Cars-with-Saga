import { put, take, call } from 'redux-saga/effects';
import { removeCarError, removeCarSuccess } from './actions';
import { REMOVE_CAR_REQUEST } from './types';

type RemoveCarApi = (
  cardId: string,
  userId: string,
  accessToken: string
) => void;

// worker
function* removeCar(
  removeCarApi: RemoveCarApi,
  carId: string,
  userId: string,
  accessToken: string
): unknown {
  try {
    const response = yield call(removeCarApi, carId, userId, accessToken);

    if (response.status === 200) {
      yield put(removeCarSuccess(carId));
    }
  } catch (err) {
    let message = 'Delete failed';
    if (err instanceof Error) {
      message = err.message;
    }
    yield put(removeCarError(message));
  }
}

// watcher
export default function* removeCarSaga(removeCarApi: RemoveCarApi): unknown {
  while (true) {
    const removeCarRequest = yield take(REMOVE_CAR_REQUEST);
    if (removeCarRequest.payload) {
      const { carId, userId, accessToken } = removeCarRequest.payload;
      yield call(removeCar, removeCarApi, carId, userId, accessToken);
    }
  }
}
