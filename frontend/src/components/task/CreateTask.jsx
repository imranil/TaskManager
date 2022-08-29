import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { createTask } from "../../actions/task";
import './task.css';



const CreateTask = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
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

    return (
        <div className="container">
            <div className="row">
                <form onSubmit={(event) => submitHandler(event)} className="create-task content">
                    <div className="header">
                        Создание задачи
                    </div>
                    <div className="body">
                        <input value={name} onChange={(event) => setName(event.target.value)} name="name" type="text" placeholder="Название" />
                        <textarea value={description} onChange={(event) => setDescription(event.target.value)} name="description" placeholder="Описание" rows="5" />
                        <select value={priority} onChange={(event) => setPriority(event.target.value)} name="priority">
                            <option value="" disabled>Приоритет</option>
                            <option value="low">Низкий</option>
                            <option value="medium">Средний</option>
                            <option value="high">Высокий</option>
                        </select>
                        <select value={status} onChange={(event) => setStatus(event.target.value)} name="status">
                            <option value="" disabled>Статус</option>
                            <option value="to do">Сделать</option>
                            <option value="in progress">В процессе</option>
                            <option value="closed">Завершен</option>
                            <option value="frozen">Заморожен</option>
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


export default CreateTask;