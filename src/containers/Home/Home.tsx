import { useState } from 'react';

import Box from '@mui/material/Box';

import NavBar from '../../components/NavBar/NavBar';
import Toast from '../../common/Toast/Toast';
import SearchBar from '../../components/SearchBar/SearchBar';
import CatalogTable from '../../components/CatalogTable/CatalogTable';

// import {
//   selectRedirectPath,
//   useAppDispatch,
//   useAppSelector,
// } from '../../configureStore';

function Home() {
  // const dispatch = useAppDispatch();
  // const error = useAppSelector(selectRedirectPath);
  const [isAddingCar, setIsAddingCar] = useState<boolean>(false);

  const toggleAddCarHandler = (): void => {
    setIsAddingCar((prev) => !prev);
  };

  // useEffect(() => {
  //   dispatch({ type: 'REDIRECT', payload: '/' });
  // }, [dispatch]);

  return (
    <Box component="main">
      <Toast error={null} loading={false} />
      <NavBar />
      <SearchBar isAddingCar={isAddingCar} toggleAddCar={toggleAddCarHandler} />
      <CatalogTable
        isAddingCar={isAddingCar}
        toggleMenu={toggleAddCarHandler}
      />
    </Box>
  );
}

export default Home;
