import './register.css';
import Input from '../Input/Input';
import { useState } from 'react';
import { createUser } from '../../client';
import { successNotification } from '../../Notification';

function Register({ setDisplay }) {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        // Validar el campo según su nombre
        switch (name) {
            case 'email':
                if (!validateEmail(value)) {
                    setEmailError('Por favor introduce un correo electrónico válido');
                } else {
                    setEmailError('');
                }
                break;
            case 'password':
                if (!validatePassword(value)) {
                    setPasswordError('La contraseña debe tener al menos 4 caracteres');
                } else {
                    setPasswordError('');
                }
                break;
            default:
                break;
        }
    };

    const validateEmail = (email) => {
        // Expresión regular para validar el formato del correo electrónico
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return regex.test(email);
    };
    const validatePassword = (password) => {
        return password.length >= 4;
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        // Realizar verificaciones de los campos del formulario
        if (!formData.username || !formData.email || !formData.password) {
            alert('Por favor completa todos los campos');
            return;
        }

        // Si todas las verificaciones pasan, puedes enviar los datos del formulario al servidor o realizar otras acciones
				const user = formData;
		createUser(user)
			.then(() =>{
				console.log('Usuario creado');
				alert('Usuario creado exitosamente');
				window.location.reload();
			})
			.catch(err => {
				console.log(err.response);
			})
			
    };

    return (
        <div className='register-container'>
            <div className='title-register-container'>
                <h3>Regístrate</h3>
            </div>
            
            <form onSubmit={handleSubmit} className="register-form">
                <Input text="Nombre de usuario" type="text" name="username" onChange={handleChange} value={formData.username}/>
                <Input text="Correo" type="text" name="email" onChange={handleChange} value={formData.email}/>
                {emailError && <p className="error-message">{emailError}</p>}
                <Input text="Contraseña" type="password" name="password" onChange={handleChange} value={formData.password}/>
                {passwordError && <p className="error-message">{passwordError}</p>}
                <div className="btn-register-container">
                    <button type="submit">
                        Registrar
                        <span className='icon-arrow'></span>
                    </button>
                </div>
            </form>
            <hr />
            <div className="register-link">
                <p>¿Ya tienes cuenta?</p>
                <span className='link-form' onClick={() => setDisplay("display-login")}>Inicia Sesión</span>
            </div>
        </div>
    );
}

export default Register;
