import {IColumnLayoutProps} from "../types";
import React, { useState} from "react";
import {useDispatch} from "react-redux";
import {StoreDispatch} from "../redux/store";
import {
    Alert,
    Box,
    Button,
    Checkbox,
    Collapse,
    IconButton, Input,
    List,
    ListItem,
    ListItemText,
    TextField,
} from "@mui/material";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import DeleteIcon from '@mui/icons-material/Delete';
import {Draggable, Droppable} from "react-beautiful-dnd";
import Popup from "./Modal/Popup";







const ColumnLayout: React.FC<IColumnLayoutProps> =

    ({

         labelText,
         addHandler,
         removeHandler,
         completedHandler,
         selectorState,
         droppableId,
         updateTextShowed,
     }) => {





        const [isError, setIsError] = useState({
            isShow: false,
            text: '',
        });

        const [textDescription, setTextDescription] = useState('');
        const dispatch = useDispatch<StoreDispatch>();

        const handleOnChange = ({
                                    target: {value},
                                }: React.ChangeEvent<HTMLInputElement>) => {
            setTextDescription(value);

            setIsError({
                isShow: value.length > 200,
                text:
                    value.length > 200
                        ? 'The input value cannot be more than 200 characters'
                        : '',
            });
        };

        const handleOnBlur = () => {
            setIsError({...isError, isShow: false});
        };

        const handleOnClick = () => {
            if (!isError.isShow) {
                dispatch(addHandler(textDescription));
                setTextDescription('');
            }
        };

        const handleInputKeyDown = ({
                                        target,
                                        key,
                                    }: React.KeyboardEvent<HTMLInputElement>) => {
            if (key === 'Enter') {
                if (
                    (target as HTMLInputElement).value.length > 0 &&
                    (target as HTMLInputElement).value.length <= 200
                ) {
                    handleOnClick();
                } else {
                    setIsError({
                        isShow: true,
                        text: 'The input value cannot be empty',
                    });
                }
            }
        };


        //Work with state label!!!
        const [name, setName] = useState(labelText);
        const [isDisabled, setIsDisabled] = useState(false);
        const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            setName(event.target.value);
        };

        const handleClick = () => {
            setIsDisabled(!isDisabled)
        };




        //Popup
        // const [open, setOpen] = React.useState(false);
        // const handleOpen = () => setOpen(true);
        // const handleClose = () => setOpen(false);
        //
        // const [description, setDescription] = React.useState(text)
        // const handleChangeDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
        //     setDescription(event.target.value);
        // };



        return (

            <>

                {/*Work with state label!!!*/}
                <div>
                    <Input type="text"
                           id="todo"
                           value={name}
                           onChange={handleChange}
                           disabled={isDisabled}
                           onDoubleClickCapture={handleClick}/>
                </div>
                <Box borderRadius={1} width='100%' sx={{boxShadow: 2, p: 3}}>


                    <TextField
                        fullWidth
                        label={name}
                        onChange={handleOnChange}
                        onBlur={handleOnBlur}
                        onKeyDown={handleInputKeyDown}
                        value={textDescription}
                        variant='outlined'
                        size='small'/>





                    <Collapse in={isError.isShow}>
                        <Alert severity='error' sx={{my: 1}}>
                            {isError.text}
                        </Alert>
                    </Collapse>

                    <Box width='100%' display='flex' justifyContent='center'>
                        <Button
                            size='medium'
                            sx={{my: 1, maxWidth: 200}}
                            variant='outlined'
                            color='primary'
                            fullWidth
                            onClick={handleOnClick}
                            onKeyDown={({key}) => key === 'Enter' && handleOnClick()}
                            disabled={textDescription.length === 0 || textDescription.length > 200}
                        >
                            Add Item
                        </Button>
                    </Box>
                    <Droppable droppableId={droppableId}>
                        {(provided) => (
                            <List
                                sx={{
                                    minHeight: '300px',
                                    li: {
                                        flexDirection: 'column',
                                    },
                                    '& .MuiListItemText-root': {
                                        width: '100%',
                                    },
                                }}
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                {selectorState.map(
                                    (
                                        {id, text, isFinished, createdAt, updatedAt, isTextShowed},
                                        index: number
                                    ) => (
                                        <Draggable key={id} draggableId={id} index={index}>
                                            {(provided, snapshot) => (
                                                <ListItem
                                                    sx={{
                                                        transition: '.3s ease background-color',
                                                        color: snapshot.isDragging ? '#fff' : '#000',
                                                        bgcolor: snapshot.isDragging ? '#000' : '#fff',
                                                        position: 'relative',
                                                        border: '1px solid #989898',
                                                        my: 1,
                                                        borderRadius: '3px',
                                                        '& .MuiTypography-root': {
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                        },
                                                    }}
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                >
                                                    <ListItemText
                                                        sx={{
                                                            textDecoration: isFinished ? 'line-through' : 'none',
                                                            wordBreak: 'break-word',
                                                        }}
                                                    >
                                                        {/*функционал и настройки стрелочки(Icon)*/}
                                                        <IconButton

                                                            sx={{p: 1, mr: 1}}
                                                            onClick={() => dispatch(
                                                                updateTextShowed({
                                                                    id,
                                                                    isTextShowed: !isTextShowed,
                                                                })
                                                            )}
                                                        >
                                                            {/*Иконка стрелочки вниз*/}

                                                            <ArrowDownwardIcon

                                                                 sx={{
                                                                    color: snapshot.isDragging ? '#fff' : '#000',
                                                                    transform: !isTextShowed ? 'rotate(180deg)' : '',
                                                                }}/>
                                                        </IconButton>


                                                        <Box
                                                            component='span'
                                                            width='100%'
                                                            position='absolute'
                                                            top='0'
                                                            fontSize='.6rem'
                                                            paddingBottom=".8rem"
                                                        >
                                                            {updatedAt ? 'Updated' : 'Created'} at:{' '}
                                                            {updatedAt || createdAt}
                                                        </Box>

                                                        <Box component='span' width='100%' margin="0.5rem 0 0 0 ">
                                                            {text}
                                                        </Box>

                                                        <Box display='flex' component='span'>
                                                            <IconButton
                                                                onClick={() => dispatch(removeHandler(id))}
                                                            >
                                                                <DeleteIcon
                                                                    sx={{
                                                                        color: snapshot.isDragging ? '#fff' : '#000',
                                                                    }}/>
                                                            </IconButton>
                                                            {/*Иконка отметки выполненно/нет */}
                                                            <Checkbox
                                                                edge='end'
                                                                value={isFinished}
                                                                checked={isFinished}
                                                                inputProps={{'aria-label': 'controlled'}}
                                                                onChange={() => dispatch(
                                                                    completedHandler({
                                                                        isFinished: !isFinished,
                                                                        id,
                                                                        updatedAt: new Date().toLocaleString(),
                                                                    })
                                                                )}/>
                                                        </Box>
                                                    </ListItemText>

                                                    {/*Тут использовать вызов модыльного окна */}
                                                    <Collapse in={isTextShowed}>

                                                        <Popup  />
                                                        {/*<div>*/}
                                                        {/*    <Button onClick={handleOpen}>Open modal</Button>*/}
                                                        {/*    <Modal*/}
                                                        {/*        open={open}*/}
                                                        {/*        onClose={handleClose}*/}
                                                        {/*        aria-labelledby="modal-modal-title"*/}
                                                        {/*        aria-describedby="modal-modal-description"*/}

                                                        {/*    >*/}

                                                        {/*        <Box sx={style}>*/}
                                                        {/*            <Input type="text"*/}
                                                        {/*                   id="todo"*/}
                                                        {/*                   value={name}*/}
                                                        {/*                   onChange={handleChange}*/}
                                                        {/*                   disabled={isDisabled}*/}
                                                        {/*                   onDoubleClickCapture={handleClick}/>*/}

                                                        {/*            /!*<Input type="text"*!/*/}
                                                        {/*            /!*       value={description}*!/*/}
                                                        {/*            /!*       onChange={handleChangeDescription}*!/*/}
                                                        {/*            /!*     />*!/*/}

                                                        {/*            <TextField*/}
                                                        {/*                id="filled-multiline-flexible"*/}
                                                        {/*                label="Description"*/}
                                                        {/*                multiline*/}
                                                        {/*                maxRows={4}*/}
                                                        {/*                value={description}*/}
                                                        {/*                variant="filled"*/}
                                                        {/*                onChange={handleChangeDescription}*/}
                                                        {/*                onBlur={handleOnBlur}*/}
                                                        {/*                onKeyDown={handleInputKeyDown}*/}
                                                        {/*            />*/}

                                                        {/*        </Box>*/}
                                                        {/*    </Modal>*/}
                                                        {/*</div>*/}

                                                    </Collapse>
                                                </ListItem>
                                            )}
                                        </Draggable>
                                    )
                                )}
                                {provided.placeholder}
                            </List>
                        )}
                    </Droppable>
                </Box>
            </>
        );
    };

export default ColumnLayout;