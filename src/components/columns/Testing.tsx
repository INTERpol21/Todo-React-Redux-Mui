import Typography from '@mui/material/Typography';
import {useSelector} from 'react-redux';
import {StoreState} from '../../redux/store';
import ColumnLayout from "../ColumnLayout";
import {testingSlice} from "../../redux/slice/Testing";


export function TestingColumn() {
    const {testing} = useSelector((state: StoreState) => state);

    const {
        actions: {completeStatus, remove, add, updateTextShowed},
    } = testingSlice;

    return (
        <>
            <Typography mb={3}>All inProgress tasks: {testing.length}</Typography>
            <ColumnLayout
                droppableId='Testing'
                labelText="Type 'testing' item"
                completedHandler={completeStatus}
                removeHandler={remove}
                addHandler={add}
                selectorState={testing}
                updateTextShowed={updateTextShowed}
            />
        </>
    );
}