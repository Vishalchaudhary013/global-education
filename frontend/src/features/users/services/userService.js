import api from "@/api/axiosClient";

const RESOURCE = "/users";

/** All user endpoints are superadmin only. */
export const getUsers = async () => {
  const response = await api.get(RESOURCE);
  return response.data;
};

export const deleteUser = async (id) => {
  const response = await api.delete(`${RESOURCE}/${id}`);
  return response.data;
};

export const updateUserRole = async (id, role) => {
  const response = await api.patch(`${RESOURCE}/${id}/role`, { role });
  return response.data;
};
