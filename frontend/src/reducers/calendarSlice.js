import { createSlice } from "@reduxjs/toolkit"


const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        currentMonth: new Date().getMonth(),
        currentYear: new Date().getFullYear(),
        daysOfWeek: {'ПН': 'Понедельник', 'ВТ': 'Вторник', 'СР': 'Среда', 'ЧТ': 'Четверг', 'ПТ': 'Пятница', 'СБ': 'Суббота', 'ВС': 'Воскресенье'},
    },
    reducers: {
        setCurrentMonth(state, action) {
            state.currentMonth = action.payload
        },
        setCurrentYear(state, action) {
            state.currentYear = action.payload
        },
    }
})

export default calendarSlice.reducer
export const { setCurrentMonth, setCurrentYear } = calendarSlice.actions