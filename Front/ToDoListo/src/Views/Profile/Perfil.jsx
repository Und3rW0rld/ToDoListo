import { useState } from "react";
import Input from "../../components/Input/Input";
import "./perfil.css";
import { createUser } from "../../client";

const Perfil = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
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
		//UPDATEEEEEEEEEEEEE
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
  
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleSaveChanges = () => {
    console.log("Cambios guardados:", { username, email, password });
    const user_id = localStorage.getItem("userId");
    console.log(user_id)
  };

  return (
    <div className="profile-wrapper">
      <div className="perfil-container">
        <h2 className="titulo-perfil">Edita tu perfil</h2>
        <form action="" onSubmit={handleSubmit}>
        <div className="inputs-container">
        <Input text="Nombre de usuario" type="text" name="username" onChange={handleChange} value={formData.username}/>
                <Input text="Correo" type="text" name="email" onChange={handleChange} value={formData.email}/>
                {emailError && <p className="error-message">{emailError}</p>}
                <Input text="Contraseña" type="password" name="password" onChange={handleChange} value={formData.password}/>
                {passwordError && <p className="error-message">{passwordError}</p>}
        </div>

        <button className="save-changes-btn">
          Guardar cambios
        </button>
        </form>
        
      </div>
      
      <div className="photo-container">
        <label htmlFor="file-input"><div className="img">
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" />
                ) : (
                  <p>Upload Img</p>
                )}
              </div></label>
        <input className="input-file" id="file-input" type="file" name="image" accept="image/*" onChange={handleImageUpload} />
      </div>
    </div>
  );
};

export default Perfil;
