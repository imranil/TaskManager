import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userSlice from "./userSlice";
import appSlice from './appSlice';
import calendarSlice from './calendarSlice';
import taskSlice from './taskSlice';
import invitationSlice from './invitationSlice';
import themeSlice from './themeSlice';
import tagSlice from './tagSlice';


const rootReducer = combineReducers({
    user: userSlice,
    calendar: calendarSlice,
    tasks: taskSlice,
    invitations: invitationSlice,
    theme: themeSlice,
    tags: tagSlice,
    app: appSlice,
})

export const store = configureStore({
    reducer: rootReducer,
});