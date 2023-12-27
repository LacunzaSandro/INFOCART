import { useReducer } from 'react';
import api from './apiAxios';

const actions = {
	REQUEST_START: 'REQUEST_START',
	REQUEST_SUCCESS: 'REQUEST_SUCCESS',
	REQUEST_ERROR: 'REQUEST_ERROR',
};

const reducer = (state, action) => {
	switch (action.type) {
		case actions.REQUEST_START:
			return { data: null, loading: true, error: null };
		case actions.REQUEST_SUCCESS:
			return { data: action.payload, loading: false, error: null };
		case actions.REQUEST_ERROR:
			return { data: null, loading: false, error: action.payload };
		default:
			return state;
	}
};

export const useApiRequest = (endpoint, method = 'get') => {
	const [state, dispatch] = useReducer(reducer, { data: null, loading: false, error: null });

	const makeRequest = async (body) => {
		try {
			dispatch({ type: actions.REQUEST_START });

			let response;

			switch (method.toLowerCase()) {
				case 'get':
					response = await api.get(endpoint);
					break;
				case 'post':
					response = await api.post(endpoint, body);
					break;
				case 'put':
					response = await api.put(endpoint, body);
					break;
				case 'delete':
					response = await api.delete(endpoint);
					break;
				default:
					throw new Error('Método HTTP no válido');
			}

			dispatch({ type: actions.REQUEST_SUCCESS, payload: response.data });
		} catch (error) {
			dispatch({ type: actions.REQUEST_ERROR, payload: error });
		}
	};

	return { ...state, makeRequest };
};
