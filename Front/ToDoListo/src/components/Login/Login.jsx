import './login.css'
import Input from '../Input/Input'
import { useState } from 'react';
import { fetchUserEmail, loginUser, getProfileImg } from '../../client';
import { useNavigate } from 'react-router-dom';

function Login( { setDisplay } ) {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

	const handleSubmit = (e) => {
		e.preventDefault();
	
		// Obtén el usuario a partir del formulario
		const user = formData;
	
		loginUser(user)
			.then(userId => {
				console.log('Inicio de sesión exitoso. ID del usuario:', userId);
				
				// Guarda el ID del usuario en localStorage
				localStorage.setItem('userId', userId);
	
				// Obtén el correo electrónico del usuario
				return fetchUserEmail(userId);
			})
			.then(email => {
				console.log('Correo electrónico del usuario:', email);
	
				// Obtén la URL de la imagen del perfil
				return getProfileImg(localStorage.getItem('userId'))
					.then(imageUrl => {
						console.log('URL de la imagen obtenida:', imageUrl);
	
						// Guarda la URL de la imagen en localStorage
						localStorage.setItem('profileImageUrl', imageUrl);
	
						// Construye el objeto userStorage con los datos necesarios
						const userStorage = {
							username: formData.username,
							email: email,
							profileImageUrl: imageUrl
						};
	
						// Guarda el objeto userStorage en localStorage
						localStorage.setItem('user', JSON.stringify(userStorage));
	
						// Navega a la página principal
						navigate('/menuPrincipal');
					});
			})
			.catch(error => {
				console.error('Error durante el proceso de inicio de sesión:', error.message);
				if (error.message === "Inicio de sesión fallido") {
					alert('Usuario o contraseña incorrectos');
				} else {
					alert('Error al iniciar sesión');
				}
			});
	};
	
	const handleChange = (e) => {
		e.preventDefault();
		setFormData({
			...formData,
			[e.target.name]: e.target.value
		});
	};
	

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