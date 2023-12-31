import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import useQuestionsStore from '../../store/questionStorage';

interface QuestionComponentProps {
  key: number;
  option: string;
  index: number;
  correct_answer: number;
  answered: boolean;
  selected_answer: number | null | undefined;
  loading: boolean;
}

const QuestionComponent: React.FC<QuestionComponentProps> = (props) => {
  const updateQuestion = useQuestionsStore((state) => state.updateQuestion);
  const currentQuestion = useQuestionsStore((state) => state.currentQuestion);

  const selectedAnswered = (index: number) => {
    updateQuestion(currentQuestion, 'selected_answer', index);
    updateQuestion(currentQuestion, 'answered', true);
  };

  return (
    <div key={props.index}>
      <List>
        <ListItem
          disablePadding
          sx={{ border: '1px solid #ffffff', zIndex: 9999 }}
        >
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
            onTouchStart={() => selectedAnswered(props.index)}
          >
            <ListItemText
              sx={{
                textAlign: 'center',
              }}
              primary={
                <Typography
                  sx={{
                    fontSize: '18px',
                    '@media (min-width: 700px)': {
                      fontSize: '25px',
                    },
                  }}
                >
                  {props.option}
                </Typography>
              }
            />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );
};

export default QuestionComponent;
