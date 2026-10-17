import api from "@/api/axiosClient";

const RESOURCE = "/scholarships";

export const getScholarships = async (params) => {
  const response = await api.get(RESOURCE, { params });
  return response.data;
};

export const getScholarshipById = async (id) => {
  const response = await api.get(`${RESOURCE}/${id}`);
  return response.data;
};

export const createScholarship = async (data) => {
  const response = await api.post(RESOURCE, data);
  return response.data;
};

export const updateScholarship = async (id, data) => {
  const response = await api.put(`${RESOURCE}/${id}`, data);
  return response.data;
};

export const deleteScholarship = async (id) => {
  const response = await api.delete(`${RESOURCE}/${id}`);
  return response.data;
};
