import Button from '@mui/material/Button/Button';
import './App.css';
import Typography from '@mui/material/Typography';
import MostViewedCard from './components/mostViewedCard/MostViewedCard';
import Grid from '@mui/material/Grid/Grid';
import { MOST_VIEWED } from './shared/const/most-viewed';
import TextField from '@mui/material/TextField';
import { ThemeProvider, createTheme, styled } from '@mui/material';
import AlertDialog from './components/AlertDialog/AlertDialog';
import React from 'react';

const WhiteTextField = styled(TextField)({
  '& .MuiInputBase-input': {
    color: '#ffffff', // Cambia el color del texto del TextField
  },
  '& .MuiInputLabel-root': {
    color: '#ffffff', // Cambia el color del label del TextField
  },
});

const theme = createTheme();

function App() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Typography align="center" variant="h1" style={{ marginTop: '60px' }}>
          IA Quiz
        </Typography>
        <Typography
          align="center"
          variant="h5"
          style={{ marginTop: '20px', marginBottom: '20px' }}
        >
          Estos son algunas las categorías más utilizadas
        </Typography>
        <Grid
          container
          spacing={2}
          style={{ marginTop: '50px', width: '80%', margin: '0 auto' }}
        >
          {MOST_VIEWED.map((item) => (
            <Grid xs={4}>
              <MostViewedCard title={item.value} />
            </Grid>
          ))}
        </Grid>
        <Grid style={{ marginTop: '30px', width: '80%', margin: '0 auto' }}>
          <Typography
            align="center"
            variant="h5"
            style={{ marginTop: '30px', marginBottom: '20px' }}
          >
            De tema que quieres que creemos el Quiz
          </Typography>
        </Grid>
        <Grid style={{ textAlign: 'center' }}>
          <WhiteTextField
            label="¿De que quieres el Quiz?"
            id="filled-size-small"
            size="small"
            style={{
              width: '50%',
              backgroundColor: '#424141',
              color: '#424141',
            }}
          />
        </Grid>
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Button onClick={handleClickOpen} variant="contained" color="primary">
            ¡Comenzar!
          </Button>
        </div>
      </div>
      <AlertDialog open={open} />
    </ThemeProvider>
  );
}

export default App;
