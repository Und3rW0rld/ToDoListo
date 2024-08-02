import fetch from "unfetch";

const checkStatus = response => {
	if (response.ok) {
		return response;
	}
	const error = new Error(response.statusText);
	error.response = response;
	return Promise.reject(error);
}

export const createUser = user =>
	fetch("http://localhost:8080/api/v1/register", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(user)
		
	}).then(checkStatus);

export const loginUser = user =>
	fetch("http://localhost:8080/api/v1/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(user)
	}).then(checkStatus)
	.then(response => response.json()) // Parsea la respuesta como JSON
	.then(data => {
			if (data >= 0) {
					return data; // Devuelve el ID del usuario si es válido
			} else {
					throw new Error("Inicio de sesión fallido");
			}
	})
	.catch(error => {
			throw new Error("Error al iniciar sesión: " + error.message);
	});

	export const fetchUserEmail = (userId) =>
	fetch(`http://localhost:8080/api/v1/user/${userId}/email`, {
			method: "GET",
			headers: {
					"Content-Type": "application/json"
			},
	}).then(checkStatus)
	.then(response => {
			if (!response.ok) {
					throw new Error('Error al obtener el correo electrónico del usuario');
			}
			return response.text(); // Devuelve el cuerpo de la respuesta como texto
	})
	.catch(error => {
			throw new Error("Error al obtener el correo electrónico del usuario: " + error.message);
	});


	export const createCategory = category =>
	fetch("http://localhost:8080/api/v1/create_category", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(category)
		
	}).then(checkStatus);


	export const getAllCategories = (id) => {
		return fetch(`http://localhost:8080/api/v1/get_categories/${id}`)
			.then(response => response.json())
			.then(data => {
				// Hacer algo con la lista de categorías recibida
				console.log(data);
				return data; // Devolver los datos para su uso posterior si es necesario
			})
			.catch(error => {
				console.error('Error al obtener las categorías:', error);
				throw error; // Lanzar el error para manejarlo en otro lugar si es necesario
			});
	};

export const deleteCategory = category => {
	return fetch(`http://localhost:8080/api/v1/delete_category/${category}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json"
		},
	}).then(checkStatus);
};

export const createTask = (nuevaTarea) => {
	return fetch("http://localhost:8080/api/v1/create_task", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(nuevaTarea)
	}).then(checkStatus);	
}

export const getAllTask = (id) => {
	return fetch(`http://localhost:8080/api/v1/get_tasks/${id}`)
		.then(response => response.json())
		.then(data => {
			// Hacer algo con la lista de categorías recibida
			console.log(data);
			return data; // Devolver los datos para su uso posterior si es necesario
		})
		.catch(error => {
			console.error('Error al obtener las tareas:', error);
			throw error; // Lanzar el error para manejarlo en otro lugar si es necesario
		});
};

export const updateTask = (id, task) => {
	return fetch(`http://localhost:8080/api/v1/edit_task/${id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(task)
		
	}).then(checkStatus);
}

export const deleteTask = (id) => {
	return fetch(`http://localhost:8080/api/v1/delete_task/${id}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json"
		},
		
	}).then(checkStatus);
}

export const updateUser = (id, user) => {
	return fetch(`http://localhost:8080/api/v1/edit_user/${id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(user)
		
	}).then(checkStatus);
}

export const uploadProfileImage = (id, formData) =>
	fetch(`http://localhost:8080/api/v1/upload/profile-image/${id}`, {
			method: "POST",
			body: formData
	}).then(checkStatus)
	.then(response => response.text())
	.catch(error => {
			throw new Error("Error al subir la imagen: " + error.message);
	});

	export const getProfileImg = (id) => {
		return fetch(`http://localhost:8080/api/v1/img_path/${id}`)
			.then(response => {
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				return response.text(); // Obtener el texto de la respuesta
			})
			.then(url => {
				console.log('URL de la imagen:', url);
				return url; // Devolver solo la URL
			})
			.catch(error => {
				console.error('Error al obtener la imagen:', error);
				throw error; // Lanzar el error para manejarlo en otro lugar si es necesario
			});
	};
	