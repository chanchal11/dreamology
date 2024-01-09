import { Typography, Grid, Card, CardContent } from '@mui/material';
import Image from 'next/image';
import ModalComponent from '../../components/Modal';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Index({ dreams }) {

  const [open, setOpen] = useState(false);
  const [selectedDream, setSelectedDream] = useState({});
  return (
    <div>
      <Typography variant="h2" className='margin-percent' >Explore Dreams</Typography>
      <Grid container spacing={2} style={{ paddingTop: '50px' }} >
        {dreams.map((dream, index) => (
          <Grid className='grid-item' width={300} height={500} item xs={12} sm={6} md={4} key={index}>
            <Card onClick={() => {
              setOpen(true);
              setSelectedDream(dream);
            }} >
              <CardContent>
                <Image width={300} height={300} src="https://health.clevelandclinic.org/wp-content/uploads/sites/3/2019/09/Why-Do-We-Dream-1333685958-770x533-1.jpg" alt="Dream Image" />
                <Typography variant="h5">{dream.typeOfDream}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <ModalComponent open={open} handleClose={() => setOpen(false)} dream={selectedDream} />
    </div>
  );
}

export const getStaticProps = async () => {
  let dreams = [];
  try {
    const res = await axios.get(`${process.env.DREAMS_HOST}/dreams`);
    dreams = res.data.dreams;
    // console.log(await res.json());
  } catch (error) {
    console.error('Failed to fetch dreams:', error);
  }
  return {
    props: {
      dreams
    },
    // revalidate: 10, // In seconds
  };
}
