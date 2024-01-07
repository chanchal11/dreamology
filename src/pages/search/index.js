import { Button, FormControl, FormLabel, TextField } from "@mui/material";
import { Typography, Grid, Card, CardContent } from '@mui/material';
import Image from 'next/image';
import ModalComponent from '../../components/Modal';
import axios from "axios";
import { useState } from "react";

export default function index() {
    const [userInput, setUserInput] = useState('');
    const [ dreams, setDreams ] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedDream, setSelectedDream] = useState({});
    const handleSubmit = (e) => {
        e.preventDefault();
        // alert('Clicked');
        axios.get('http://localhost:5000/find_related_dreams?user_input=' + userInput).then((res) => {
            console.log(res.data);
            setDreams(res.data.related_dreams);
        });
    };

    return <div>
        { dreams.length == 0 &&  <Typography variant="h2" style={{marginLeft: '20%', marginRight: '20%', marginTop: '100px'}} >Search about your dream</Typography> }
        <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', marginLeft: '20%', marginRight: '20%', marginTop: '80px'}}>
        <FormLabel>Dream details</FormLabel>
             <TextField value={userInput} onChange={(e) => setUserInput(e.target.value)} type="text" />
             <Button type="submit" >Submit</Button>
        </form>
        { dreams.length > 0 && <div>
      <Typography variant="h2" className='margin-percent' >Results</Typography>
      <Grid container spacing={2} style={{ paddingTop: '50px' }} >
        {dreams.map((dream, index) => (
          <Grid className='grid-item' width={300} height={500} item xs={12} sm={6} md={4} key={index}>
            <Card onClick={() => {
              setOpen(true);
              setSelectedDream(dream);
            }} >
              <CardContent>
                <Image width={300} height={300} src="https://health.clevelandclinic.org/wp-content/uploads/sites/3/2019/09/Why-Do-We-Dream-1333685958-770x533-1.jpg" />
                <Typography variant="h5">{dream.typeOfDream}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <ModalComponent open={open} handleClose={() => setOpen(false)} dream={selectedDream} />
    </div>}
    </div>
}
