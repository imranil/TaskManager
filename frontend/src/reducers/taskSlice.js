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
    }
})

export default taskSlice.reducer
export const { setTasks, setCurrentTask } = taskSlice.actions