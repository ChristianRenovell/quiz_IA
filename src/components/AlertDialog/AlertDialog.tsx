import { makeStyles } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface AlertDialogProps {
  openDialog: boolean;
  category: string;
  handleClose: () => void;
}

export default function AlertDialog({
  openDialog,
  handleClose,
  category,
}: AlertDialogProps) {
  return (
    <div>
      <Dialog
        open={openDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          ¡Prepárate para el Quiz de {category}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Estamos a punto de sumergirte en el emocionante universo de{' '}
            {category} con un Quiz personalizado que hemos creado solo para ti.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="secondary" variant="contained" onClick={handleClose}>
            Aceptar
          </Button>
          <Button color="primary" variant="contained" onClick={handleClose}>
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
