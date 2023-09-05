import { useEffect } from 'react';
import useQuestionsStore from '../store/questionStorage';
import {
  Card,
  CardContent,
  CardHeader,
  Skeleton,
  Typography,
} from '@mui/material';
import FooterGame from '../components/footerGame.tsx/FooterGame';
import QuestionComponent from '../components/question/Question';

function Game() {
  const getQuestions = useQuestionsStore((state) => state.getQuestions);
  const currentQuestion = useQuestionsStore((state) => state.currentQuestion);
  const questions = useQuestionsStore((state) => state.questions);
  const loading = useQuestionsStore((state) => state.loading);

  useEffect(() => {
    getQuestions();
  }, []);

  return (
    <div>
      {questions.length > 0 ? (
        <Card
          sx={{
            width: '50%',
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
        <p>Cargando preguntas...</p>
      )}
    </div>
  );
}

export default Game;
