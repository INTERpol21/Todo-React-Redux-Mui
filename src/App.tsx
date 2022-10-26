import React from 'react';

import {Container, Grid, Typography} from "@mui/material";
import {InProgressColumn} from "./components/columns/InProgress";
import {TestingColumn} from "./components/columns/Testing";
import {DoneColumn} from "./components/columns/Done";
import { ToDoColumn } from './components/columns/TODO';

function App() {
  return (
    <Container >
      {/*Загаловок*/}
      <Typography textAlign="center" variant="h3" mt ={3} mb={5}>
        This is ToDo APP with Redux
      </Typography>
      <Grid container spacing={2} justifyContent='center'>
        <Grid item xs={3}>
          <ToDoColumn />
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
      </Grid>
    </Container>
  );
}

export default App;
