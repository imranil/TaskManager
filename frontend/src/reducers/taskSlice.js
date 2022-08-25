import { createSlice } from "@reduxjs/toolkit"


const taskSlice = createSlice({
    name: 'task',
    initialState: {
        tasks: [],
    },
    reducers: {
        setTasks(state, action) {
            state.tasks = action.payload
        },
        addTask(state, action) {
            state.tasks.push(action.payload)
        }
    }
})

export default taskSlice.reducer
export const { setTasks, addTask } = taskSlice.actions