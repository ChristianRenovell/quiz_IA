import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  ThemeProvider,
  Typography,
} from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import React from 'react';
import { DIFICULTY, NUM_QUESTIONS } from './models/AlertDialog.models';
import { themeSelect } from '../../them';

interface AlertDialogProps {
  openDialog: boolean;
  category: string;
  handleClose: () => void;
  handleAcept: (
    numQuestions: string,
    difficulty: string,
    category: string
  ) => void;
}

const AlertDialog = ({
  openDialog,
  handleClose,
  handleAcept,
  category,
}: AlertDialogProps) => {
  const [numQuestions, setNumQuestions] = React.useState('10');
  const [difficulty, setDifficulty] = React.useState('Media');

  const handleChangeNumQuestions = (event: SelectChangeEvent) => {
    setNumQuestions(event.target.value);
  };

  const handleChangeDifficulty = (event: SelectChangeEvent) => {
    setDifficulty(event.target.value);
  };

  function handleAceptEmoted() {
    handleAcept(numQuestions, difficulty, category);
  }

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
          <ThemeProvider theme={themeSelect}>
            <FormControl
              sx={{
                m: 1,
                width: '15%',
                '@media (max-width: 600px)': {
                  width: '30%',
                },
              }}
            >
              <Typography variant="subtitle1" gutterBottom>
                Preguntas
              </Typography>
              <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                value={numQuestions}
                onChange={handleChangeNumQuestions}
              >
                {NUM_QUESTIONS.map((question) => (
                  <MenuItem key={question.key} value={question.value}>
                    {question.key}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl
              sx={{
                m: 1,
                width: '30%',
                '@media (max-width: 600px)': {
                  width: '40%',
                },
              }}
            >
              <Typography variant="subtitle1" gutterBottom>
                Dificultad
              </Typography>
              <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                value={difficulty}
                onChange={handleChangeDifficulty}
              >
                {DIFICULTY.map((value) => (
                  <MenuItem key={value.key} value={value.value}>
                    {value.key}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </ThemeProvider>
        </DialogContent>
        <DialogActions>
          <Button
            color="secondary"
            variant="contained"
            onClick={handleAceptEmoted}
          >
            Aceptar
          </Button>
          <Button color="primary" variant="contained" onClick={handleClose}>
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AlertDialog;
