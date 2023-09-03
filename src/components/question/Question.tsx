import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Skeleton,
  Typography,
} from '@mui/material';

const QuestionComponent = (props) => {
  const checkCorrectAnwer = (index) => {};

  return (
    <div key={props.index}>
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
