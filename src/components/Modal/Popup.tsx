import {Box, Button, Input, Modal, TextField,} from "@mui/material";
import React, {useState} from "react";


const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function Popup() {

    const [name, setName] = useState("");
    const [isDisabled, setIsDisabled] = useState(false);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };
    //
    // const handleClick = () => {
    //     setIsDisabled(!isDisabled)
    // };




    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [description, setDescription] = React.useState('')
    const handleChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value);
    };
    return (
        <div>
            <Button onClick={handleOpen}>Open modal</Button>



            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >


                <Box sx={style}>
                    <Box>
                        <Input type="text"
                               id="todo"
                               value={name}
                               // onChange={handleChange}
                               onChange={handleChange}
                        />
                    </Box>
                    <TextField
                        id="filled-multiline-flexible"
                        label="Description"
                        multiline
                        maxRows={4}
                        value={description}
                        variant="filled"
                        onChange={handleChange2}
                    />
                </Box>
            </Modal>
        </div>

    )


}
