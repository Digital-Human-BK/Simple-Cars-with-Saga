import axios from 'axios';
import { CAR_SERVICE } from './config';

export default async function removeCarApi(
  carId: string,
  userId: string,
  accessToken: string
) {
  const CAR_DELETE_SERVICE = `${CAR_SERVICE}/${carId}/${userId}`;

  return axios.delete(CAR_DELETE_SERVICE, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });
}
