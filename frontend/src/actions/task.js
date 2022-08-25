import axios from "axios";
import { hideLoader, showLoader } from "../reducers/appSlice";
import { setTasks } from "../reducers/taskSlice";
import { API_URL } from "../config";


export function getTasks(dates) {
    return async dispatch => {
        try {
            dispatch(showLoader())
            const {startDate, endDate} = dates
            const url = `${API_URL}api/tasks?startDate=${startDate}&endDate=${endDate}`
            const response = await axios.get(url, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
            dispatch(setTasks(response.data))
        } catch(e) {
            alert(e.response.data.message)
        } finally {
            dispatch(hideLoader())
        }
    }
}