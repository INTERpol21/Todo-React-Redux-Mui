import Typography from '@mui/material/Typography';
import {useSelector} from 'react-redux';
import {StoreState} from '../../redux/store';
import ColumnLayout from "../ColumnLayout";
import {doneSlice} from "../../redux/slice/Done";
import React, {useState} from "react";



export function DoneColumn() {
    const {done} = useSelector((state: StoreState) => state);
    const {
        actions: {completeStatus, remove, add, updateTextShowed},
    } = doneSlice;


    const [name, setName] = useState("Done");

    return (
        <>
            <Typography mb={3}>All {name} tasks: {done.length}</Typography>

            <ColumnLayout
                droppableId='done'
                //Изменить на возможность редоктировать название колонки
                labelText={name}
                completedHandler={completeStatus}
                removeHandler={remove}
                addHandler={add}
                selectorState={done}
                updateTextShowed={updateTextShowed}
            />
        </>
    );
}
