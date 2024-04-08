import './login.css'
import Input from '../Input/Input'
import { useState } from 'react';
import { loginUser } from '../../client';

function Login( {setDisplay} ) {
	const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

	const handleSubmit = (e) => {
		e.preventDefault();
		const user = formData;
		const response = loginUser(user)
			.then(() =>{
				console.log('Iniciando sesion...');
				window.location.href = '/home';
			})
			.catch(err => {
				
				console.log(err.response);
				if(err.response.status === 401){
					alert('Usuario o contraseña incorrectos');
				}
			})
		
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
					<button type="submit">
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