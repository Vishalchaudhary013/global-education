import React from "react";
import { Link } from "react-router-dom";
import { HiCalendarDays, HiChevronRight, HiMapPin } from "react-icons/hi2";

const UpcomingEvents = ({ events }) => (
  <div className="py-20 bg-white overflow-hidden">
    <div className="max-w-[1400px] mx-auto px-6">
      <div className="flex items-end justify-between mb-10">
        <div>
          <p className="text-[#FF4E45] font-bold text-sm uppercase tracking-widest mb-2 flex items-center gap-2">
            <HiCalendarDays className="h-4 w-4" /> Don't Miss Out
          </p>
          <h2 className="text-4xl font-extrabold text-[#1F2853]">
            Upcoming Events
          </h2>
          <p className="text-slate-500 mt-2 max-w-xl">
            Join education fairs, webinars, and assessment days to fast-track
            your study abroad journey.
          </p>
        </div>
        <Link
          to="/events"
          className="hidden sm:flex items-center gap-2 text-[#FF4E45] font-semibold hover:text-[#FF4E45] shrink-0"
        >
          View All Events <HiChevronRight className="h-5 w-5" />
        </Link>
      </div>

      {/* 3-column grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {events.slice(0, 4).map((event) => {
          const d = new Date(event.date);
          const modeColors = {
            online: "bg-sky-100 text-sky-700",
            offline: "bg-rose-100 text-[#FF4E45]",
            hybrid: "bg-violet-100 text-violet-700",
          };
          const modeLabels = {
            online: "🌐 Online",
            offline: "📍 In-Person",
            hybrid: "🔀 Hybrid",
          };
          return (
            <Link
              to={`/events/${event._id}`}
              key={event._id}
              className="group bg-white border border-slate-200 rounded-2xl overflow-hidden hover:-translate-y-1 transition-all duration-300"
            >
              {/* Card Top — solid date */}
              <div className="bg-[#FF4E45] p-5 flex items-center gap-4">
                <div className="text-center bg-white/15 rounded-xl px-4 py-2">
                  <span className="block text-indigo-200 text-xs font-bold uppercase tracking-widest">
                    {d.toLocaleString("default", { month: "short" })}
                  </span>
                  <span className="block text-white text-3xl font-extrabold leading-none">
                    {d.getDate()}
                  </span>
                  <span className="block text-indigo-200 text-xs">
                    {d.getFullYear()}
                  </span>
                </div>
                <div>
                  <img
                    src={event.logo}
                    alt={event.name}
                    className="w-12 h-12 rounded-xl border-2 border-white/30 object-cover"
                  />
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex flex-col gap-3">
                <span
                  className={`self-start text-xs font-bold px-2.5 py-1 rounded-full ${modeColors[event.mode]}`}
                >
                  {modeLabels[event.mode]}
                </span>
                <h3 className="font-bold text-[#1F2853] text-base leading-tight group-hover:text-[#FF4E45] transition-colors line-clamp-2">
                  {event.name}
                </h3>
                <p className="text-slate-500 text-xs flex items-center gap-1.5">
                  <HiMapPin className="h-3.5 w-3.5 text-rose-400 shrink-0" />
                  {event.mode === "online"
                    ? "Virtual / Online"
                    : `${event.venue}, ${event.location}`}
                </p>
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-500">{event.time}</span>
                  <span className="text-xs text-[#FF4E45] font-bold flex items-center gap-1">
                    Register <HiChevronRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="mt-6 text-center sm:hidden">
        <Link
          to="/events"
          className="inline-flex items-center gap-2 text-[#1F2853] font-semibold "
        >
          View All Events <HiChevronRight className="h-5 w-5" />
        </Link>
      </div>
    </div>
  </div>
);

export default UpcomingEvents;
