import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Grid, Typography } from '@mui/material';
import { useEffect } from 'react';
import useQuestionsStore from '../../store/questionStorage';

const FooterGame = () => {
  const totalQuestionsStorage = useQuestionsStore(
    (state) => state.totalQuestions
  );

  const currentQuestionStorage = useQuestionsStore(
    (state) => state.currentQuestion
  );

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
      </Typography>
    </Grid>
  );
};

export default FooterGame;
