import {IColumnLayoutProps} from "../types";
import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {StoreDispatch} from "../redux/store";
import {
    Alert,
    Box,
    Button,
    Checkbox,
    Collapse,
    IconButton,
    List,
    ListItem,
    ListItemText,
    TextField,
} from "@mui/material";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import DeleteIcon from '@mui/icons-material/Delete';


export const ColumnLayout: React.FC<IColumnLayoutProps> =
    ({
         labelText,
         addHandler,
         removeHandler,
         completedHandler,
         selectorState,
         droppableId,
     }) => {
        const [isError, setIsError] =
            useState({
                isShow: false,
                text: '',
            })

        const [textDescription, setTextDescription] = useState("")
        const dispatch = useDispatch<StoreDispatch>()

        const handleOnChange = ({
                                    target: {value},
                                }: React.ChangeEvent<HTMLInputElement>) => {
            setTextDescription(value)
            setIsError({
                isShow: value.length > 200,
                text: value.length > 200
                    ? 'The input value cannot be more than 200 characters' : ""
            })
        }

        const handleOnBlur = () => {
            setIsError({...isError, isShow: false})
        }

        const handleOnClick = () => {
            if (!isError) {
                dispatch(addHandler(textDescription))
                setTextDescription("")
            }
        }

        const handleInputKeyDown = ({
                                        target,
                                        key,
                                    }: React.KeyboardEvent<HTMLInputElement>) => {
            if (key === "Enter") {
                if (
                    (target as HTMLInputElement).value.length > 0 &&
                    (target as HTMLInputElement).value.length <= 200
                ) {
                    handleOnClick()
                } else {
                    setIsError({
                        isShow: true,
                        text: 'The input value cannot be empty'
                    })
                }
            }
        }
        return (
            //Box используется за место <Div>
            <Box borderRadius={1} width='100%' sx={{boxShadow: 2, p: 4}}>
                <TextField
                    fullWidth
                    label={labelText}
                    onChange={handleOnChange}
                    onBlur={handleOnBlur}
                    onKeyDown={handleInputKeyDown}
                    value={textDescription}
                    variant='outlined'
                    size='small'
                />
                <Collapse in={isError.isShow}>
                    <Alert severity='error' sx={{my: 1}}>
                        {isError.text}
                    </Alert>
                </Collapse>
                <Box width="100%" display="flex" justifyContent="center">
                    <Button size="medium" sx={{my: 1, maxWidth: 150}}
                            variant="outlined"
                            color="primary"
                            fullWidth
                            onClick={handleOnClick}
                            disabled={
                                textDescription.length === 0 || textDescription.length > 200
                            }
                    >
                        Add Item
                        {/*ДОБАВЛЕНИЕ*/}
                    </Button>
                </Box>
                <List sx={{minHeight: "200px"}}>
                    {selectorState.map(
                        ({id, text, isFinished, createdAt, updatedAt}, index: number) => {
                            return (
                                <ListItem
                                    sx={{
                                        position: 'relative',
                                        border: '1px solid #989898',
                                        bgcolor: '#fff',
                                        my: 1,
                                        borderRadius: '3px',
                                        '& .MuiTypography-root': {
                                            display: 'flex',
                                            alignItems: 'center',
                                        },
                                    }}
                                >
                                    <ListItemText
                                        sx={{
                                            textDecoration: isFinished ? 'line-through' : 'none',
                                            wordBreak: 'break-word',
                                        }}
                                    >
                                        <IconButton sx={{p: 1, mr: 1}}>
                                            <ArrowDownwardIcon/>
                                        </IconButton>

                                        <Box
                                            component='span'
                                            width='100%'
                                            position='absolute'
                                            top='0'
                                            fontSize='.7rem'
                                        >
                                            {updatedAt ? 'Updated' : 'Created'} at:{' '}
                                            {updatedAt || createdAt}
                                        </Box>

                                        <Box component='span' width='100%'>
                                            {text}
                                        </Box>

                                        <Box display='flex' component='span'>
                                            <IconButton onClick={() => dispatch(removeHandler(id))}>
                                                <DeleteIcon/>
                                            </IconButton>
                                            <Checkbox
                                                edge='end'
                                                value={isFinished}
                                                checked={isFinished}
                                                inputProps={{'aria-label': 'controlled'}}
                                                onChange={() =>
                                                    dispatch(
                                                        completedHandler({
                                                            isFinished: !isFinished,
                                                            id,
                                                            updatedAt: new Date().toLocaleString(),
                                                        })
                                                    )
                                                }
                                            />
                                        </Box>
                                    </ListItemText>
                                </ListItem>
                            );
                        }
                    )}
                </List>
            </Box>
        );
    };