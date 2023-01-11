import { InputsTouched, RegisterUser } from '../interfaces/User';

interface RegisterInputs {
  firstNameError: string | null;
  lastNameError: string | null;
  usernameError: string | null;
  passwordError: string | null;
  formDisabled: boolean;
}

export default function validateRegister(
  { firstName, lastName, username, password }: RegisterUser,
  inputsTouched: InputsTouched
): RegisterInputs {
  const inputErrors: RegisterInputs = {
    firstNameError: null,
    lastNameError: null,
    usernameError: null,
    passwordError: null,
    formDisabled: true,
  };

  // validate firstName
  if (firstName === '' && inputsTouched.firstName) {
    inputErrors.firstNameError = 'First name is required';
  } else if (firstName.length < 2 && inputsTouched.firstName) {
    inputErrors.firstNameError = 'At least 2 characters';
  } else {
    inputErrors.firstNameError = null;
  }

  // validate lastName
  if (lastName === '' && inputsTouched.lastName) {
    inputErrors.lastNameError = 'Last name is required';
  } else if (lastName.length < 2 && inputsTouched.lastName) {
    inputErrors.lastNameError = 'At least 2 characters';
  } else {
    inputErrors.lastNameError = null;
  }

  // validate username
  if (username === '' && inputsTouched.username) {
    inputErrors.usernameError = 'Username is required';
  } else if (username.length < 3 && inputsTouched.username) {
    inputErrors.usernameError = 'At least 3 characters';
  } else {
    inputErrors.usernameError = null;
  }
  // validate password
  if (password === '' && inputsTouched.password) {
    inputErrors.passwordError = 'Password is required';
  } else if (password.length < 5 && inputsTouched.password) {
    inputErrors.passwordError = 'At least 5 characters';
  } else {
    inputErrors.passwordError = null;
  }
  // validate form
  if (
    inputsTouched.firstName &&
    inputsTouched.lastName &&
    inputsTouched.username &&
    inputsTouched.password &&
    inputErrors.firstNameError === null &&
    inputErrors.lastNameError === null &&
    inputErrors.usernameError === null &&
    inputErrors.passwordError === null
  ) {
    inputErrors.formDisabled = false;
  }

  return inputErrors;
}
