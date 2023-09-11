import { useEffect } from 'react';
import useQuestionsStore from '../store/questionStorage';
import {
  Alert,
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  LinearProgress,
  Skeleton,
  Typography,
} from '@mui/material';
import FooterGame from '../components/footerGame/FooterGame';
import QuestionComponent from '../components/question/Question';
import '../index.css';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { REPEAT } from '../shared/const/urlParams';
import useSnackBarStore from '../store/snackBarStorage';

function Game() {
  const navigate = useNavigate();
  const location = useLocation();

  const { getQuestions, repeatQuiz, currentQuestion, questions, loading } =
    useQuestionsStore((state) => ({
      getQuestions: state.getQuestions,
      repeatQuiz: state.repeatQuiz,
      currentQuestion: state.currentQuestion,
      questions: state.questions,
      loading: state.loading,
    }));

  const showSnackBar = useSnackBarStore((state) => state.showSnackBar);

  useEffect(() => {
    if (location.state !== undefined && location.state?.mode === REPEAT) {
      repeatQuiz();
    } else {
      getQuestions().then((result) => {
        if (!result) {
          showSnackBar(
            'Hemos tenido un problema inesperado, disculpe las molestias',
            'error'
          );
          navigate('/');
        }
      });
    }
  }, []);

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={10} md={8} lg={6}>
        {questions.length > 0 ? (
          <Card
            sx={{
              width: '100%',
              margin: '0 auto',
              marginTop: '30px',
              backgroundColor: '#424141',
              color: '#ffffff',
            }}
          >
            <CardHeader
              title={
                <Typography align="center" variant="h4">
                  {loading ? (
                    <Skeleton />
                  ) : (
                    <p>{questions[currentQuestion].question}</p>
                  )}
                </Typography>
              }
              sx={{
                backgroundColor: '#ffffff',
                color: '#424141',
              }}
            />

            <CardContent>
              {questions[currentQuestion].options.map((option, index) => (
                <QuestionComponent
                  key={index}
                  option={option}
                  index={index}
                  correct_answer={questions[currentQuestion].correct_answer}
                  answered={questions[currentQuestion].answered}
                  selected_answer={questions[currentQuestion].selected_answer}
                  loading={loading}
                />
              ))}
            </CardContent>
            <FooterGame></FooterGame>
          </Card>
        ) : (
          <Box sx={{ width: '100%' }}>
            <Typography
              className="blinking"
              align="center"
              variant="h5"
              sx={{ mt: 5, mb: 3 }}
            >
              Estamos preparando el quiz!
            </Typography>
            <LinearProgress
              sx={{
                backgroundColor: 'white',
                '& .MuiLinearProgress-bar': {
                  backgroundColor: '#424141',
                },
              }}
            />
          </Box>
        )}
      </Grid>
    </Grid>
  );
}

export default Game;
