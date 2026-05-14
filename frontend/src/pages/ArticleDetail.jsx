import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  HiArrowLeft,
  HiClock,
  HiCalendarDays,
  HiUser,
  HiTag,
  HiChevronRight,
  HiShare,
  HiBookOpen,
} from "react-icons/hi2";
import api from "../api";

const ArticleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [article, setArticle] = React.useState(null);
  const [allArticles, setAllArticles] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    window.scrollTo(0, 0);
    const fetchArticleData = async () => {
      try {
        const response = await api.get('/articles');
        setAllArticles(response.data || []);
        const found = response.data?.find((a) => a._id === id);
        setArticle(found);
      } catch (err) {
        console.error("Failed to fetch articles", err);
      } finally {
        setLoading(false);
      }
    };
    fetchArticleData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex justify-center items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <HiBookOpen className="h-16 w-16 text-slate-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-700 mb-2">
            Article Not Found
          </h2>
          <p className="text-slate-500 mb-6">
            This article doesn't exist or may have been removed.
          </p>
          <Link
            to="/articles"
            className="bg-primary text-white font-semibold px-6 py-3 rounded-xl hover:bg-indigo-700 transition-colors"
          >
            Browse All Articles
          </Link>
        </div>
      </div>
    );
  }

  const related = allArticles
    .filter(
      (a) =>
        a._id !== article._id &&
        (a.category === article.category ||
          a.tags.some((t) => article.tags.includes(t))),
    )
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero / Cover Image */}
      <div className="relative h-72 sm:h-96 w-full overflow-hidden">
        <img
          src={article.img}
          alt={article.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 max-w-4xl mx-auto px-6 pb-8">
          <span className="inline-block bg-primary text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
            {article.category}
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
            {article.title}
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-10">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-slate-500 hover:text-primary mb-8 transition-colors"
        >
          <HiArrowLeft className="h-4 w-4" /> Back to Articles
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Article Body */}
          <div className="lg:col-span-2">
            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 mb-6 pb-6 border-b border-slate-200">
              <span className="flex items-center gap-1.5">
                <HiCalendarDays className="h-4 w-4 text-primary" />
                {new Date(article.date).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
              <span className="flex items-center gap-1.5">
                <HiClock className="h-4 w-4 text-primary" />
                {article.readTime}
              </span>
              <span className="flex items-center gap-1.5">
                <HiUser className="h-4 w-4 text-primary" />
                {article.author}
              </span>
            </div>

            {/* Excerpt */}
            <p className="text-slate-600 text-lg leading-relaxed mb-8 font-medium border-l-4 border-primary pl-4 bg-indigo-50 py-3 pr-3 rounded-r-xl">
              {article.excerpt}
            </p>

            {/* Content Sections */}
            <div className="space-y-8">
              {article.content.map((section, i) => (
                <div key={i}>
                  <h2 className="text-xl font-bold text-slate-800 mb-3 flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-indigo-100 text-primary text-xs font-extrabold flex items-center justify-center shrink-0">
                      {i + 1}
                    </span>
                    {section.heading}
                  </h2>
                  <p className="text-slate-600 leading-relaxed text-base">
                    {section.body}
                  </p>
                </div>
              ))}
            </div>

            {/* Tags */}
            <div className="mt-10 pt-8 border-t border-slate-200">
              <div className="flex flex-wrap items-center gap-2">
                <HiTag className="h-4 w-4 text-slate-400" />
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-slate-100 text-slate-600 text-xs font-semibold px-3 py-1.5 rounded-full hover:bg-indigo-100 hover:text-primary cursor-pointer transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Author Card */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">
                About the Author
              </h4>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center shrink-0">
                  <HiUser className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-bold text-slate-800">{article.author}</p>
                  <p className="text-xs text-slate-500">{article.authorRole}</p>
                </div>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Expert advisor at GlobalEdu, helping students navigate their
                study abroad journey with personalised guidance.
              </p>
            </div>

            {/* Share */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                <HiShare className="h-4 w-4" /> Share this Article
              </h4>
              <div className="flex gap-2 flex-wrap">
                {["Twitter", "LinkedIn", "Facebook", "WhatsApp"].map((s) => (
                  <button
                    key={s}
                    className="flex-1 min-w-fit text-xs font-semibold bg-slate-100 hover:bg-primary hover:text-white text-slate-700 px-3 py-2 rounded-lg transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-br from-indigo-600 to-primary rounded-2xl p-6 text-white">
              <h4 className="font-bold text-lg mb-2">Need Guidance?</h4>
              <p className="text-indigo-200 text-sm mb-4">
                Talk to our expert advisors for free personalised counselling.
              </p>
              <Link
                to="/services"
                className="block text-center bg-white text-primary font-bold py-2.5 rounded-xl hover:bg-indigo-50 transition-colors text-sm"
              >
                Book Free Session
              </Link>
            </div>

            {/* Browse More */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">
                Browse Articles
              </h4>
              <Link
                to="/articles"
                className="flex items-center justify-between text-sm font-semibold text-primary hover:text-indigo-700 transition-colors"
              >
                View All Articles <HiChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Related Articles */}
        {related.length > 0 && (
          <div className="mt-16 pt-10 border-t border-slate-200">
            <h3 className="text-2xl font-extrabold text-slate-800 mb-8">
              Related Articles
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((rel) => (
                <Link
                  key={rel._id}
                  to={`/articles/${rel._id}`}
                  className="group bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  <img
                    src={rel.img}
                    alt={rel.title}
                    className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="p-4">
                    <span className="text-xs font-bold text-primary block mb-1 uppercase tracking-wide">
                      {rel.category}
                    </span>
                    <h4 className="font-bold text-slate-800 text-sm leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                      {rel.title}
                    </h4>
                    <p className="text-xs text-slate-400 mt-2 flex items-center gap-1">
                      <HiClock className="h-3 w-3" /> {rel.readTime}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticleDetail;
