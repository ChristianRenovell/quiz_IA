import { useEffect } from 'react';
import useQuestionsStore from '../store/questionStorage';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  LinearProgress,
  Skeleton,
  Typography,
} from '@mui/material';
import FooterGame from '../components/footerGame.tsx/FooterGame';
import QuestionComponent from '../components/question/Question';
import '../index.css';

function Game() {
  const { getQuestions, currentQuestion, questions, loading } =
    useQuestionsStore((state) => ({
      getQuestions: state.getQuestions,
      currentQuestion: state.currentQuestion,
      questions: state.questions,
      loading: state.loading,
    }));
  useEffect(() => {
    getQuestions();
  }, []);

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={10} md={8} lg={6}>
        {' '}
        {/* Ajustar el ancho según tus necesidades */}
        {questions.length > 0 ? (
          <Card
            sx={{
              width: '100%',
              margin: '0 auto',
              marginTop: '70px',
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
            <LinearProgress
              sx={{
                backgroundColor: 'white',
                '& .MuiLinearProgress-bar': {
                  backgroundColor: '#424141',
                },
              }}
            />
            <Typography
              className="blinking"
              align="center"
              variant="h5"
              sx={{ mt: 5 }}
            >
              Estamos preparando el quiz!
            </Typography>
          </Box>
        )}
      </Grid>
    </Grid>
  );
}

export default Game;
