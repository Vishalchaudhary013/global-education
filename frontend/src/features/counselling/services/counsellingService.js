import api from "@/api/axiosClient";

const RESOURCE = "/counselling";

export const submitCounsellingRequest = async (data) => {
  const response = await api.post(RESOURCE, data);
  return response.data;
};

/** Admin only. */
export const getCounsellingRequests = async () => {
  const response = await api.get(RESOURCE);
  return response.data;
};

/** Admin only. */
export const updateCounsellingRequestStatus = async (id, status) => {
  const response = await api.patch(`${RESOURCE}/${id}/status`, { status });
  return response.data;
};
