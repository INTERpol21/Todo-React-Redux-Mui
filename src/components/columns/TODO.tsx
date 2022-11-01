import Typography from '@mui/material/Typography';
import {useSelector} from 'react-redux';
import {StoreState} from '../../redux/store';
import {todoSlice} from "../../redux/slice/TODO";
import ColumnLayout from "../ColumnLayout";
import React, {useState} from "react";




export function ToDoColumn() {
    const {todo} = useSelector((state: StoreState) => state);

    const {
        actions: {completeStatus, remove, add, updateTextShowed},
    } = todoSlice;

    const [name, setName] = useState("ToDo");


    // const [description, setDescription] = useState('')

    return (
        <>
            <Typography mb={3}>All {name} tasks: {todo.length}</Typography>

            <ColumnLayout

                droppableId='todo'
                labelText={name}
                completedHandler={completeStatus}
                removeHandler={remove}
                addHandler={add}
                selectorState={todo}
                updateTextShowed={updateTextShowed}

            />


        </>
    );
}