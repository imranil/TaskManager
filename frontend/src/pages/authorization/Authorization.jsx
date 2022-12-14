import React, { useState } from "react";
import Login from "../../components/login/Login";
import Registration from "../../components/registration/Registration";
import './authorization.css';


const Authorization = () => {
    const [login, setLogin] = useState(true);

    return (
        <div className="row">
            <div className="authorization content">
                <div className="header">
                    <button className={login ? 'tab-button active' : 'tab-button'} onClick={() => setLogin(true)}>Авторизация</button>
                    <button className={login ? 'tab-button' : 'tab-button active'} onClick={() => setLogin(false)}>Регистрация</button>
                </div>
                {login
                    ? <Login />
                    : <Registration />
                }
            </div>
        </div>
    );
}


export default Authorization;