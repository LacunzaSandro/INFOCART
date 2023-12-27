export default async function getCategories() {
	const response = await fetch('https://api.escuelajs.co/api/v1/categories');
	const json = await response.json();
	return json;
}