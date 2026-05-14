import React from 'react';
import { HiCalendarDays, HiMapPin, HiVideoCamera, HiUsers, HiWifi, HiArrowRight, HiOutlineGlobeAlt } from "react-icons/hi2";
import { Link } from 'react-router-dom';

const modeBadge = {
  online: { label: 'Online', class: 'bg-sky-50 text-sky-700 border border-sky-200', icon: <HiVideoCamera className="h-3 w-3 inline mr-1" /> },
  offline: { label: 'In-Person', class: 'bg-rose-50 text-rose-700 border border-rose-200', icon: <HiUsers className="h-3 w-3 inline mr-1" /> },
  hybrid: { label: 'Hybrid', class: 'bg-violet-50 text-violet-700 border border-violet-200', icon: <HiWifi className="h-3 w-3 inline mr-1" /> },
};

const EventCard = ({ event }) => {
  const eventDate = new Date(event.date);
  const month = eventDate.toLocaleString('default', { month: 'short' }).toUpperCase();
  const day = eventDate.getDate();
  const year = eventDate.getFullYear();
  const badge = modeBadge[event.mode] || modeBadge.offline;
  const isGlobal = event.type === 'global' || event.countries?.length > 1;

  return (
    <Link to={`/events/${event._id}`} className="block group">
      <div className="bg-white rounded-2xl flex flex-col md:flex-row shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
        
        {/* Date Column */}
        <div className="bg-gradient-to-br from-indigo-500 to-primary md:w-36 flex md:flex-col items-center justify-center p-6 gap-4 md:gap-0 shrink-0">
          <div className="text-center">
            <span className="block text-indigo-200 font-bold text-xs uppercase tracking-widest">{month}</span>
            <span className="block text-5xl font-extrabold text-white leading-none">{day}</span>
            <span className="block text-indigo-200 text-sm font-medium">{year}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex-grow flex flex-col justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className={`inline-flex items-center text-xs font-bold px-2.5 py-1 rounded-full ${badge.class}`}>
                {badge.icon}{badge.label}
              </span>
              {isGlobal && (
                <span className="inline-flex items-center text-xs font-bold px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                  <HiOutlineGlobeAlt className="h-3 w-3 mr-1" /> Global Event
                </span>
              )}
            </div>

            {/* Logo + Name */}
            <div className="flex items-center gap-4 mb-3">
              <img
                src={event.logo}
                alt={event.name}
                className="w-12 h-12 rounded-xl object-cover border border-slate-100 shadow-sm shrink-0"
              />
              <h3 className="text-xl font-bold text-slate-800 group-hover:text-primary transition-colors leading-tight">
                {event.name}
              </h3>
            </div>

            <p className="text-slate-500 text-sm line-clamp-2 mb-3">{event.description}</p>

            <div className="flex flex-col sm:flex-row gap-3 text-sm text-slate-600">
              <span className="flex items-center gap-1.5">
                <HiCalendarDays className="h-4 w-4 text-indigo-400 shrink-0" />
                {eventDate.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' })}
              </span>
              <span className="flex items-center gap-1.5">
                <HiMapPin className="h-4 w-4 text-rose-400 shrink-0" />
                {event.mode === 'online' ? 'Virtual / Online' : `${event.venue}, ${event.location}`}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-slate-100">
            <div className="flex -space-x-2">
              {event.universities?.slice(0, 4).map((uni, i) => (
                <div key={i} className="w-8 h-8 rounded-full bg-indigo-100 border-2 border-white flex items-center justify-center text-indigo-600 text-xs font-bold" title={uni.name}>
                  {uni.name.charAt(0)}
                </div>
              ))}
              {event.universities?.length > 4 && (
                <div className="w-8 h-8 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-slate-500 text-xs font-bold">
                  +{event.universities.length - 4}
                </div>
              )}
            </div>
            <span className="flex items-center gap-1.5 text-primary text-sm font-bold hover:text-indigo-700 transition-colors">
              View & Register <HiArrowRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
