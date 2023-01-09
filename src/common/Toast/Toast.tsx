import ReactDOM from 'react-dom';
import React, { useEffect, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps, AlertColor } from '@mui/material/Alert';

import { useAppDispatch } from '../../configureStore';
// import { resetError } from '../../../store/auth-slice';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

type ToastProps = {
  error: null | undefined | string;
  loading: boolean;
};

type AlertContent = {
  message: string;
  severity: AlertColor | undefined;
};

function ToastComponent({ error, loading }: ToastProps) {
  const dispatch = useAppDispatch();

  const [open, setOpen] = useState<boolean>(false);
  const [alertContent, setAlertContent] = useState<AlertContent>({
    message: 'Pending',
    severity: 'info',
  });

  useEffect(() => {
    if (error) {
      setAlertContent({
        message: error,
        severity: 'error',
      });
      // dispatch(resetError());
    }
    if (loading) {
      setAlertContent({
        message: 'Loading...',
        severity: 'info',
      });
    }

    if (error || loading) {
      setOpen(true);
    }
  }, [error, loading, dispatch]);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={alertContent.severity}>
        {alertContent.message}
      </Alert>
    </Snackbar>
  );
}

export default function Toast({ error, loading }: ToastProps) {
  return ReactDOM.createPortal(
    <ToastComponent error={error} loading={loading} />,
    document.getElementById('overlays') as HTMLElement
  );
}
