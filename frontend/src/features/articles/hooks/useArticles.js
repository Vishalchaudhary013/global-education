import { useCallback, useEffect, useState } from "react";
import { getArticles } from "../services/articleService";

export function useArticles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchArticles = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getArticles();
      setArticles(data || []);
    } catch (err) {
      console.error("Failed to fetch articles from API", err);
      setError(err);
      setArticles([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  return { articles, loading, error, refetch: fetchArticles };
}
