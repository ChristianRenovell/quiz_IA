import { useEffect, useState } from 'react';
import useQuestionsStore from '../store/questionStorage';
import { Question } from '../services/models/ResQuestions';
import {
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Skeleton,
  Typography,
} from '@mui/material';
import FooterGame from '../components/footerGame.tsx/FooterGame';

function Game() {
  const getQuestions = useQuestionsStore((state) => state.getQuestions);
  const currentQuestion = useQuestionsStore((state) => state.currentQuestion);

  const [loading, isLoading] = useState<boolean>(true);
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const res = await getQuestions();
        setQuestions(res);
        isLoading(false);
      } catch (error) {
        console.error(error);
      }
    }

    fetchQuestions();
  }, []);

  return (
    <div>
      {' '}
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
              <div key={index}>
                <List>
                  <ListItem disablePadding>
                    <ListItemButton
                      sx={
                        { backgroundColor: '#3B3A3A' }
                        //loading
                        // ? {
                        //     backgroundColor: '#ffffff',
                        //     color: '#424141',
                        //   }
                        // : {
                        //     backgroundColor: '#000000',
                        //     color: '#424141',
                        //   }
                      }
                    >
                      {loading ? (
                        <Skeleton
                          sx={{
                            width: '100%',
                          }}
                        />
                      ) : (
                        <ListItemText
                          sx={{
                            textAlign: 'center',
                          }}
                          primary={
                            <Typography variant="h5">{option}</Typography>
                          }
                        />
                      )}
                    </ListItemButton>
                  </ListItem>
                </List>
              </div>
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
