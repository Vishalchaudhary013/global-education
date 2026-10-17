import { useEffect, useState } from "react";
import { getArticles } from "../services/articleService";

/**
 * The detail page needs the whole collection anyway (for "related articles"),
 * so it resolves the active article from that list rather than firing a
 * second request.
 */
export function useArticle(id) {
  const [article, setArticle] = useState(null);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;

    const fetchArticleData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getArticles();
        if (!active) return;
        setArticles(data || []);
        setArticle(data?.find((a) => a._id === id));
      } catch (err) {
        console.error("Failed to fetch articles", err);
        if (active) setError(err);
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchArticleData();
    return () => {
      active = false;
    };
  }, [id]);

  return { article, articles, loading, error };
}
