import axios from 'axios';
import { RegisterUser } from '../../interfaces/User';
import { REGISTER_URL } from './config';

export default async function signUpApi(signUpCredentials: RegisterUser) {
  return axios.post(REGISTER_URL, signUpCredentials);
}
