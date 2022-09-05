import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userSlice from "./userSlice";
import appSlice from './appSlice';
import calendarSlice from './calendarSlice';
import taskSlice from './taskSlice';
import invitationSlice from './invitationSlice';


const rootReducer = combineReducers({
    user: userSlice,
    calendar: calendarSlice,
    tasks: taskSlice,
    invitations: invitationSlice,
    app: appSlice,
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});