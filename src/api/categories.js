import { apiRequest } from './utils';

function getCategoriesList() {
	return apiRequest('GET', '/categories');
}

function getCategory(id) {
	return apiRequest('GET', '/categories/' + id);

}


export default {
	getList: getCategoriesList,
	getCategory: getCategory
};