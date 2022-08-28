import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeTask, updateTask } from "../../actions/task";
import "./task.css"


const Task = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const task = useSelector(state => state.tasks.currentTask)
    const [priority, setPriority] = useState('')
    const [status, setStatus] = useState('')

    function removeTaskHandler() {
        dispatch(removeTask(task))
        navigate('/calendar')
    }

    function changePriorityHandler(event) {
        setPriority(event.target.value)
        dispatch(updateTask({...task, priority: event.target.value}))
    }

    function changeStatusHandler(event) {
        setStatus(event.target.value)
        dispatch(updateTask({...task, status: event.target.value}))
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
                            <div className="value">{task.status}</div>
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
                            <div className="value"></div>
                        </div>
                    </div>
                    <div className="input-row">
                        <select value={priority} onChange={(event) => changePriorityHandler(event)} name="priority">
                            <option value="" disabled>Приоритет</option>
                            <option value="low">Низкий</option>
                            <option value="medium">Средний</option>
                            <option value="high">Высокий</option>
                        </select>
                    </div>
                    <div className="input-row">
                        <select value={status} onChange={(event) => changeStatusHandler(event)} name="status">
                            <option value="" disabled>Статус</option>
                            <option value="to do">Сделать</option>
                            <option value="in progress">В процессе</option>
                            <option value="closed">Завершен</option>
                            <option value="frozen">Заморожен</option>
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