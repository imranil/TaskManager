import { createSlice } from "@reduxjs/toolkit"


const taskSlice = createSlice({
    name: 'task',
    initialState: {
        tasks: [],
        foundTasks: [],
        tasksCounts: [],
        currentTask: null,
        priorities: { 'low': 'Низкий', 'medium': 'Средний', 'high': 'Высокий' },
        statuses: { 'to do': 'Сделать', 'in progress': 'В процессе', 'closed': 'Завершён', 'frozen': 'Заморожен' }
    },
    reducers: {
        setTasks(state, action) {
            state.tasks = action.payload
        },
        setFoundTasks(state, action) {
            state.foundTasks = action.payload
        },
        setTasksCounts(state, action) {
            state.tasksCounts = action.payload
        },
        setCurrentTask(state, action) {
            state.currentTask = action.payload
        },
        deleteTask(state, action) {
            state.currentTask = null
            state.tasks = state.tasks.filter(task => task.id != action.payload)
        },
    }
})

export default taskSlice.reducer
export const { setTasks, setCurrentTask, setFoundTasks, deleteTask, setTasksCounts } = taskSlice.actions