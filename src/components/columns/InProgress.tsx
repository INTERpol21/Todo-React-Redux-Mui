import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import { StoreState } from '../../redux/store';
import {inProgressSlice} from "../../redux/slice/InProgress";
import ColumnLayout from "../ColumnLayout";
import React, {useState} from "react";
import {Input} from "@mui/material";



export function InProgressColumn() {
    const { inProgress } = useSelector((state: StoreState) => state);

    const {
        actions: { completeStatus, remove, add, updateTextShowed },
    } = inProgressSlice;

    const [name, setName] = useState("inProgress");
    const [isDisabled, setIsDisabled] = useState(false);


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handleClick = () => {
        setIsDisabled(!isDisabled)
    };


    return (
        <>
            <Typography mb={3}>All {name} tasks: {inProgress.length}</Typography>
            <Input type="text"
                   id="inProgress"
                   value={name}
                   onChange={handleChange}
                   disabled={isDisabled}
                   onDoubleClickCapture={handleClick}/>

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