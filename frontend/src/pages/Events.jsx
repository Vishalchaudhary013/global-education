import React, { useState, useEffect } from 'react';
import EventCard from '../components/EventCard';
import { HiCalendarDays, HiMagnifyingGlass, HiFunnel, HiOutlineGlobeAlt } from "react-icons/hi2";
import api from '../api';

const Events = () => {
  const [filter, setFilter] = useState({ mode: '', search: '' });
  const [eventsData, setEventsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.get('/events');
        setEventsData(response.data);
      } catch (err) {
        console.error("Failed to fetch events from API", err);
        setEventsData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const filtered = eventsData.filter(ev => {
    const matchMode = !filter.mode || ev.mode === filter.mode;
    const matchSearch = !filter.search || ev.name.toLowerCase().includes(filter.search.toLowerCase());
    return matchMode && matchSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50  pb-24">
      {/* Header */}
      <div className="bg-slate-900 py-16 text-center px-6 mb-12 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-rose-500/20 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-indigo-500/20 rounded-full blur-[100px] translate-x-1/3 translate-y-1/2 pointer-events-none"></div>
        <HiCalendarDays className="h-16 w-16 text-rose-400 mx-auto mb-6 relative z-10" />
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 relative z-10">Upcoming Events</h1>
        <p className="text-xl text-slate-300 max-w-2xl mx-auto relative z-10">
          Join our education fairs, webinars, and assessment days to fast-track your study abroad journey.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-6">
        {/* Filters */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 mb-8 flex flex-col sm:flex-row gap-4 items-center shadow-sm">
          <div className="relative flex-1 w-full">
            <HiMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search events by name..."
              value={filter.search}
              onChange={e => setFilter({ ...filter, search: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {['', 'online', 'offline', 'hybrid'].map(mode => (
              <button
                key={mode}
                onClick={() => setFilter({ ...filter, mode })}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors border ${filter.mode === mode ? 'bg-primary text-white border-primary' : 'bg-white text-slate-600 border-slate-200 hover:border-primary hover:text-primary'}`}
              >
                {mode === '' ? 'All Events' : mode === 'online' ? '🌐 Online' : mode === 'offline' ? '📍 In-Person' : '🔀 Hybrid'}
              </button>
            ))}
          </div>
        </div>

        {/* Count */}
        <p className="text-slate-500 text-sm font-medium mb-6">
          <HiFunnel className="h-4 w-4 inline mr-1" /> Showing <strong className="text-slate-800">{filtered.length}</strong> upcoming events
        </p>

        {/* Cards */}
        <div className="space-y-5">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : filtered.length > 0 ? (
            <div className="grid grid-cols-1 gap-6">
              {filtered.map((event, i) => (
                <EventCard key={event._id || i} event={event} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white border border-slate-200 rounded-2xl">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                <HiCalendarDays className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">No Events Found</h3>
              <p className="text-slate-500">We couldn't find any events matching your criteria.</p>
              <button 
                onClick={() => setFilter({ mode: '', search: '' })}
                className="mt-6 text-primary font-bold hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Events;
