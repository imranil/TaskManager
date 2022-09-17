import React, { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeTask, updateTask } from "../../actions/task";
import SendInvitation from "../invitation/SendInvitation";
import { API_URL } from "../../config";
import avatarLogo from "../../assets/img/avatar.svg";
import "./task.css";
import Select from "../common/select/Select";


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
                            <div className="value"><span className={task.priority}>{priorities[task.priority]}</span></div>
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
                            <div className="value">
                                {task.users.map(user =>
                                    <img src={user.avatar ? API_URL + user.avatar : avatarLogo} alt={user.fullName} />
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="interaction-row">
                        <Select value={priority} onChange={(event) => changePriorityHandler(event.target.value)} name="priority" placeholder="Приоритет" objects={priorities} />
                    </div>
                    <div className="interaction-row">
                        <Select value={status} onChange={(event) => changeStatusHandler(event.target.value)} name="status" placeholder="Статус" objects={statuses} />
                    </div>
                    <div className="interaction-row">
                        <SendInvitation taskId={task.id} />
                    </div>
                    <div className="interaction-row">
                        <button onClick={() => removeTaskHandler()} className="main-button close-button">
                            Удалить
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default Task;