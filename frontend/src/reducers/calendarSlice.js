import { createSlice } from "@reduxjs/toolkit"


const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        currentMonth: new Date().getMonth(),
        currentYear: new Date().getFullYear(),
        daysOfWeek: {'ПН': 'Понедельник', 'ВТ': 'Вторник', 'СР': 'Среда', 'ЧТ': 'Четверг', 'ПТ': 'Пятница', 'СБ': 'Суббота', 'ВС': 'Воскресенье'},
    },
    reducers: {
        prevMonth(state) {
            if(state.currentMonth === 0) {
                state.currentMonth = 11
                state.currentYear = state.currentYear - 1
            } else {
                state.currentMonth = state.currentMonth - 1
            }
        },
        todayMonth(state) {
            state.currentMonth = new Date().getMonth()
            state.currentYear = new Date().getFullYear()
        },
        nextMonth(state) {
            if(state.currentMonth === 11) {
                state.currentMonth = 0
                state.currentYear = state.currentYear + 1
            } else {
                state.currentMonth = state.currentMonth + 1
            }
        },
        setView(state, action) {
            state.view = action.payload
        }
    }
})

export default calendarSlice.reducer
export const { prevMonth, todayMonth, nextMonth, setView} = calendarSlice.actions