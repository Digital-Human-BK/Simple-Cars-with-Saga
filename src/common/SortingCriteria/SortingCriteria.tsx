import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';

import styles from './SortingCriteria.module.scss';

function SortingCriteria() {
  const handleReset = () => {
    console.log('Reset to random');
  };

  return (
    <Box className={styles.container}>
      <Chip
        label="Sorted by: Random"
        variant="outlined"
        onDelete={handleReset}
      />
    </Box>
  );
}

export default SortingCriteria;
