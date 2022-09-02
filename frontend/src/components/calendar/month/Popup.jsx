import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { createTask } from "../../../actions/task";
import '../calendar.css';



const CreateTaskPopup = ({ displayPopup, setDisplayPopup }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const priorities = useSelector(state => state.tasks.priorities)
    const statuses = useSelector(state => state.tasks.statuses)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [priority, setPriority] = useState('')
    const [status, setStatus] = useState('')
    const [deadline, setDeadline] = useState('')


    function submitHandler(event) {
        event.preventDefault()
        event.stopPropagation()
        dispatch(createTask(name, description, priority, status, deadline))
        navigate(`/calendar`)
    }

    function closeClickHandler(event) {
        event.preventDefault()
        event.stopPropagation()
        setDisplayPopup('none')
    }

    return (
        <div className="create-popup" style={{ display: displayPopup }}>
            <div className="popup-content">
                <form onSubmit={(event) => submitHandler(event)} className="content">
                    <div className="header">
                        <div className="title">Созадние задачи</div>
                        <button onClick={(event) => closeClickHandler(event)} className="button-icon close-button">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 101 101">
                                <path d="M83.9 17.1c-.9-.9-2.5-.9-3.4 0l-30 30-30-30c-.9-.9-2.5-.9-3.4 0s-.9 2.5 0 3.4l30 30-30 30c-.9.9-.9 2.5 0 3.4.5.5 1.1.7 1.7.7.6 0 1.2-.2 1.7-.7l30-30 30 30c.5.5 1.1.7 1.7.7.6 0 1.2-.2 1.7-.7.9-.9.9-2.5 0-3.4l-30-30 30-30c.9-.9.9-2.4 0-3.4z" />
                            </svg>
                        </button>
                    </div>
                    <div className="body">
                        <input value={name} onChange={(event) => setName(event.target.value)} name="name" type="text" placeholder="Название" />
                        <textarea value={description} onChange={(event) => setDescription(event.target.value)} name="description" placeholder="Описание" rows="5" />
                        <select value={priority} onChange={(event) => setPriority(event.target.value)} name="priority">
                            <option value="" disabled>Приоритет</option>
                            {Object.entries(priorities).map((priority, key) => <option key={key} value={priority[0]}>{priority[1]}</option>)}
                        </select>
                        <select value={status} onChange={(event) => setStatus(event.target.value)} name="status">
                            <option value="" disabled>Статус</option>
                            {Object.entries(statuses).map((status, key) => <option key={key} value={status[0]}>{status[1]}</option>)}
                        </select>
                        <input value={deadline} onChange={(event) => setDeadline(event.target.value)} name="deadline" type="date" />
                    </div>
                    <div className="footer">
                        <button type="submit" className="main-button">Создать</button>
                    </div>
                </form>
            </div>
        </div>
    );
}


export default CreateTaskPopup;