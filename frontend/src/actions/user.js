import axios from 'axios';
import { setUser } from '../reducers/userSlice';
import { API_URL } from '../config';

export const registration = async (email, firstName, lastName, password) => {
    try {
        const response = await axios.post(`${API_URL}api/auth/registration`, {
            email,
            firstName,
            lastName,
            password
        });
        alert(response.data.message);
    } catch(e) {
        alert(e.response.data.message);
    }
};


export const login = (email, password) => {
    return async dispatch => {
        try {
            const response = await axios.post(`${API_URL}api/auth/login`, {
                email,
                password
            })
            dispatch(setUser(response.data.user))
            localStorage.setItem('token', response.data.token)
        } catch(e) {
            alert(e.response.data.message)
        }
    };
};


export const auth = () => {
    return async dispatch => {
        try {
            const response = await axios.get(`${API_URL}api/auth/auth`, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
            dispatch(setUser(response.data.user))
            localStorage.setItem('token', response.data.token)
        } catch(e) {
            alert(e.response.data.message)
            localStorage.removeItem('token')
        }
    };
};

export const uploadAvatar = (file) => {
    return async dispatch => {
        try {
            const formData = new FormData()
            formData.append('file', file)
            const response = await axios.post(`${API_URL}api/auth/avatar`, formData, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
            dispatch(setUser(response.data))
        } catch(e) {
            alert(e)
        }
    };
};

export const deleteAvatar = () => {
    return async dispatch => {
        try {
            const response = await axios.delete(`${API_URL}api/auth/avatar`, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
            dispatch(setUser(response.data))
        } catch(e) {
            alert(e)
        }
    };
};