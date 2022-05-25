import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
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

export default function BasicModal({ modalDataToBeShown, openModal, handleClose }) {
    const header = "https://image.tmdb.org/t/p/w185/"
    return (
        <div>
            <Modal
                open={openModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>

                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {modalDataToBeShown.name}
                    </Typography>
                    <div className='d-flex'>
                        {
                            modalDataToBeShown.known_for.map(i => {
                                return (
                                    <img src={`${header}${i.poster_path}`} alt={i.original_name || i.original_title} />
                                )
                            })
                        }
                    </div>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {modalDataToBeShown.known_for.map(i => i.original_title || i.original_name).join(", ")}
                    </Typography>
                    <Button onClick={handleClose}>Close</Button>
                </Box>
            </Modal>

        </div>
    );
}