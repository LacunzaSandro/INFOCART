// import { axiosPrivate } from "../api/axios";
import { useEffect, useState } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";

const useFetchPrivate = () => {
	const refresh = useRefreshToken();
	const { auth } = useAuth();
	const [fetchInstance, setFetchInstance] = useState(null);

	useEffect(() => {
		const fetchInterceptor = async (url, options = {}) => {
			if (!options.headers) {
				options.headers = {};
			}

			if (!options.headers["Authorization"]) {
				options.headers["Authorization"] = `Bearer ${auth?.accessToken}`;
			}

			try {
				const response = await fetch(url, options);

				if (response.status === 403) {
					// Refresh token logic
					const newAccessToken = await refresh();
					options.headers["Authorization"] = `Bearer ${newAccessToken}`;
					return fetchInterceptor(url, options); // Retry the original request
				}

				return response;
			} catch (error) {
				return Promise.reject(error);
			}
		};

		setFetchInstance(fetchInterceptor);

		return () => {
			setFetchInstance(null);
		};
	}, [auth, refresh]);

	return fetchInstance;
};

export default useFetchPrivate;