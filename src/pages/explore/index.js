import { Typography, Grid, Card, CardContent } from '@mui/material';
import Image from 'next/image';

export default function index() {
  const dreams = [
    {
      typeOfDream: 'Eating Apple',
      prediction: 'Good fortune',
      thingsToDoIfHaveToAvoidIt: 'Avoid eating apples at night',
    },
    {
      typeOfDream: 'Saw Lion',
      prediction: 'Courage and strength',
      thingsToDoIfHaveToAvoidIt: 'Avoid taking unnecessary risks',
    },
    {
      typeOfDream: 'Hair shaved',
      prediction: 'A fresh start',
      thingsToDoIfHaveToAvoidIt: 'Take care of your appearance',
    },
  ];

  return (
    <div>
      <Typography variant="h1" className='margin-percent' >Explore Dreams</Typography>
      <Grid  container spacing={2} style={{paddingTop: '50px'}} >
        {dreams.map((dream, index) => (
          <Grid className='grid-item' width={300} height={500} item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardContent>
                <Image width={300} height={300} src="https://health.clevelandclinic.org/wp-content/uploads/sites/3/2019/09/Why-Do-We-Dream-1333685958-770x533-1.jpg" />
                <Typography variant="h5">{dream.typeOfDream}</Typography>
                </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}