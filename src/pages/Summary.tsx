import Card from '@mui/material/Card/Card';
import Grid from '@mui/material/Grid/Grid';
import Typography from '@mui/material/Typography/Typography';
import useQuestionsStore from '../store/questionStorage';
import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Summary() {
  const [rightAnswers, setRightAnswers] = useState(0);
  const [timer, setTimer] = useState('');

  const navigate = useNavigate();

  const totalQuestions = useQuestionsStore((state) => state.totalQuestions);
  const getResultQuiz = useQuestionsStore((state) => state.getResultQuiz);
  const getTimer = useQuestionsStore((state) => state.getTimer);

  useEffect(() => {
    setRightAnswers(getResultQuiz());
    setTimer(getTimer());
  }, []);

  const goNewQuiz = () => {
    navigate('/');
  };

  const goRepeatQuiz = () => {
    const dataToSend = { mode: 'repeat' };
    navigate('/game', { state: dataToSend });
  };

  return (
    <Grid container justifyContent="center" mt={4}>
      <Grid item xs={12} sm={10} md={8} lg={6}>
        <Card>
          <Typography align="center" variant="h4" p={3}>
            Resumen
          </Typography>
        </Card>
        <Grid container spacing={2} mt={1}>
          <Grid item xs={12} sm={4}>
            <Card
              sx={{
                backgroundColor: '#424141',
                color: '#ffffff',
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
          <Grid item xs={12} sm={4}>
            <Card
              sx={{
                backgroundColor: '#424141',
                color: '#ffffff',
                marginRight: 1,
                marginLeft: 1,
              }}
            >
              <Typography align="center" variant="h5" pt={2}>
                Porcentaje
              </Typography>
              <Typography align="center" variant="h4" pl={3} pr={3} pb={3}>
                {Math.floor((rightAnswers / totalQuestions) * 100)}%
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card
              sx={{
                backgroundColor: '#424141',
                color: '#ffffff',
                marginLeft: 1,
              }}
            >
              <Typography align="center" variant="h5" pt={2}>
                Tiempo
              </Typography>
              <Typography align="center" variant="h4" pl={3} pr={3} pb={3}>
                {timer}
              </Typography>
            </Card>
          </Grid>
        </Grid>
        <Grid mt={3}>
          <Card>
            <Button
              onClick={goRepeatQuiz}
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
              onClick={goNewQuiz}
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
        <Grid container justifyContent="center" mt={5}>
          {/* Aquí puedes colocar tu banner */}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Summary;
