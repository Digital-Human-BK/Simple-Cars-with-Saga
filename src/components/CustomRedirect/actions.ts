import REDIRECT from './types';

export default function redirect(destination: string) {
  return {
    type: REDIRECT,
    payload: destination,
  };
}
