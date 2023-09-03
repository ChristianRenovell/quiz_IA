import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Grid, Typography } from '@mui/material';
import { useEffect } from 'react';
import useQuestionsStore from '../../store/questionStorage';

const FooterGame = () => {
  const setCurrentQuestion = useQuestionsStore(
    (state) => state.setCurrentQuestion
  );

  const totalQuestionsStorage = useQuestionsStore(
    (state) => state.totalQuestions
  );

  const currentQuestionStorage = useQuestionsStore(
    (state) => state.currentQuestion
  );

  useEffect(() => {
    setTimeout(() => {
      setCurrentQuestion(2);
    }, 2000);
  }, []);

  return (
    <Grid sx={{ paddingLeft: 2, paddingBottom: 2 }}>
      <Typography variant="h4">
        <ArrowBackIosIcon sx={{ cursor: 'pointer' }} />
        <ArrowForwardIosIcon sx={{ cursor: 'pointer', marginRight: 2 }} />
        <span>
          {currentQuestionStorage}/{totalQuestionsStorage}
        </span>
      </Typography>
    </Grid>
  );
};

export default FooterGame;
