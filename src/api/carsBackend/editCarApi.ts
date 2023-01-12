import axios from 'axios';
import { Car, NewCar } from '../../interfaces/Car';
import { CAR_SERVICE } from './config';

export default async function editCarApi(
  carData: Car | NewCar,
  userId: string,
  accessToken: string
): Promise<Car> {
  const EDIT_SERVICE_URL = `${CAR_SERVICE}/${userId}`;

  return axios.put(EDIT_SERVICE_URL, carData, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });
}
