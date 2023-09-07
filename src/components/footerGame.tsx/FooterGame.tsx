import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Button, Grid, Typography } from '@mui/material';
import useQuestionsStore from '../../store/questionStorage';
import { useNavigate } from 'react-router-dom';

const FooterGame = () => {
  const navigate = useNavigate();

  const totalQuestionsStorage = useQuestionsStore(
    (state) => state.totalQuestions
  );

  const currentQuestionStorage = useQuestionsStore(
    (state) => state.currentQuestion
  );

  const currentQuestion = useQuestionsStore((state) => state.currentQuestion);
  const questions = useQuestionsStore((state) => state.questions);

  const backQuestionStorage = useQuestionsStore((state) => state.backQuestion);

  const nextQuestionStorage = useQuestionsStore((state) => state.nextQuestion);

  const quizCompleted = useQuestionsStore((state) => state.quizCompleted);

  const backQuestion = () => {
    backQuestionStorage();
  };

  const nextQuestion = () => {
    nextQuestionStorage();
  };

  const goSummary = () => {
    navigate('/summary');
  };

  return (
    <Grid sx={{ paddingLeft: 2, paddingBottom: 2 }}>
      <Typography variant="h4">
        {quizCompleted && (
          <>
            <ArrowBackIosIcon
              onClick={backQuestion}
              sx={{ cursor: 'pointer' }}
            />
            <ArrowForwardIosIcon
              onClick={nextQuestion}
              sx={{ cursor: 'pointer', marginRight: 2 }}
            />
            <span>
              {currentQuestionStorage + 1}/{totalQuestionsStorage}
            </span>
          </>
        )}
        {!quizCompleted ? (
          <Button
            sx={{
              float: 'right',
              margin: 2,
              backgroundColor: '#ffffff',
              color: '#000000',
              '&:hover': {
                backgroundColor: 'rgb(178, 178, 178)',
              },
            }}
            disabled={!questions[currentQuestion].answered}
            variant="contained"
            onClick={nextQuestion}
          >
            Continuar
          </Button>
        ) : (
          <Button
            sx={{
              float: 'right',
              margin: 2,
              backgroundColor: '#ffffff',
              color: '#000000',
              '&:hover': {
                backgroundColor: 'rgb(178, 178, 178)',
              },
            }}
            variant="contained"
            onClick={goSummary}
          >
            Finalizar
          </Button>
        )}
      </Typography>
    </Grid>
  );
};

export default FooterGame;
