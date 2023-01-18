import axios from 'axios';
import { Car } from '../../interfaces/Car';
import { CAR_SERVICE } from './config';

export default async function createCarApi(
  carData: Car,
  accessToken: string
): Promise<Car> {
  return axios.post(CAR_SERVICE, carData, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });
}
