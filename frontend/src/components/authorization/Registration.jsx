import React from "react";
import { registration } from "../../actions/user";



class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            firstName: '',
            lastName: '',
            password: '',
            password2: '',
            valid: {
                password: true
            }
        }
        this.handleChangeInput = this.handleChangeInput.bind(this);
        this.validatePassword = this.validatePassword.bind(this);
        this.handleRegistration = this.handleRegistration.bind(this);
    }

    handleChangeInput(event) {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        this.setState({
            [name]: value
        });
    }

    validatePassword() {
        this.setState({ valid: { password: true } });
        return this.state.password === this.state.password2;
    }

    handleRegistration() {
        if (this.validatePassword()) {
            registration(this.state.email, this.state.firstName, this.state.lastName, this.state.password)
        } else {
            this.setState({
                password: '',
                password2: '',
                valid: { password: false }
            })
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="body">
                    <input value={this.state.email} onChange={this.handleChangeInput} name="email" type="email" placeholder="Электронная почта" />
                    <input value={this.state.firstName} onChange={this.handleChangeInput} name="firstName" type="text" placeholder="Имя" />
                    <input value={this.state.lastName} onChange={this.handleChangeInput} name="lastName" type="text" placeholder="Фамилия" />
                    <input value={this.state.password} onChange={this.handleChangeInput} name="password" type="password" placeholder="Пароль" />
                    <input value={this.state.password2} onChange={this.handleChangeInput} name="password2" type="password" placeholder="Повторите пароль" />
                    {this.state.valid.password ? null : <span className="error">Пароли не совпадают!</span>}
                </div>
                <div className="footer">
                    <button className="main-button" onClick={this.handleRegistration}>Зарегистрироваться</button>
                </div>
            </React.Fragment>
        );
    }
}

export default Registration;