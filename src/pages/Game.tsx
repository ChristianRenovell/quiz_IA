import { useEffect, useState } from 'react';
import useQuestionsStore from '../store/questionStorage';
import { Typography } from '@mui/material';
import { Quiz } from '../services/models/ResQuestions';

function Game() {
  const getQuestions = useQuestionsStore((state) => state.getQuestions);

  const [questions, setQuestions] = useState<Quiz[]>();

  useEffect(() => {
    getQuestions().then((res) => {
      setQuestions(res);
      console.log(questions);
    });
  }, []);

  return (
    <div>
      <Typography variant="h6" gutterBottom></Typography>
    </div>
  );
}

export default Game;
