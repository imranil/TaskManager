import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCounts } from "../../actions/task";
import { uploadAvatar, deleteAvatar } from "../../actions/user";
import { API_URL } from "../../config";
import './profile.css'

const Profile = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user.currentUser)
    const counts = useSelector(state => state.tasks.tasksStatusCounts)

    useEffect(() => {
        dispatch(getCounts())
    }, [])

    function inputChangeHanfler(event) {
        const file = event.target.files[0]
        dispatch(uploadAvatar(file))
    }

    return (
        <div className="container">
            <div className="profile-header">
                {user.firstName + ' ' + user.lastName}
            </div>
            <div className="profile-content">
                <div className="info">
                    <div className="avatar-content">
                        <div className="avatar">
                            <img src={user.avatar ? `${API_URL + user.avatar}` : null} alt="" />
                        </div>
                        {user.avatar
                            ? <button onClick={() => dispatch(deleteAvatar())} className="main-button">Удалить аватарку</button>
                            : <React.Fragment>
                                <input onChange={event => inputChangeHanfler(event)} accept="image/*" type="file" id="input-file" placeholder="Выберите файл" />
                                <label className="main-button" htmlFor="input-file"></label>
                            </React.Fragment>
                        }
                    </div>
                    <div className="contacts">
                        <div className="data-row">
                            <span className="title">Электронная почта: </span>
                            <span className="value">{user.email}</span>
                        </div>
                    </div>
                    <div className="numbers">
                        <div className="data-row">
                            <div className="title">Число выполняющихся задач:</div>
                            <div className="value">{counts[0].inProgressCounts}</div>
                        </div>
                        <div className="data-row">
                            <div className="title">Число завершенных задач:</div>
                            <div className="value">{counts[0].closedCounts}</div>
                        </div>
                        <div className="data-row">
                            <div className="title">Число замороженных задач:</div>
                            <div className="value">{counts[0].frozenCounts}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="profile-statistics">

            </div>
        </div>
    );
};

export default Profile;