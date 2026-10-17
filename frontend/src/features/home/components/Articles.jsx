import React from "react";
import { Link } from "react-router-dom";
import { HiChevronRight } from "react-icons/hi2";

const Articles = ({ articles }) => (
  <div className="py-20 bg-slate-50 border-t border-slate-200">
    <div className="max-w-[1400px] mx-auto px-6">
      <div className="flex items-end justify-between mb-12">
        <div>
          <h2 className="text-4xl font-extrabold text-[#1F2853] mb-4 tracking-tight">
            Latest News & Insights
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl">
            Stay updated with the latest trends in international education.
          </p>
        </div>
        <Link
          to="/articles"
          className="hidden sm:flex items-center gap-2 text-[#FF4E45] font-semibold hover:text-[#FF4E45] shrink-0"
        >
          View All Articles
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {articles.slice(0, 4).map((article) => (
          <div
            key={article._id}
            className="bg-white rounded-2xl overflow-hidden transition-all duration-300"
          >
            <img
              src={article.img}
              alt={article.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <span className="text-xs font-bold text-[#FF4E45] mb-2 block uppercase tracking-wider">
                {article.category}
              </span>
              <h3 className="text-lg font-bold text-[#1F2853] mb-4 line-clamp-2">
                {article.title}
              </h3>
              <Link
                to={`/articles/${article._id}`}
                className="text-sm font-semibold text-slate-500 hover:text-[#FF4E45] transition-colors flex items-center gap-1"
              >
                Read Fully <HiChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default Articles;
