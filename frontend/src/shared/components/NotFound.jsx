import React from "react";
import { Link } from "react-router-dom";
import { HiExclamationTriangle } from "react-icons/hi2";
import { notFoundMetadata, seoConfig, useSeo } from "@/shared/seo";

/**
 * The page for a URL that does not resolve to anything.
 *
 * Before this existed an unknown path rendered an empty layout and still
 * answered 200, which search engines treat as a soft 404 and keep in the index.
 * The `noindex` here, plus the 404 status the edge middleware sets for
 * unmatched routes, is what makes the answer honest.
 */
const NotFound = ({
  label = "Page",
  message = "The page you are looking for doesn't exist or has been moved.",
  backTo = "/",
  backLabel = "Back to home",
}) => {
  useSeo(notFoundMetadata(seoConfig, label));

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6 py-24">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-8">
          <HiExclamationTriangle className="h-10 w-10 text-[#FF4E45]" />
        </div>
        <p className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-3">
          404
        </p>
        <h1 className="text-3xl font-extrabold text-[#1F2853] mb-4 tracking-tight">
          {label} not found
        </h1>
        <p className="text-slate-500 mb-10 leading-relaxed">{message}</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to={backTo}
            className="bg-[#1F2853] text-white px-8 py-3.5 rounded-xl font-bold hover:bg-[#FF4E45] transition-colors"
          >
            {backLabel}
          </Link>
          <Link
            to="/destinations"
            className="border border-slate-200 bg-white text-slate-600 px-8 py-3.5 rounded-xl font-bold hover:bg-slate-100 transition-colors"
          >
            Explore destinations
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
