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
	}).then(checkStatus);