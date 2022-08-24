import { createSlice } from "@reduxjs/toolkit"


const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        currentDate: new Date(),
        view: 'grid'
    },
    reducers: {
        prevMonth(state) {
            const currentMonth = state.currentDate.getMonth()
            const currentYear = state.currentDate.getFullYear()
            if(currentMonth === 0) {
                state.currentDate = new Date(currentYear - 1, 11, 1)
            } else {
                state.currentDate = new Date(currentYear, currentMonth - 1, 1)
            }
        },
        todayMonth(state) {
            state.currentDate = new Date()
        },
        nextMonth(state) {
            const currentMonth = state.currentDate.getMonth()
            const currentYear = state.currentDate.getFullYear()
            if(currentMonth === 11) {
                state.currentDate = new Date(currentYear + 1, 0, 1)
            } else {
                state.currentDate = new Date(currentYear, currentMonth + 1, 1)
            }
        },
        setView(state, action) {
            state.view = action.payload
        }
    }
})

export default calendarSlice.reducer
export const { prevMonth, todayMonth, nextMonth, setView} = calendarSlice.actions