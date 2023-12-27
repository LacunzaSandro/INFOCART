export const initialState = {
	data: [],
	loading: false,
	error: null,
};

export const reducer = (state = initialState, action) => {
	switch (action.type) {
		case "SET_DATA":
			return { ...state, data: action.payload, loading: false };
		case "LOADING_START":
			return { ...state, loading: true };
		case "LOADING_STOP":
			return { ...state, loading: false };
		case "SET_ERROR":
			return { ...state, error: action.payload, loading: false };
		default:
			return state;
	}
};

export const actions = {
	setData: (data) => ({ type: "SET_DATA", payload: data }),
	loadingStart: () => ({ type: "LOADING_START" }),
	loadingStop: () => ({ type: "LOADING_STOP" }),
	setError: (error) => ({ type: "SET_ERROR", payload: error }),
};