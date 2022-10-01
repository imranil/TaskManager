import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_URL } from "../../config";
import avatarLogo from "../../assets/img/avatar.svg";
import Tag from "../tag/Tag";
import SendInvitation from "../invitation/send/SendInvitation";
import DeleteTask from "./operations/DeleteTask";
import { UpdateState } from "./operations/UpdateTask";
import "./task.css";


const Task = () => {
    const dispatch = useDispatch()
    const task = useSelector(state => state.tasks.currentTask)
    const priorities = useSelector(state => state.tasks.priorities)
    const statuses = useSelector(state => state.tasks.statuses)

    if(!task) {
        return (<div>Жди</div>);
    }

    return (
        <div className="container">
            <div className="task-header">
                <div className="name">
                    {task.name}
                </div>
                <div className="description">
                    {task.description}
                </div>
            </div>
            <div className="task-content">
                <div className="info">
                    <div className="data">
                        <div className="data-row">
                            <div className="title">Приоритет:</div>
                            <div className="value"><span className={task.priority}>{priorities.find(priority => priority.value === task.priority).label}</span></div>
                        </div>
                        <div className="data-row">
                            <div className="title">Статус:</div>
                            <div className="value">{statuses.find(status => status.value === task.status).label}</div>
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
                        <div className="data-row">
                            <div className="title">Тэги:</div>
                            <div className="value">
                                {task.tags.map(tag =>
                                    <Tag key={tag.id} name={tag.name} />
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="interaction-row">
                        <UpdateState name="priority" placeholder="Приоритет" options={priorities} />
                    </div>
                    <div className="interaction-row">
                        <UpdateState name="status" placeholder="Статус" options={statuses} />
                    </div>
                    <div className="interaction-row">
                        <SendInvitation taskId={task.id} />
                    </div>
                    <div className="interaction-row">
                        <DeleteTask />
                    </div>
                </div>
            </div>
        </div>
    );
};


export default Task;