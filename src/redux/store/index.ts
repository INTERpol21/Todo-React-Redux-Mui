import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { doneSlice } from '../slice/Done';
import {inProgressSlice} from "../slice/InProgress";
import {testingSlice} from "../slice/Testing";
import {todoSlice} from "../slice/TODO";


export const store = configureStore({
    reducer:combineReducers({
        done:doneSlice.reducer,
        inProgress:inProgressSlice.reducer,
        testing:testingSlice.reducer,
        todo:todoSlice.reducer,


    })
})

export type StoreDispatch = typeof store.dispatch;
export type StoreState = ReturnType<typeof store.getState>;