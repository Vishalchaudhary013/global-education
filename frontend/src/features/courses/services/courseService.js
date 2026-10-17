import api from "@/api/axiosClient";

const RESOURCE = "/courses";

export const getCourses = async (params) => {
  const response = await api.get(RESOURCE, { params });
  return response.data;
};

export const getCourseById = async (id) => {
  const response = await api.get(`${RESOURCE}/${id}`);
  return response.data;
};

export const createCourse = async (data) => {
  const response = await api.post(RESOURCE, data);
  return response.data;
};

export const updateCourse = async (id, data) => {
  const response = await api.put(`${RESOURCE}/${id}`, data);
  return response.data;
};

export const deleteCourse = async (id) => {
  const response = await api.delete(`${RESOURCE}/${id}`);
  return response.data;
};
