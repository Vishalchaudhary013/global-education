import api from "@/api/axiosClient";

const RESOURCE = "/auth";

/** Returns { token, user } from the backend. */
export const login = async (credentials) => {
  const response = await api.post(`${RESOURCE}/login`, credentials);
  return response.data;
};

/** Returns { token, user } from the backend. */
export const register = async (payload) => {
  const response = await api.post(`${RESOURCE}/register`, payload);
  return response.data;
};
