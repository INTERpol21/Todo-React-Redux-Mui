import Typography from '@mui/material/Typography';
import {useSelector} from 'react-redux';
import {StoreState} from '../../redux/store';
import ColumnLayout from "../ColumnLayout";
import {testingSlice} from "../../redux/slice/Testing";
import React, {useState} from "react";


export function TestingColumn() {
    const {testing} = useSelector((state: StoreState) => state);

    const {
        actions: {completeStatus, remove, add, updateTextShowed},
    } = testingSlice;

    const [name, setName] = useState("Testing");

    return (
        <>
            <Typography mb={3}>All {name} tasks: {testing.length}</Typography>

            <ColumnLayout
                droppableId='testing'
                labelText={name}
                completedHandler={completeStatus}
                removeHandler={remove}
                addHandler={add}
                selectorState={testing}
                updateTextShowed={updateTextShowed}
            />
        </>
    );
}