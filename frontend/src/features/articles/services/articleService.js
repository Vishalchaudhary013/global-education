import api from "@/api/axiosClient";

const RESOURCE = "/articles";

export const getArticles = async () => {
  const response = await api.get(RESOURCE);
  return response.data;
};

export const getArticleById = async (id) => {
  const response = await api.get(`${RESOURCE}/${id}`);
  return response.data;
};
