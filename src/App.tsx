import React from 'react';
import {Container, Grid, Typography} from "@mui/material";
import {InProgressColumn} from "./components/columns/InProgress";
import {TestingColumn} from "./components/columns/Testing";
import {DoneColumn} from "./components/columns/Done";
import {ToDoColumn} from './components/columns/TODO';

import {todoSlice as todo} from './redux/slice/TODO';
import {inProgressSlice as inProgress} from './redux/slice/InProgress';
import {doneSlice as done} from './redux/slice/Done';
import {testingSlice as testing} from "./redux/slice/Testing"

import {DragDropContext, DropResult} from "react-beautiful-dnd";
import {StoreState} from "./redux/store";
import {IModel} from "./types";
import {useDispatch, useSelector} from "react-redux";

type TypeSlices = 'todo' | 'inProgress' | 'testing' | 'done';

function App() {
    const dispatch = useDispatch();
    const appState = useSelector((state: StoreState) => state);

    const onDragEnd = (result: DropResult) => {
        if (!result.destination) {
            return;
        }

        const {destination, source, draggableId} = result;
        const allSlices = {todo, inProgress, testing, done};

        if (destination.droppableId === source.droppableId) {
            dispatch(
                allSlices[destination.droppableId as TypeSlices].actions.reorder(result)
            );
        } else {
            const [filterState] = (
                (appState as any)[source.droppableId] as IModel[]
            ).filter(({id}) => id === draggableId);

            dispatch(
                allSlices[source.droppableId as TypeSlices].actions.remove(draggableId)
            );
            dispatch(
                allSlices[destination.droppableId as TypeSlices].actions.update({
                    ...result,
                    filterState,
                })
            );
        }
    };
    return (
        <Container>
            {/*Загаловок*/}
            <Typography textAlign="center" variant="h3" mt={3} mb={5}>
                This is ToDo APP with Redux
            </Typography>
            <Grid container spacing={2} justifyContent='center'>
                <DragDropContext onDragEnd={(res) => onDragEnd(res)}>
                    <Grid item xs={3}>
                        <ToDoColumn/>
                    </Grid>

                    <Grid item xs={3}>
                        <InProgressColumn/>
                    </Grid>

                    <Grid item xs={3}>
                        <TestingColumn/>
                    </Grid>

                    <Grid item xs={3}>
                        <DoneColumn/>
                    </Grid>
                </DragDropContext>
            </Grid>
        </Container>
    );
}

export default App;
