import Typography from '@mui/material/Typography';
import {useSelector} from 'react-redux';
import {StoreState} from '../../redux/store';
import {ColumnLayout} from "../ColumnLayout";
import {doneSlice} from "../../redux/slice/Done";


export function DoneColumn() {
    const {done} = useSelector((state: StoreState) => state);

    const {
        actions: {completeStatus, remove, add, updateTextShowed},
    } = doneSlice;

    return (
        <>
            <Typography mb={3}>All inProgress tasks: {done.length}</Typography>
            <ColumnLayout
                droppableId='Done'
                labelText="Type 'done' item"
                completedHandler={completeStatus}
                removeHandler={remove}
                addHandler={add}
                selectorState={done}
                updateTextShowed={updateTextShowed}
            />
        </>
    );
}