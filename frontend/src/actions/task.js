import axios from "axios";
import { hideLoader, showLoader } from "../reducers/appSlice";
import { setCurrentTask, removeTask, setTasks, setFoundTasks, setTasksCounts, addTask } from "../reducers/taskSlice";
import { arrayIsEmpty } from "../utils/isEmpty";
import { API_URL } from "../config";


export function getTasks(params) {
    return async dispatch => {
        try {
            dispatch(showLoader())
            const { startDate, endDate, priorities, statuses } = params
            let url = `${API_URL}api/tasks?startDate=${startDate}&endDate=${endDate}`
            console.log(statuses)
            if(!arrayIsEmpty(priorities)) {
                url = `${API_URL}api/tasks?startDate=${startDate}&endDate=${endDate}&priorities=${JSON.stringify(priorities)}`
            }
            if(!arrayIsEmpty(statuses)) {
                url = `${API_URL}api/tasks?startDate=${startDate}&endDate=${endDate}&statuses=${JSON.stringify(statuses)}`
            }
            if(!arrayIsEmpty(priorities) && !arrayIsEmpty(statuses)) {
                url = `${API_URL}api/tasks?startDate=${startDate}&endDate=${endDate}&priorities=${JSON.stringify(priorities)}&statuses=${JSON.stringify(statuses)}`
            }

            const response = await axios.get(url, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            })
            dispatch(setTasks(response.data))
        } catch (e) {
            alert(e.response.data.message)
        } finally {
            dispatch(hideLoader())
        }
    }
}

export function createTask(name, description, priority, status, deadline) {
    return async dispatch => {
        try {
            dispatch(showLoader())
            const response = await axios.post(`${API_URL}api/tasks/create`, {
                name: name,
                description: description,
                priority: priority,
                status: status,
                deadline: deadline
            }, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            })
            dispatch(addTask(response.data))
        } catch (e) {
            alert(e.response.data.message)
        } finally {
            dispatch(hideLoader())
        }
    }
}

export function deleteTask(taskId) {
    return async dispatch => {
        try {
            dispatch(showLoader())
            axios.delete(`${API_URL}api/tasks?id=${taskId}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            })
            dispatch(removeTask(taskId))
        } catch (e) {
            alert(e.response.data.message)
        } finally {
            dispatch(hideLoader())
        }
    }
}

export function updateTask(task) {
    return async dispatch => {
        try {
            dispatch(showLoader())
            const response = await axios.put(`${API_URL}api/tasks/update`, {
                id: task.id,
                priority: task.priority,
                status: task.status,
            }, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            })
            dispatch(setCurrentTask(response.data))
        } catch (e) {
            alert(e.response.data.message)
        } finally {
            dispatch(hideLoader())
        }
    }
}

export function searchTasks(search) {
    return async dispatch => {
        try {
            const response = await axios.get(`${API_URL}api/tasks/search?search=${search}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            dispatch(setFoundTasks(response.data))
        } catch (e) {
            alert(e.response.data.message)
        }
    }
}

export function getCounts() {
    return async dispatch => {
        try {
            const response = await axios.get(`${API_URL}api/tasks/counts`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            dispatch(setTasksCounts(response.data))
        } catch (e) {
            alert(e.response.data.message)
        }
    }
}
