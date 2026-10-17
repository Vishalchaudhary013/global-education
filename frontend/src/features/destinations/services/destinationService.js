import api from "@/api/axiosClient";

const RESOURCE = "/destinations";

export const getDestinations = async () => {
  const response = await api.get(RESOURCE);
  return response.data;
};

export const getDestinationById = async (id) => {
  const response = await api.get(`${RESOURCE}/${id}`);
  return response.data;
};
