import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
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
        <ListItem disablePadding sx={{ border: '1px solid #ffffff' }}>
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
                      border: 'solid 1px #4b4b4b',
                    }
                  : {}
                : {}
            }
            disabled={props.answered}
            onClick={() => selectedAnswered(props.index)}
          >
            <ListItemText
              sx={{
                textAlign: 'center',
              }}
              primary={<Typography variant="h5">{props.option}</Typography>}
            />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );
};

export default QuestionComponent;
