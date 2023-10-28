import { Button, FormControl, FormLabel, TextField, Typography } from "@mui/material";

export default function index(){

    return <div>
        <Typography variant="h1" style={{marginLeft: '20%', marginRight: '20%', marginTop: '100px'}} >Search about your dream</Typography>
        <FormControl onSubmit={(e) => {
            e.preventDefault();
        }}  style={{display: 'flex', marginLeft: '20%', marginRight: '20%', marginTop: '80px'}}  >
            <FormLabel>Dream details</FormLabel>
            <TextField type="text" />
            <Button type="submit" >Submit</Button>
        </FormControl>
    </div>
}