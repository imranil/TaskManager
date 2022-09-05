import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { login } from "../../actions/user";
import useInput from "../../utils/useInput";


const Login = () => {
    const email = useInput('', {isEmpty: true, isEmail: true})
    const password = useInput('', {isEmpty: true, minLength: 4})
    const dispatch = useDispatch();

    return (
        <React.Fragment>
            <div className="body">
                <input value={email.value} onChange={e => email.onChange(e)} onBlur={e => email.onBlur(e)} name="email" type="text" placeholder="Электронная почта" />
                {(email.isDirty && email.emailError) && <div className="has-error">Поле должно содержать адрес электронной почты</div>}
                <input value={password.value} onChange={e => password.onChange(e)} onBlur={e => password.onBlur(e)} name="password" type="password" placeholder="Пароль" />
                {(password.isDirty && password.minLengthError) && <div className="has-error">Поле не может иметь меньше 4 символов</div>}
            </div>
            <div className="footer">
                <button disabled={!email.inputValid || !password.inputValid} className="main-button" onClick={() => dispatch(login(email.value, password.value))}>Войти</button>
            </div>
        </React.Fragment>
    );
}


export default Login;