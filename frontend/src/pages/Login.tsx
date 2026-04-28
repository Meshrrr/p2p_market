import '../scss/Login.scss'
import { useState } from 'react'
import { ButtonComponent } from "../components/ButtonComponent/ButtonComponent"
import { Link } from 'react-router'

export const Login = () => {
    const [loginErrorMsg, setLoginErrorMsg] = useState('')
    const [passwordErrorMsg, setPasswordErrorMsg] = useState('')

    return (
        <div className="login-block">
            <h1>Вход в профиль</h1>
            <form className="login-form">
                <div className="login-form__block-content">
                    <label htmlFor="mail">Почта:</label>
                    <input type="text" required/>
                </div>
                <div className="login-form__block-content">
                    <label htmlFor="password">Пароль:</label>
                    <input type="text" required/>
                    <a>Забыли пароль?</a>
                </div>
                <ButtonComponent><Link to='/catalog'>Войти</Link></ButtonComponent>
                <ButtonComponent><Link to='/'>Регистрация</Link></ButtonComponent>
            </form>
        </div>
    )
}