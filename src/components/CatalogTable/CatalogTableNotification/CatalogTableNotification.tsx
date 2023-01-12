import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

import {
  useAppSelector,
  selectCatalogError,
  selectCatalogLoading,
} from '../../../configureStore';

function CatalogTableNotification() {
  const error = useAppSelector(selectCatalogError);
  const loading = useAppSelector(selectCatalogLoading);

  return (
    <TableRow>
      <TableCell
        colSpan={13}
        sx={{ height: '400px', fontSize: '2rem', textAlign: 'center' }}
      >
        {error && error}
        {loading && 'Loading data...'}
        {!error && !loading && 'No Data Found'}
      </TableCell>
    </TableRow>
  );
}

export default CatalogTableNotification;
