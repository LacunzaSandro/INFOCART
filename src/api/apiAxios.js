import axios from 'axios';

const api = axios.create({
	baseURL: 'https://api.escuelajs.co/api/v1', // Reemplaza con la URL de tu API
});

// Interceptores para manejar automáticamente el encabezado de autorización y posibles errores de token expirado
api.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem('accessToken');
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

api.interceptors.response.use(
	(response) => {
		return response;
	},
	async (error) => {
		const originalRequest = error.config;

		if (error.response.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;
			// Intentar actualizar el token usando el refresh token
			try {
				const refreshToken = localStorage.getItem('refreshToken');
				const response = await api.post('/auth/refresh', { refreshToken });
				const newAccessToken = response.data.access_token;

				// Actualizar el token en el almacenamiento local
				localStorage.setItem('accessToken', newAccessToken);

				// Repetir la solicitud original con el nuevo token
				originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
				return axios(originalRequest);
			} catch (refreshError) {
				// Manejar el error de actualización del token (puede ser necesario redirigir al usuario al inicio de sesión)
				return Promise.reject(refreshError);
			}
		}

		return Promise.reject(error);
	}
);

export default api;
