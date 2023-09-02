import Card from '@mui/material/Card/Card';
import CardActionArea from '@mui/material/CardActionArea/CardActionArea';
import CardContent from '@mui/material/CardContent/CardContent';
import Typography from '@mui/material/Typography/Typography';

type MostViewedCardProps = {
  title: string;
};

const MostViewedCard: React.FC<MostViewedCardProps> = (props) => {
  return (
    <div style={{ textAlign: 'center', margin: '10px' }}>
      <Card sx={{ backgroundColor: '#424141', color: 'white' }}>
        <CardActionArea>
          <CardContent>
            <Typography variant="h5" component="div">
              {props.title}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
};

export default MostViewedCard;
