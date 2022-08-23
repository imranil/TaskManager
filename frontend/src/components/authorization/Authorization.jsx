import React, { useState } from "react";
import Login from "./Login";
import Registration from "./Registration";
import './authorization.css'


const Authorization = () => {
    const [login, setLogin] = useState(true);

    return (
        <div className="authorization">
            <div className="authorization-content">
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