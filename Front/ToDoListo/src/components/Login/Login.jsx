import './login.css'
import Input from '../Input/Input'
import { useState } from 'react';
import { fetchUserEmail, loginUser } from '../../client';
import { useNavigate } from 'react-router-dom';

function Login( { setDisplay } ) {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

	const handleSubmit = (e) => {
		e.preventDefault();
		const user = formData;
		loginUser(user)
        .then(userId => {
            console.log('Inicio de sesión exitoso. ID del usuario:', userId);
            // Obtener el correo electrónico del usuario después de iniciar sesión
            localStorage.setItem('userId', userId);
						return fetchUserEmail(userId);
        })
        .then(email => {
            console.log('Correo electrónico del usuario:', email);
            const userStorage = {
                username: user.username,
                email: email,
            };
            localStorage.setItem('user', JSON.stringify(userStorage));
            navigate('/menuPrincipal');
        })
        .catch(error => {
            console.error(error.message);
            if (error.message === "Inicio de sesión fallido") {
                alert('Usuario o contraseña incorrectos');
            } else {
                alert('Error al iniciar sesión');
            }
        });
	}
	const handleChange =(e)=>{
		e.preventDefault();
		setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
	}

	return (
		<div className='login-container'>
			<div className='title-login-container'>
				<h3>Iniciar Sesion</h3>
			</div>
			
			<form onSubmit={handleSubmit} action="" className="login-form">
				<Input text="Nombre de usuario" type="Text" name="username" onChange={handleChange} value={formData.username}/>
				<Input text="Contraseña" type="Text" name="password" onChange={handleChange} value={formData.password}/>
				<div className="btn-login-container">
					<button type="submit" className='form-button'>
						Entrar
						<span className='icon-arrow'></span>
					</button>
				</div>
				
			</form>
			<hr />
			<div className="register-link">
				<p>¿Aún no tienes cuenta?</p>
				<span className='link-form' onClick={()=> setDisplay("display-register")}>Registrate</span>
			</div>
		</div>
	)
}

export default Login