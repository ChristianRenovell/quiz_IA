import Card from '@mui/material/Card/Card';
import CardActionArea from '@mui/material/CardActionArea/CardActionArea';
import CardContent from '@mui/material/CardContent/CardContent';
import Typography from '@mui/material/Typography/Typography';

function MostViewedCard() {
  return (
    <div style={{ textAlign: 'center', margin: '10px' }}>
      <Card sx={{ maxWidth: 250, backgroundColor: '#424141', color: 'white' }}>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h4" component="div">
              Historia
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
}

export default MostViewedCard;
