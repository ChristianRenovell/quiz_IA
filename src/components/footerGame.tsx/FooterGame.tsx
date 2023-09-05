import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Button, Grid, Typography } from '@mui/material';
import { useEffect } from 'react';
import useQuestionsStore from '../../store/questionStorage';

const FooterGame = () => {
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

  const backQuestion = () => {
    backQuestionStorage();
  };

  const nextQuestion = () => {
    nextQuestionStorage();
  };

  useEffect(() => {}, []);

  return (
    <Grid sx={{ paddingLeft: 2, paddingBottom: 2 }}>
      <Typography variant="h4">
        <ArrowBackIosIcon onClick={backQuestion} sx={{ cursor: 'pointer' }} />
        <ArrowForwardIosIcon
          onClick={nextQuestion}
          sx={{ cursor: 'pointer', marginRight: 2 }}
        />
        <span>
          {currentQuestionStorage + 1}/{totalQuestionsStorage}
        </span>
        <Button
          sx={{
            float: 'right',
            marginRight: 2,
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
          Aceptar
        </Button>
      </Typography>
    </Grid>
  );
};

export default FooterGame;
