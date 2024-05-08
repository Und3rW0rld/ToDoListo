import React from 'react'
import Register from '../../components/Register/Register'
import Login from '../../components/Login/Login'
import './LoginRegister.css'
import Background from '../../components/Background/Background'

function LoginRegister() {
	const [display, setDisplay] = React.useState('display-login')
	
	return (
		<>
		<div className="container">
			<Background display={ display } />
			<Register setDisplay = {setDisplay} />
			<Login setDisplay = {setDisplay}/>	
		</div>
		</>
	)
}

export default LoginRegister