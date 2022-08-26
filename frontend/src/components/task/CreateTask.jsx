import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { createTask } from "../../actions/task";
import './task.css';


class CreateTask extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            priority: '',
            status: '',
            deadline: ''
        }
        this.handleChangeInput = this.handleChangeInput.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }

    handleChangeInput(event) {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        this.setState({
            [name]: value
        });
    }

    submitHandler(event) {
        const { name, description, priority, status, deadline } = this.state
        createTask(name, description, priority, status, deadline)
        return (
            <Navigate to="/calendar" />
        );
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <form onSubmit={this.submitHandler} className="create-task content">
                        <div className="header">
                            Создание задачи
                        </div>
                        <div className="body">
                            <input value={this.state.name} onChange={this.handleChangeInput} name="name" type="text" placeholder="Название" />
                            <textarea value={this.state.description} onChange={this.handleChangeInput} name="description" placeholder="Описание" rows="5" />
                            <select value={this.state.priority} defaultValue='low' onChange={this.handleChangeInput} name="priority">
                                <option value="" disabled>Приоритет</option>
                                <option value="low">Низкий</option>
                                <option value="medium">Средний</option>
                                <option value="high">Высокий</option>
                            </select>
                            <select value={this.state.status} defaultValue='to do' onChange={this.handleChangeInput} name="status">
                                <option value="" disabled selected>Статус</option>
                                <option value="to do">Сделать</option>
                                <option value="in progress">В процессе</option>
                                <option value="closed">Завершен</option>
                                <option value="frozen">Заморожен</option>
                            </select>
                            <input value={this.state.deadline} onChange={this.handleChangeInput} name="deadline" type="date" />
                        </div>
                        <div className="footer">
                            <button type="submit" className="main-button">Создать</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}


export default CreateTask;