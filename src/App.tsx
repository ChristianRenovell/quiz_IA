import Button from '@mui/material/Button/Button';
import './App.css';
import Typography from '@mui/material/Typography';
import MostViewedCard from './components/mostViewedCard/MostViewedCard';
import Grid from '@mui/material/Grid/Grid';
import { MOST_VIEWED } from './shared/const/most-viewed';
import TextField from '@mui/material/TextField';
import { ThemeProvider, styled } from '@mui/material';
import AlertDialog from './components/AlertDialog/AlertDialog';
import { theme } from './them';
import { useState } from 'react';

const WhiteTextField = styled(TextField)({
  '& .MuiInputBase-input': {
    color: '#ffffff',
  },
  '& .MuiInputLabel-root': {
    color: '#ffffff',
  },
  '& .MuiInputBase-input:focus': {
    color: '#ffffff',
  },
  '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
    'border-color': '#ffffff',
  },
});

function App() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [category, setCategory] = useState('');
  const [inputCategory, setInputValue] = useState('');

  const handleOpenDialog = () => {
    setCategory(inputCategory);
    setDialogOpen(true);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const selectMostView = (category: string) => {
    setCategory(category);
    setDialogOpen(true);
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
            <Grid xs={4} onClick={() => selectMostView(item.value)}>
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
            ¿De que tema quieres que creemos el Quiz?
          </Typography>
        </Grid>
        <Grid style={{ textAlign: 'center' }}>
          <WhiteTextField
            id="filled-size-small"
            size="small"
            value={inputCategory}
            onChange={handleInputChange}
            style={{
              width: '50%',
              backgroundColor: '#424141',
            }}
          />
        </Grid>
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Button
            onClick={handleOpenDialog}
            variant="contained"
            color="primary"
          >
            ¡Comenzar!
          </Button>
        </div>
      </div>
      <AlertDialog
        openDialog={dialogOpen}
        handleClose={handleCloseDialog}
        category={category}
      />
    </ThemeProvider>
  );
}

export default App;
