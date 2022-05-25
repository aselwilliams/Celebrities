import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
const header = "https://image.tmdb.org/t/p/w185/"

function ModalComp({modalDataToBeShown,handleClose}) {

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
  return (
    <div>
      
<Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={style}>
    <Typography id="modal-modal-title" variant="h6" component="h2">
      {modalDataToBeShown.name}
    </Typography>
    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
      {modalDataToBeShown.know_for.map(i=>i.original_title || i.original_name).join(', ')}
    </Typography>
    <Button onClick={handleClose}>Close</Button>
  </Box>
</Modal>
    </div>
  )
}

export default ModalComp