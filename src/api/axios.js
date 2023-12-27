import axios from 'axios';
const BASE_URL = 'https://api.escuelajs.co/api/v1';


const api = axios.create({
	baseURL: BASE_URL,
	headers: {
		'Content-Type': 'application/json',
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Headers':
			'Authorization, x-auth-token, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method',
		'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
		Allow: 'GET, PUT, POST, DELETE, OPTIONS',
	},
	withCredentials: false,
});

// Interceptor para agregar el token a todas las solicitudes
api.interceptors.request.use((config) => {
	// Obtener el token de la localStorage
	const token = localStorage.getItem('token');

	// Agregar el token al encabezado si existe
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}

	return config;
});

export default api;
