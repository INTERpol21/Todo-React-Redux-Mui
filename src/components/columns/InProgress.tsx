import Typography from '@mui/material/Typography';
import {useSelector} from 'react-redux';
import {StoreState} from '../../redux/store';
import {inProgressSlice} from "../../redux/slice/InProgress";
import ColumnLayout from "../ColumnLayout";
import React, {useState} from "react";



export function InProgressColumn() {
    const {inProgress} = useSelector((state: StoreState) => state);

    const {
        actions: {completeStatus, remove, add, updateTextShowed},
    } = inProgressSlice;

    const [name, setName] = useState("inProgress");

    return (
        <>
            <Typography mb={3}>All {name} tasks: {inProgress.length}</Typography>


            <ColumnLayout
                droppableId='inProgress'
                labelText={name}
                completedHandler={completeStatus}
                removeHandler={remove}
                addHandler={add}
                selectorState={inProgress}
                updateTextShowed={updateTextShowed}
            />
        </>
    );
}