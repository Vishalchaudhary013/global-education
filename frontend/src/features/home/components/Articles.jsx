import React from "react";
import { Link } from "react-router-dom";
import { HiArrowRight } from "react-icons/hi2";
import Reveal from "@/shared/components/Reveal";
import { Container } from "./ui/Section";

/**
 * Latest articles from `/api/articles`, via `useHomeData`.
 *
 * Three cards on a full-bleed brand band. Hidden entirely when the API returns
 * nothing, so an empty blog never leaves a titled band with no content under
 * it.
 */
const formatDate = (value) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const ArticleCard = ({ article, index }) => {
  const date = formatDate(article.date || article.createdAt);

  return (
    <Reveal delay={index * 90} y={28} className="h-full">
      <Link
        to={`/articles/${article._id}`}
        className="group flex h-full flex-col rounded-[1.5rem] border border-slate-200 bg-white p-4 transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary sm:p-5"
      >
        <div className="flex justify-between mb-4">
          <div className="flex justify-between mb-4 gap-3">
             <img src="https://cdn.prod.website-files.com/682c6e400eb1d872519d387a/682c79dd492bb4cba06c54dc_Post-Author-1.png" alt="" className="w-8 h-8"/>

             <div className="flex flex-col leading-4">
              <span className="font-semibold">
                Dainne Rusell
              </span>
              <span className="text-sm text-secondary font-medium">
                Student
              </span>
             </div>
          </div>

          <span className="text-sm">
            {date && (
              <time dateTime={article.date || article.createdAt}>{date}</time>
            )}
          </span>



        </div>
        <div className="overflow-hidden rounded-[1.1rem] bg-slate-100">
          {article.img && (
            <img
              src={article.img}
              alt=""
              loading="lazy"
              decoding="async"
              className="h-48 w-full object-cover transition-transform duration-[700ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:scale-[1.06] sm:h-56"
            />
          )}
        </div>

        <div className="flex flex-1 flex-col px-1 pt-5">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
            {article.category && (
              <span className="font-bold uppercase tracking-[0.14em] text-secondary">
                {article.category}
              </span>
            )}
            {/* {date && (
              <time dateTime={article.date || article.createdAt}>{date}</time>
            )} */}
          </div>

          <h3 className="mt-3 flex-1 text-pretty text-lg font-bold leading-snug tracking-tight text-primary transition-colors duration-300 group-hover:text-secondary sm:text-xl">
            {article.title}
          </h3>

          <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-secondary">
            Read More
            <HiArrowRight
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5"
              aria-hidden="true"
            />
          </span>
        </div>
      </Link>
    </Reveal>
  );
};

const Articles = ({ articles = [] }) => {
  const list = articles.slice(0, 3);
  if (!list.length) return null;

  return (
    <section
      id="insights"
      className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-28"
    >

      <Container className="relative">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <Reveal y={20} className="max-w-2xl">
            <p className="mb-5 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-secondary">
              <span
                aria-hidden="true"
                className="inline-block h-2.5 w-2.5 bg-secondary"
              />
              Our Blogs
            </p>
            <h2 className="text-balance text-3xl font-extrabold leading-[1.1] tracking-tight text-primary sm:text-4xl lg:text-5xl">
              Latest News and Insights
            </h2>
          </Reveal>

          <Reveal delay={120} y={20} className="shrink-0">
            <Link
              to="/articles"
              className="group inline-flex items-center gap-2 rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-primary transition-colors duration-300 hover:border-primary hover:bg-primary hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
            >
              All Articles
              <HiArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {list.map((article, index) => (
            <ArticleCard key={article._id} article={article} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Articles;
