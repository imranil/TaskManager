import { createSlice } from "@reduxjs/toolkit"


const taskSlice = createSlice({
    name: 'task',
    initialState: {
        tasks: [],
        currentTask: null,
    },
    reducers: {
        setTasks(state, action) {
            state.tasks = action.payload
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
export const { setTasks, setCurrentTask, deleteTask } = taskSlice.actions