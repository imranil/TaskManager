import React from "react";
import { registration } from "../../actions/user";
import useInput from "../../utils/useInput";



const Registration = () => {
    const email = useInput('', {isEmpty: true, isEmail: true})
    const firstName = useInput('', {isEmpty: true})
    const lastName =  useInput('', {isEmpty: true})
    const password = useInput('', {minLength: 4})
    const password2 = useInput('', {minLength: 4})

    function registrationHandler() {
        if (password.value === password2.value) {
            registration(email.value, firstName.value, lastName.value, password.value)
        } else {
            password = '',
            password2 = ''
        }
    }

    return (
        <React.Fragment>
            <div className="body">
                <input value={email.value} onChange={e => email.onChange(e)} onBlur={e => email.onBlur(e)} name="email" type="email" placeholder="Электронная почта" />
                {(email.isDirty && email.isEmpty) && <div className="has-error">Поле не может быть пустым</div>}
                {(email.isDirty && email.emailError) && <div className="has-error">Поле должно содержать адрес электронной почты</div>}
                <input value={firstName.value} onChange={e => firstName.onChange(e)} onBlur={e => firstName.onBlur(e)} name="firstName" type="text" placeholder="Имя" />
                {(firstName.isDirty && firstName.isEmpty) && <div className="has-error">Поле не может быть пустым</div>}
                <input value={lastName.value} onChange={e => lastName.onChange(e)} onBlur={e => lastName.onBlur(e)} name="lastName" type="text" placeholder="Фамилия" />
                {(lastName.isDirty && lastName.isEmpty) && <div className="has-error">Поле не может быть пустым</div>}
                <input value={password.value} onChange={e => password.onChange(e)} onBlur={e => password.onBlur(e)} name="password" type="password" placeholder="Пароль" />
                {(password.isDirty && password.minLengthError) && <div className="has-error">Поле не может иметь меньше 4 символов</div>}
                <input value={password2.value} onChange={e => password2.onChange(e)} onBlur={e => password2.onBlur(e)} name="password2" type="password" placeholder="Повторите пароль" />
                {(password2.isDirty && password2.minLengthError) && <div className="has-error">Поле не может иметь меньше 4 символов</div>}
                {((password.isDirty && password2.isDirty) && password.value != password2.value) && <div className="has-error">Пароли не совпадают!</div>}
            </div>
            <div className="footer">
                <button disabled={
                    !email.value || 
                    !firstName.value || 
                    !lastName.value || 
                    !password.value || 
                    !password2.value || 
                    password.value != password2.value} className="main-button" onClick={registrationHandler}>Зарегистрироваться</button>
            </div>
        </React.Fragment>
    );
}

export default Registration;