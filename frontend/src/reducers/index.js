import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userSlice from "./userSlice";
import appSlice from './appSlice'


const rootReducer = combineReducers({
    user: userSlice,
    app: appSlice
})

export const store = configureStore({
    reducer: rootReducer,
});