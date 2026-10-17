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

/** Sets an account's password outright; `notify` emails the new password to them. */
export const setUserPassword = async (id, password, notify = false) => {
  const response = await api.patch(`${RESOURCE}/${id}/password`, { password, notify });
  return response.data;
};

/** Returns a token for the target admin so a superadmin can open their dashboard. */
export const impersonateUser = async (id) => {
  const response = await api.post(`${RESOURCE}/${id}/impersonate`);
  return response.data;
};
