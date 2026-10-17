import api from "@/api/axiosClient";

const RESOURCE = "/universities";

export const getUniversities = async (params) => {
  const response = await api.get(RESOURCE, { params });
  return response.data;
};

export const getUniversityById = async (id) => {
  const response = await api.get(`${RESOURCE}/${id}`);
  return response.data;
};

export const createUniversity = async (data) => {
  const response = await api.post(RESOURCE, data);
  return response.data;
};

export const updateUniversity = async (id, data) => {
  const response = await api.put(`${RESOURCE}/${id}`, data);
  return response.data;
};

export const deleteUniversity = async (id) => {
  const response = await api.delete(`${RESOURCE}/${id}`);
  return response.data;
};
