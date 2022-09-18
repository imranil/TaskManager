import axios from "axios";
import { setTags } from "../reducers/tagSlice";
import { API_URL } from "../config";


export function getTags() {
    return async dispatch => {
        try {
            const response = await axios.get(`${API_URL}api/tags/`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            })
            dispatch(setTags(response.data))
        } catch (e) {
            alert(e.response.data.message)
        }
    }
}