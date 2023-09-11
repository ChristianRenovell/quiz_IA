import { Alert, Snackbar } from '@mui/material';
import useSnackBarStore from '../../store/snackBarStorage';

const SnackbarComponent = (props) => {
  const {
    message,
    severity,
    isOpen,
    autoHideDuration,
    anchorOrigin,
    handleClose,
  } = useSnackBarStore((state) => ({
    message: state.message,
    severity: state.severity,
    isOpen: state.isOpen,
    autoHideDuration: state.autoHideDuration,
    anchorOrigin: state.anchorOrigin,
    handleClose: state.handleClose,
  }));

  return (
    <div>
      <Snackbar
        open={isOpen}
        autoHideDuration={autoHideDuration}
        onClose={handleClose}
        anchorOrigin={anchorOrigin}
      >
        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default SnackbarComponent;
