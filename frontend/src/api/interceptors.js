import { getApiErrorMessage } from "@/shared/utils/apiError";

/**
 * Shared request/response behaviour for the Axios client.
 *
 * Auth: the backend expects a JWT in the Authorization header, and the token is
 * persisted in localStorage by the auth feature. That contract is preserved here
 * deliberately -- this app does not use HTTP-only cookies.
 */
export const attachInterceptors = (client) => {
  client.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error),
  );

  client.interceptors.response.use(
    (response) => response,
    (error) => {
      // Keep the original Axios error intact (callers rely on error.response)
      // and add a normalised, display-ready message alongside it.
      error.apiMessage = getApiErrorMessage(error);
      return Promise.reject(error);
    },
  );

  return client;
};
