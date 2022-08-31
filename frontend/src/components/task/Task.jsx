import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeTask, updateTask } from "../../actions/task";
import "./task.css"


const Task = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const task = useSelector(state => state.tasks.currentTask)
    const priorities = useSelector(state => state.tasks.priorities)
    const statuses = useSelector(state => state.tasks.statuses)
    const [priority, setPriority] = useState('')
    const [status, setStatus] = useState('')

    function removeTaskHandler() {
        dispatch(removeTask(task))
        navigate('/calendar')
    }

    function changePriorityHandler(value) {
        setPriority(value)
        dispatch(updateTask({ ...task, priority: value }))
    }

    function changeStatusHandler(value) {
        setStatus(value)
        dispatch(updateTask({ ...task, status: value }))
    }

    return (
        <div className="container">
            <div className="task-header">
                <div className="name">{task.name}</div>
                <div className="description">{task.description}</div>
            </div>
            <div className="task-content">
                <div className="info">
                    <div className="data">
                        <div className="data-row">
                            <div className="title">Приоритет:</div>
                            <div className="value"><span className={task.priority}>{task.priority}</span></div>
                        </div>
                        <div className="data-row">
                            <div className="title">Статус:</div>
                            <div className="value">{statuses[task.status]}</div>
                        </div>
                        <div className="data-row">
                            <div className="title">Дата добавления:</div>
                            <div className="value">{new Date(task.createdAt).toLocaleDateString()}</div>
                        </div>
                        <div className="data-row">
                            <div className="title">Крайний срок:</div>
                            <div className="value">{new Date(task.deadline).toLocaleDateString()}</div>
                        </div>
                        <div className="data-row">
                            <div className="title">Участники:</div>
                            <div className="value">{task.users.map(user => user.firstName)}</div>
                        </div>
                    </div>
                    <div className="input-row">
                        <select value={priority} onChange={(event) => changePriorityHandler(event.target.value)} name="priority">
                            <option value="" disabled>Приоритет</option>
                            {Object.entries(priorities).map((priority, key) => <option key={key} value={priority[0]}>{priority[1]}</option>)}
                        </select>
                    </div>
                    <div className="input-row">
                        <select value={status} onChange={(event) => changeStatusHandler(event.target.value)} name="status">
                            <option value="" disabled>Статус</option>
                            {Object.entries(statuses).map((status, key) => <option key={key} value={status[0]}>{status[1]}</option>)}
                        </select>
                    </div>
                    <div className="input-row">
                        <button onClick={() => removeTaskHandler()} className="main-button">Удалить</button>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default Task;