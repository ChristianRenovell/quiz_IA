import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Skeleton,
  Typography,
} from '@mui/material';
import useQuestionsStore from '../../store/questionStorage';

const QuestionComponent = (props) => {
  const updateQuestion = useQuestionsStore((state) => state.updateQuestion);
  const currentQuestion = useQuestionsStore((state) => state.currentQuestion);

  const selectedAnswered = (index: string) => {
    updateQuestion(currentQuestion, 'selected_answer', index);
    updateQuestion(currentQuestion, 'answered', true);
  };

  return (
    <div key={props.index}>
      <List>
        <ListItem disablePadding>
          <ListItemButton
            sx={
              props.correct_answer === props.index && props.answered
                ? {
                    backgroundColor: '#ffffff',
                    color: '#424141',
                  }
                : props.correct_answer !== props.index
                ? props.selected_answer === props.index
                  ? {
                      backgroundColor: '#000000',
                      color: '#ffffff',
                    }
                  : {}
                : {}
            }
            disabled={props.answered}
            onClick={() => selectedAnswered(props.index)}
          >
            {props.loading ? (
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
                primary={<Typography variant="h5">{props.option}</Typography>}
              />
            )}
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );
};

export default QuestionComponent;
