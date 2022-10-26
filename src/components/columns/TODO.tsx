import Typography from '@mui/material/Typography';
import {useSelector} from 'react-redux';
import {StoreState} from '../../redux/store';
import {ColumnLayout} from "../ColumnLayout";
import {todoSlice} from "../../redux/slice/TODO";


export function ToDoColumn() {
    const {todo} = useSelector((state: StoreState) => state);

    const {
        actions: {completeStatus, remove, add, updateTextShowed},
    } = todoSlice;

    return (
        <>
            <Typography mb={3}>All inProgress tasks: {todo.length}</Typography>
            <ColumnLayout
                droppableId='Todo'
                labelText="Type 'todo' item"
                completedHandler={completeStatus}
                removeHandler={remove}
                addHandler={add}
                selectorState={todo}
                updateTextShowed={updateTextShowed}
            />
        </>
    );
}