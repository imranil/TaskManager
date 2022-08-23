import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { login } from "../../actions/user";


const Login = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const dispatch = useDispatch();

    return (
        <React.Fragment>
            <div className="body">
                <input value={email} onChange={(event) => setEmail(event.target.value)} name="email" type="text" placeholder="Электронная почта" />
                <input value={password} onChange={(event) => setPassword(event.target.value)} name="password" type="password" placeholder="Пароль" />
            </div>
            <div className="footer">
                <button className="main-button" onClick={() => dispatch(login(email, password))}>Войти</button>
            </div>
        </React.Fragment>
    );
}


export default Login;