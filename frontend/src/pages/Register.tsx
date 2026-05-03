import { ButtonComponent } from "../components/ButtonComponent/ButtonComponent"
import { Link } from 'react-router'
import '../scss/Login.scss'
import '../scss/Register.scss'

export const Register = () => {
    return (
        <div className="login-block">
            <h1>Регистрация</h1>
            <form className="login-form">
                <div className="login-form__block-content">
                    <label htmlFor="username">Имя пользователя:</label>
                    <input type="text" required placeholder="user"/>
                </div>
                <div className="login-form__block-content">
                    <label htmlFor="mail">Почта:</label>
                    <input type="email" required placeholder="test@mail.ru"/>
                </div>
                <div className="login-form__block-content">
                    <label htmlFor="tel">Телефон:</label>
                    <input type="tel" required placeholder="+7(900)00-00-000"/>
                </div>
                <div className="login-form__block-content">
                    <label htmlFor="password">Пароль:</label>
                    <input type="text" required />
                </div>
                <div className="login-form__block-content">
                    <label htmlFor="password">Пароль еще раз:</label>
                    <input type="text" required />
                </div>
                <ButtonComponent><Link to='/'>Регистрация</Link></ButtonComponent>
            </form>
        </div>
    )
}