import REDIRECT from './types';

function redirect(destination: string) {
  return {
    type: REDIRECT,
    payload: destination,
  };
}

export default redirect;
