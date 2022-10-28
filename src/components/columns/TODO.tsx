import Typography from '@mui/material/Typography';
import {useSelector} from 'react-redux';
import {StoreState} from '../../redux/store';
import {todoSlice} from "../../redux/slice/TODO";
import ColumnLayout from "../ColumnLayout";
import {Input} from "@mui/material";
import React, {useState} from "react";


export function ToDoColumn() {
    const {todo} = useSelector((state: StoreState) => state);

    const {
        actions: {completeStatus, remove, add, updateTextShowed},
    } = todoSlice;

    const [name, setName] = useState("ToDo");
    const [isDisabled, setIsDisabled] = useState(false);


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handleClick = () => {
        setIsDisabled(!isDisabled)
    };



    return (
        <>
            <Typography mb={3}>All {name} tasks: {todo.length}</Typography>
            <Input type="text"
                   id="todo"
                   value={name}
                   onChange={handleChange}
                   disabled={isDisabled}
                   onDoubleClickCapture={handleClick}/>

            <ColumnLayout
                droppableId='todo'
                labelText= {name}
                completedHandler={completeStatus}
                removeHandler={remove}
                addHandler={add}
                selectorState={todo}
                updateTextShowed={updateTextShowed}
            />
        </>
    );
}