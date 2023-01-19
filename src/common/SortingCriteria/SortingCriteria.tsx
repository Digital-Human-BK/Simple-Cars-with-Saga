import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';

import styles from './SortingCriteria.module.scss';

import {
  useAppSelector,
  useAppDispatch,
  selectCatalogSort,
} from '../../configureStore';
import RESET_SORTING from './types';

function SortingCriteria() {
  const dispatch = useAppDispatch();
  const sortingCriteria = useAppSelector(selectCatalogSort);

  const handleReset = () => {
    console.log('Reset to random');
    dispatch({ type: RESET_SORTING });
  };

  return (
    <Box className={styles.container}>
      <Chip
        label={`Sorted by: ${sortingCriteria}`}
        variant="outlined"
        onDelete={handleReset}
        className={styles.chip}
      />
    </Box>
  );
}

export default SortingCriteria;
