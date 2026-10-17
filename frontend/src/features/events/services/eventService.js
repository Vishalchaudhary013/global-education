import api from "@/api/axiosClient";

const RESOURCE = "/events";

export const getEvents = async (params) => {
  const response = await api.get(RESOURCE, { params });
  return response.data;
};

export const getEventById = async (id) => {
  const response = await api.get(`${RESOURCE}/${id}`);
  return response.data;
};

export const createEvent = async (data) => {
  const response = await api.post(RESOURCE, data);
  return response.data;
};

export const updateEvent = async (id, data) => {
  const response = await api.put(`${RESOURCE}/${id}`, data);
  return response.data;
};

export const deleteEvent = async (id) => {
  const response = await api.delete(`${RESOURCE}/${id}`);
  return response.data;
};
