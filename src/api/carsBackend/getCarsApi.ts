import axios from 'axios';
import { GET_CARS } from './config';

export default async function getCarsApi() {
  return axios.get(GET_CARS);
}
