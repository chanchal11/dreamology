import { Card, CardContent, Typography } from '@mui/material';
import Modal from '@mui/material/Modal';
import Image from 'next/image';
export default function ModalComponent({open, handleClose, dream}) {
     
    return (
        <Modal
          open={open}
          onClose={handleClose}
          className='ex-modal'
        >
            <Card>
            <CardContent>
            <Image width={300} height={300} alt='default pic' src="https://health.clevelandclinic.org/wp-content/uploads/sites/3/2019/09/Why-Do-We-Dream-1333685958-770x533-1.jpg" />
            <Typography variant="h5">{dream.typeOfDream}</Typography>
            <Typography variant="body1">{dream.prediction}</Typography>
            <Typography variant="body2">{dream.thingsToDoIfHaveToAvoidIt}</Typography>
            </CardContent>
        </Card>
        </Modal>
    );
  };
