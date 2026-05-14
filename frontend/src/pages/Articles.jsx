import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  HiMagnifyingGlass,
  HiChevronRight,
  HiClock,
  HiCalendarDays,
  HiUser,
  HiBookOpen,
  HiTag,
} from "react-icons/hi2";
import api from '../api';

const categories = [
  "All",
  "Study Abroad",
  "Scholarships",
  "Test Preparation",
  "Student Life",
  "Visa & Immigration",
  "Application Tips",
];

const ArticleCard = ({ article }) => (
  <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
    <div className="relative overflow-hidden">
      <img
        src={article.img}
        alt={article.title}
        className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <span className="absolute top-3 left-3 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
        {article.category}
      </span>
    </div>
    <div className="p-6 flex flex-col flex-1">
      <div className="flex items-center gap-4 text-xs text-slate-400 mb-3">
        <span className="flex items-center gap-1">
          <HiCalendarDays className="h-3.5 w-3.5" />
          {new Date(article.date).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </span>
        <span className="flex items-center gap-1">
          <HiClock className="h-3.5 w-3.5" />
          {article.readTime}
        </span>
      </div>
      <h3 className="text-lg font-bold text-slate-800 mb-2 leading-snug line-clamp-2">
        {article.title}
      </h3>
      <p className="text-sm text-slate-500 leading-relaxed line-clamp-3 mb-4 flex-1">
        {article.excerpt}
      </p>
      <div className="flex items-center gap-3 pt-4 border-t border-slate-100 justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-indigo-100 flex items-center justify-center shrink-0">
            <HiUser className="h-3.5 w-3.5 text-primary" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-700 leading-none">
              {article.author}
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              {article.authorRole}
            </p>
          </div>
        </div>
        <Link
          to={`/articles/${article._id}`}
          className="flex items-center gap-1 text-sm font-semibold text-primary hover:text-indigo-700 transition-colors shrink-0"
        >
          Read Fully <HiChevronRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  </div>
);

const Articles = () => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [articlesData, setArticlesData] = useState([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await api.get('/articles');
        setArticlesData(response.data);
      } catch (err) {
        console.error("Failed to fetch articles from API", err);
        setArticlesData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  const filtered = useMemo(() => {
    return articlesData.filter((a) => {
      const matchesCategory =
        activeCategory === "All" || a.category === activeCategory;
      const q = search.toLowerCase();
      const matchesSearch =
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.author.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [search, activeCategory, articlesData]);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 text-indigo-200 text-sm font-semibold px-4 py-1.5 rounded-full mb-5">
            <HiBookOpen className="h-4 w-4" /> Expert Insights & Guides
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
            Latest <span className="text-indigo-400">Articles</span>
          </h1>
          <p className="text-slate-300 text-lg mb-8">
            Stay informed with expert guides on studying abroad, scholarships,
            visa processes, and more.
          </p>
          {/* Search */}
          <div className="relative max-w-xl mx-auto">
            <HiMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search articles by title, topic, or tag..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/10 border border-white/20 text-white placeholder-slate-400 rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:border-indigo-400 focus:bg-white/15"
            />
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="sticky top-0 z-20 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-[1400px] mx-auto px-6 py-3 flex gap-2 overflow-x-auto scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                activeCategory === cat
                  ? "bg-primary text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      <div className="max-w-[1400px] mx-auto px-6 py-14">
        {loading ? (
          <div className="flex justify-center items-center py-24">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24">
            <HiTag className="h-12 w-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-600 mb-2">
              No articles found
            </h3>
            <p className="text-slate-400">
              Try a different search term or category.
            </p>
            <button
              onClick={() => {
                setSearch("");
                setActiveCategory("All");
              }}
              className="mt-6 bg-primary text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-indigo-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filtered.map((article) => (
              <ArticleCard key={article._id} article={article} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Articles;
