import axios from "axios";
import { API_URL } from "../config";
import { setInvitations, removeInvitations } from "../reducers/invitationSlice";
import { setCurrentTask } from "../reducers/taskSlice";


export async function createInvitation(receiverEmail, taskId) {
    try {
        const response = await axios.post(`${API_URL}api/invites/create`, {
            receiverEmail: receiverEmail,
            taskId: taskId
        }, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        alert(response.data.message)
    } catch (e) {
        alert(e.response.data.message)
    }
}

export function getInvitations() {
    return async dispatch => {
        try {
            const response = await axios.get(`${API_URL}api/invites`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            })
            dispatch(setInvitations(response.data))
        } catch (e) {
            alert(e.response.data.message)
        }
    }
}

export function acceptInvitation(invitationId, taskId) {
    return async dispatch => {
        try {
            const response = await axios.post(`${API_URL}api/invites/accept`, {
                invitationId: invitationId,
                taskId: taskId
            }, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            })
            dispatch(setCurrentTask(response.data))
            dispatch(removeInvitations(invitationId))
        } catch(e) {
            alert(e.response.data.message)
        }
    }
}

export function declineInvitation(invitationId) {
    return async dispatch => {
        try {
            axios.delete(`${API_URL}api/invites?id=${invitationId}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            })
            dispatch(removeInvitations(invitationId))
        } catch(e) {
            alert(e.response.data.message)
        }
    }
}