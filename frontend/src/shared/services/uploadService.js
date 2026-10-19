import api from "@/api/axiosClient";

/**
 * Sends one image to the API and returns its public URL. Admin forms store that
 * URL in the same field that otherwise holds a pasted link.
 */
export const uploadImage = async (file) => {
  const body = new FormData();
  body.append("file", file);

  const response = await api.post("/uploads", body, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};
