import { AlertColor, SnackbarOrigin } from '@mui/material';
import { create } from 'zustand';

interface State {
  message: string;
  severity: AlertColor;
  isOpen: boolean;
  autoHideDuration: number;
  anchorOrigin: SnackbarOrigin;
  handleClose: () => void;
  showSnackBar: (
    message: string,
    severity: AlertColor,
    autoHideDuration?: number
  ) => void;
}

const useSnackBarStore = create<State>((set) => ({
  message: '',
  severity: 'success',
  isOpen: false,
  autoHideDuration: 6000,
  anchorOrigin: { vertical: 'top', horizontal: 'right' },
  handleClose: (reason?: string) => {
    if (reason !== 'clickaway') {
      set({
        isOpen: false,
      });
    }
  },
  showSnackBar: (message, severity, autoHideDuration = 6000) => {
    set({
      isOpen: true,
      message: message,
      severity: severity,
      autoHideDuration: autoHideDuration,
    });
  },
}));

export default useSnackBarStore;
