import axios from 'axios';
import { LoginUser } from '../../interfaces/User';
import { LOGIN_URL } from './config';

export default async function loginApi(loginCredentials: LoginUser) {
  return axios.post(LOGIN_URL, loginCredentials);
}
