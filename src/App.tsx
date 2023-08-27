import Button from '@mui/material/Button/Button';
import './App.css';
import Typography from '@mui/material/Typography';
import MostViewedCard from './components/mostViewedCard/MostViewedCard';
import Grid from '@mui/material/Grid/Grid';

function App() {
  const data = ['Elemento 1', 'Elemento 2', 'Elemento 3'];

  return (
    <div>
      <Typography align="center" variant="h1" style={{ marginTop: '100px' }}>
        IA Quiz
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          {data.map(() => (
            <MostViewedCard />
          ))}
        </Grid>
      </Grid>

      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Button variant="contained" color="primary">
          ¡Comenzar!
        </Button>
      </div>
    </div>
  );
}

export default App;
