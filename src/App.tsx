import React from 'react';
import './App.css';
import {Container, Grid, Typography} from "@mui/material";

function App() {
  return (
    <Container >
      {/*Загаловок*/}
      <Typography textAlign="center" variant="h3" mt ={3} mb={5}>
        This is ToDo APP with Redux
      </Typography>

        <Grid item xs={4}>
        </Grid>

        <Grid item xs={4}>
        </Grid>

        <Grid item xs={4}>
        </Grid>

        <Grid item xs={4}>
        </Grid>
    </Container>
  );
}

export default App;
