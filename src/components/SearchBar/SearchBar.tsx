import { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Tooltip from '@mui/material/Tooltip';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import AddBoxIcon from '@mui/icons-material/AddBox';
import InputAdornment from '@mui/material/InputAdornment';
import DoNotDisturbOnIcon from '@mui/icons-material/DoNotDisturbOn';

import styles from './styles.module.scss';

import {
  useAppSelector,
  useAppDispatch,
  selectUser,
} from '../../configureStore';
import SEARCH_CAR from './types';

type SearchBarProps = {
  isAddingCar: boolean;
  toggleAddCar: () => void;
};

let initialComponentLoad = true;

function SearchBar({ isAddingCar, toggleAddCar }: SearchBarProps) {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    if (initialComponentLoad) {
      initialComponentLoad = false;
      return;
    }
    const debounce = setTimeout(() => {
      dispatch({ type: SEARCH_CAR, payload: search });
    }, 500);

    // eslint-disable-next-line consistent-return
    return () => clearTimeout(debounce);
  }, [search, dispatch]);

  return (
    <Grid container className={styles.container}>
      <Grid item xs={6}>
        <Typography variant="h5" component="h2" fontWeight={600}>
          Simple Cars
        </Typography>
      </Grid>
      <Grid item xs={6} className={styles.align}>
        <Box>
          <TextField
            placeholder="Search by model"
            id="search"
            type="search"
            variant="standard"
            color="info"
            value={search}
            onChange={(ev) => setSearch(ev.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment
                  component="button"
                  position="start"
                  className={styles.adornment}
                >
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          {user && (
            <Tooltip title="Add new Car">
              <IconButton onClick={toggleAddCar}>
                {isAddingCar ? (
                  <DoNotDisturbOnIcon color="secondary" />
                ) : (
                  <AddBoxIcon color="primary" />
                )}
              </IconButton>
            </Tooltip>
          )}
        </Box>
      </Grid>
    </Grid>
  );
}

export default SearchBar;
