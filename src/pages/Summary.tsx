import Card from '@mui/material/Card/Card';
import Grid from '@mui/material/Grid/Grid';
import Typography from '@mui/material/Typography/Typography';
import useQuestionsStore from '../store/questionStorage';
import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Summary() {
  const [rightAnswers, setRightAnswers] = useState(0);

  const navigate = useNavigate();

  const totalQuestions = useQuestionsStore((state) => state.totalQuestions);
  const getResultQuiz = useQuestionsStore((state) => state.getResultQuiz);

  useEffect(() => {
    setRightAnswers(getResultQuiz());
  }, []);

  const goHome = () => {
    navigate('/');
  };

  return (
    <Grid container justifyContent="center">
      <Grid mt={6} style={{ width: '70%' }}>
        <Card>
          <Typography align="center" variant="h4" p={3}>
            Resumen
          </Typography>
        </Card>
        <Grid sx={{ display: 'flex' }}>
          <Grid item xs={4}>
            <Card
              sx={{
                backgroundColor: '#424141',
                color: '#ffffff',
                marginTop: 2,
                marginRight: 1,
              }}
            >
              <Typography align="center" variant="h5" pt={2}>
                Aciertos
              </Typography>
              <Typography align="center" variant="h4" pl={3} pr={3} pb={3}>
                {rightAnswers} / {totalQuestions}
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card
              sx={{
                backgroundColor: '#424141',
                color: '#ffffff',
                marginTop: 2,
                marginRight: 1,
                marginLeft: 1,
              }}
            >
              <Typography align="center" variant="h5" pt={2}>
                Porcentage
              </Typography>
              <Typography align="center" variant="h4" pl={3} pr={3} pb={3}>
                {Math.floor((rightAnswers / totalQuestions) * 100)}%
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card
              sx={{
                backgroundColor: '#424141',
                color: '#ffffff',
                marginTop: 2,
                marginLeft: 1,
              }}
            >
              <Typography align="center" variant="h5" pt={2}>
                Tiempo
              </Typography>
              <Typography align="center" variant="h4" pl={3} pr={3} pb={3}>
                {rightAnswers} / {totalQuestions}
              </Typography>
            </Card>
          </Grid>
        </Grid>
        <Grid mt={2}>
          <Card>
            <Button
              sx={{
                float: 'right',
                marginTop: 2,
                marginBottom: 2,
                marginRight: 2,
                backgroundColor: '#ffffff',
                color: '#000000',
                '&:hover': {
                  backgroundColor: 'rgb(178, 178, 178)',
                },
              }}
              variant="contained"
            >
              Repetir Quiz
            </Button>
            <Button
              onClick={goHome}
              sx={{
                float: 'right',
                marginTop: 2,
                marginBottom: 2,
                marginRight: 2,
                backgroundColor: '#241a00',
                color: '#ffffff',
                '&:hover': {
                  backgroundColor: 'rgb(178, 178, 178)',
                },
              }}
              variant="contained"
            >
              Nuevo Quiz
            </Button>
          </Card>
        </Grid>
        <Grid mt={5}>baenner</Grid>
      </Grid>
    </Grid>
  );
}

export default Summary;
