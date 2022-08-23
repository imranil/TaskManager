import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userSlice from "./userSlice";
import appSlice from './appSlice';
import calendarSlice from './calendarSlice';


const rootReducer = combineReducers({
    user: userSlice,
    app: appSlice,
    calendar: calendarSlice
})

export const store = configureStore({
    reducer: rootReducer,
});