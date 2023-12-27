import { apiRequest } from './utils';

function PostLogin(body) {
	return apiRequest('POST', '/auth/login', body);
}




export default {
	Login: PostLogin,
};