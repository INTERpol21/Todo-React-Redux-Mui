import React, {useState} from "react";
import {Input} from "@mui/material";


export function Inputs() {


    const [name, setName] = useState("ToDo");
    const [isDisabled, setIsDisabled] = useState(false);


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handleClick = () => {
        setIsDisabled(!isDisabled)
    };


    return (
        <Input type="text"
               id="todo"
               value={name}
               onChange={handleChange}
               disabled={isDisabled}
               onDoubleClickCapture={handleClick}/>
    )

}