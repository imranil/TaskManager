import { createSlice } from "@reduxjs/toolkit"


const taskSlice = createSlice({
    name: 'task',
    initialState: {
        tasks: [],
        foundTasks: [],
        tasksCounts: [],
        currentTask: null,
        priorities: [ { value:'low', label:'Низкий' }, { value:'medium', label:'Средний' }, { value:'high', label:'Высокий' } ],
        statuses: [ { value:'in progress', label:'В процессе' }, { value:'closed', label:'Завершён' }, { value:'frozen', label:'Заморожен' } ]
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
        addTask(state, action) {
            state.tasks = [...state.tasks, action.payload]
        },
        removeTask(state, action) {
            state.tasks = state.tasks.filter(task => task.id !== action.payload)
        },
    }
})

export default taskSlice.reducer
export const { setTasks, setCurrentTask, setFoundTasks, addTask, removeTask, setTasksCounts } = taskSlice.actions