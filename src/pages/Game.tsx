import { useEffect } from 'react';
import useQuestionsStore from '../store/questionStorage';

function Game() {
  const getQuestions = useQuestionsStore((state) => state.getQuestions);

  useEffect(() => {
    getQuestions().then((res) => {
      console.log(res);
    });
  }, []);

  return <div>GAME</div>;
}

export default Game;
