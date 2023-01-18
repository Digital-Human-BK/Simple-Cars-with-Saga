import { useEffect, useState, useMemo } from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import AddCar from './AddCar/AddCar';
import CatalogTableHead from './CatalogTableHead/CatalogTableHead';
import CatalogTableRow from './CatalogTableRow/CatalogTableRow';
import TablePaginationActions from './TablePaginationActions/TablePaginationActions';
import CatalogTableNotification from './CatalogTableNotification/CatalogTableNotification';

import {
  useAppSelector,
  selectAllCars,
  selectUser,
} from '../../configureStore';
import { Car } from '../../interfaces/Car';

type CatalogTableProps = {
  isAddingCar: boolean;
  toggleMenu: () => void;
};

export default function CatalogTable({
  isAddingCar,
  toggleMenu,
}: CatalogTableProps) {
  const user = useAppSelector(selectUser);
  const carData: Car[] = useAppSelector(selectAllCars);

  const userIsOwner = useMemo(() => {
    if (user) {
      return carData.some((car) => car.user.id === user.id);
    }
    return false;
  }, [user, carData]);

  const showActionsColumn = userIsOwner || isAddingCar;

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - carData.length) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    if (emptyRows === rowsPerPage && page > 0) {
      setPage(page - 1);
    }
  }, [emptyRows, page, rowsPerPage]);

  return (
    <TableContainer component={Paper}>
      <Table
        stickyHeader
        sx={{ minWidth: 500 }}
        aria-label="custom pagination table"
      >
        <CatalogTableHead showActionsColumn={showActionsColumn} />
        <TableBody>
          {isAddingCar && <AddCar toggleMenu={toggleMenu} />}
          {(rowsPerPage > 0
            ? carData.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              )
            : carData
          ).map((car) => (
            <CatalogTableRow
              key={car.id}
              car={car}
              showActionsColumn={showActionsColumn}
            />
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
          {carData.length === 0 && <CatalogTableNotification />}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={13}
              count={carData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
