import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';

import NavBar from '../../components/NavBar/NavBar';
import Toast from '../../common/Toast/Toast';
import SearchBar from '../../components/SearchBar/SearchBar';
import CatalogTable from '../../components/CatalogTable/CatalogTable';
import SortingCriteria from '../../common/SortingCriteria/SortingCriteria';

import {
  useAppDispatch,
  useAppSelector,
  selectCatalogError,
} from '../../configureStore';
import { getCars } from './actions';

function Home() {
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectCatalogError);
  const [isAddingCar, setIsAddingCar] = useState<boolean>(false);

  const toggleAddCarHandler = (): void => {
    setIsAddingCar((prev) => !prev);
  };

  useEffect(() => {
    dispatch(getCars());
  }, [dispatch]);

  return (
    <Box component="main">
      <Toast error={error} loading={false} />
      <NavBar />
      <SearchBar isAddingCar={isAddingCar} toggleAddCar={toggleAddCarHandler} />
      <SortingCriteria />
      <CatalogTable
        isAddingCar={isAddingCar}
        toggleMenu={toggleAddCarHandler}
      />
    </Box>
  );
}

export default Home;
