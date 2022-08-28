import axios from "axios";
import { hideLoader, showLoader } from "../reducers/appSlice";
import { setCurrentTask, deleteTask, setTasks } from "../reducers/taskSlice";
import { API_URL } from "../config";


export function getTasks(dates) {
    return async dispatch => {
        try {
            dispatch(showLoader())
            const { startDate, endDate } = dates
            const url = `${API_URL}api/tasks?startDate=${startDate}&endDate=${endDate}`
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

export function getTask(taskId) {
    return async dispatch => {
        try {
            dispatch(showLoader())
            const response = await axios.post(`${API_URL}api/tasks/${taskId}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            })
            dispatch(setCurrentTask(response.data))
            return response.data
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
            dispatch(setCurrentTask(response.data))
            return response.data
        } catch (e) {
            alert(e.response.data.message)
        } finally {
            dispatch(hideLoader())
        }
    }
}

export function removeTask(task) {
    return async dispatch => {
        try {
            dispatch(showLoader())
            axios.delete(`${API_URL}api/tasks?id=${task.id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            })
            dispatch(deleteTask(task.id))
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
            return response.data
        } catch (e) {
            alert(e.response.data.message)
        } finally {
            dispatch(hideLoader())
        }
    }
}