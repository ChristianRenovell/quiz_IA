import Card from '@mui/material/Card/Card';
import Grid from '@mui/material/Grid/Grid';
import Typography from '@mui/material/Typography/Typography';
import useQuestionsStore from '../store/questionStorage';

function Summary() {
  const totalQuestions = useQuestionsStore((state) => state.totalQuestions);

  return (
    <Grid container justifyContent="center">
      <Grid mt={10} style={{ width: '70%' }}>
        <Card>
          <Typography align="center" variant="h4" p={3}>
            Resultado
          </Typography>
        </Card>
        <Card
          sx={{
            backgroundColor: '#424141',
            color: '#ffffff',
            marginTop: 2,
          }}
        >
          <Typography align="center" variant="h4" p={3}>
            {totalQuestions}
          </Typography>
        </Card>
      </Grid>
    </Grid>
  );
}

export default Summary;
