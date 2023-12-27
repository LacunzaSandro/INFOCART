const inputs = [
	{
		id: 1,
		name: "name",
		type: "text",
		placeholder: "Ingresar Nombre",
		errorMessage:
			"Should be 3-30 and without special character.",
		label: "Nombre",
		pattern: "^[A-Za-z0-9 ]{3,30}$",
		required: true
	},
	{
		id: 2,
		name: "description",
		type: "text",
		placeholder: "Ingresar Descripción",
		errorMessage:
			"Should be 10-100 character",
		label: "Descripción",
		pattern: "^[A-Za-z0-9 ]{0,100}$",
		required: false
	},
	{
		id: 3,
		name: "price",
		type: "text",
		placeholder: "Ingresar Precio Unitario",
		errorMessage:
			"Should be a number between 1-1000000,00 character",
		label: "Precio Unitario",
		pattern: "^(1000000(\\.00?)?|[1-9]\\d{0,5}(\\.\\d{1,2})?|0\\.\\d{1,2})$",
		required: true
	}
];

export default inputs;