import api from "@/api/axiosClient";

const RESOURCE = "/destinations";

/** Pass `{ admin: true }` to scope the list to the signed-in admin's own rows. */
export const getDestinations = async (params) => {
  const response = await api.get(RESOURCE, { params });
  return response.data;
};

export const getDestinationById = async (id) => {
  const response = await api.get(`${RESOURCE}/${id}`);
  return response.data;
};

export const createDestination = async (data) => {
  const response = await api.post(RESOURCE, data);
  return response.data;
};

export const updateDestination = async (id, data) => {
  const response = await api.put(`${RESOURCE}/${id}`, data);
  return response.data;
};

/** Patches only the keys passed in `guide`; the rest of the guide is kept. */
export const updateDestinationGuide = async (id, guide) => {
  const response = await api.patch(`${RESOURCE}/${id}/guide`, guide);
  return response.data;
};

export const deleteDestination = async (id) => {
  const response = await api.delete(`${RESOURCE}/${id}`);
  return response.data;
};
