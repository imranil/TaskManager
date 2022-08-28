import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./task.css"


const Task = () => {
    const dispatch = useDispatch()
    const task = useSelector(state => state.tasks.currentTask)

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
                        <select name="priority">
                            <option value="low">Низкий</option>
                            <option value="medium">Средний</option>
                            <option value="high">Высокий</option>
                        </select>
                    </div>
                    <div className="input-row">
                        <select name="status">
                            <option value="to do">Сделать</option>
                            <option value="in progress">В процессе</option>
                            <option value="closed">Завершен</option>
                            <option value="frozen">Заморожен</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default Task;