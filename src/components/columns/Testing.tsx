import Typography from '@mui/material/Typography';
import {useSelector} from 'react-redux';
import {StoreState} from '../../redux/store';
import ColumnLayout from "../ColumnLayout";
import {testingSlice} from "../../redux/slice/Testing";
import React, {useState} from "react";
import {Input} from "@mui/material";


export function TestingColumn() {
    const {testing} = useSelector((state: StoreState) => state);

    const {
        actions: {completeStatus, remove, add, updateTextShowed},
    } = testingSlice;

    const [name, setName] = useState("Testing");
    const [isDisabled, setIsDisabled] = useState(false);


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handleClick = () => {
        setIsDisabled(!isDisabled)
    };

    return (
        <>
            <Typography mb={3}>All {name} tasks: {testing.length}</Typography>
            <Input type="text"
                   id="testing"
                   value={name}
                   onChange={handleChange}
                   disabled={isDisabled}
                   onDoubleClickCapture={handleClick}/>
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