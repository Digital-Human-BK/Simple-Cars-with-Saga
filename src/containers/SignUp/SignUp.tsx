import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormHelperText from '@mui/material/FormHelperText';

import styles from './styles.module.scss';
import Toast from '../../common/Toast/Toast';
import Copyright from '../../common/Copyright/Copyright';
import LinkComponent from '../../common/LinkComponent/LinkComponent';

import {
  useAppDispatch,
  useAppSelector,
  selectAuthError,
  selectAuthLoading,
} from '../../configureStore';

import { signUpRequest } from './actions';
import validateRegister from '../../utils/validateRegister';
import { InputsTouched, RegisterUser } from '../../interfaces/User';

type ChangeEvent = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

export default function SignUp() {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectAuthLoading);
  const error = useAppSelector(selectAuthError);

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [inputsTouched, setInputsTouched] = useState<InputsTouched>({
    username: false,
    password: false,
    firstName: false,
    lastName: false,
  });
  const [userCredentials, setUserCredentials] = useState<RegisterUser>({
    username: '',
    password: '',
    firstName: '',
    lastName: '',
  });

  const inputErrors = validateRegister(userCredentials, inputsTouched);

  const handleToggleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleChange = (ev: ChangeEvent) => {
    setInputsTouched((prevState) => ({
      ...prevState,
      [ev.target.name]: true,
    }));
    setUserCredentials((prevState) => ({
      ...prevState,
      [ev.target.name]: ev.target.value.trim(),
    }));
  };

  const handleRegisterSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    dispatch(signUpRequest(userCredentials));
  };

  return (
    <Box component="main" className={styles['main-signUp']}>
      <Toast error={error} loading={loading} />
      <Container component="section" maxWidth="xs" className={styles.card}>
        <Box className={styles.formContainer}>
          <Typography component="h1" variant="h4" fontWeight="700">
            Sign Up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleRegisterSubmit}
            className={styles.form}
          >
            <Grid container spacing={4}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="firstName"
                  name="firstName"
                  label="First Name"
                  value={userCredentials.firstName}
                  error={!!inputErrors.firstNameError}
                  helperText={inputErrors.firstNameError}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  value={userCredentials.lastName}
                  error={!!inputErrors.lastNameError}
                  helperText={inputErrors.lastNameError}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  value={userCredentials.username}
                  error={!!inputErrors.usernameError}
                  helperText={inputErrors.usernameError}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel
                    htmlFor="outlined-adornment-password"
                    error={!!inputErrors.passwordError}
                  >
                    Password
                  </InputLabel>
                  <OutlinedInput
                    name="password"
                    id="outlined-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    value={userCredentials.password}
                    onChange={handleChange}
                    error={!!inputErrors.passwordError}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleToggleShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                  <FormHelperText error>
                    {inputErrors.passwordError}
                  </FormHelperText>
                </FormControl>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className={styles.submit}
              disabled={inputErrors.formDisabled}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                <LinkComponent path="/login">
                  Already have an account? Sign in
                </LinkComponent>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright />
      </Container>
    </Box>
  );
}
