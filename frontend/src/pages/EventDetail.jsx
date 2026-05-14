import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  HiCalendarDays,
  HiMapPin,
  HiVideoCamera,
  HiUsers,
  HiWifi,
  HiArrowLeft,
  HiOutlineGlobeAlt,
  HiStar,
  HiShare,
  HiCheckCircle,
  HiAcademicCap,
  HiClock,
} from "react-icons/hi2";
import api from '../api';
import { useCounselling } from '../context/CounsellingContext';

// Social share icons as SVG components
const FacebookIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
);
const LinkedinIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
);
const TwitterIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/></svg>
);
const WhatsappIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></svg>
);

const modeBadge = {
  online: { label: 'Online', class: 'bg-sky-50 text-sky-700 border border-sky-200', icon: <HiVideoCamera className="h-4 w-4 inline mr-1.5" /> },
  offline: { label: 'In-Person', class: 'bg-rose-50 text-rose-700 border border-rose-200', icon: <HiUsers className="h-4 w-4 inline mr-1.5" /> },
  hybrid: { label: 'Hybrid', class: 'bg-violet-50 text-violet-700 border border-violet-200', icon: <HiWifi className="h-4 w-4 inline mr-1.5" /> },
};

const roleColor = {
  'Host': 'bg-indigo-100 text-indigo-700',
  'Gold Sponsor': 'bg-amber-100 text-amber-700',
  'Premier Partner': 'bg-emerald-100 text-emerald-700',
  'Associate Sponsor': 'bg-rose-100 text-rose-700',
  'Partner': 'bg-cyan-100 text-cyan-700',
  'Participant': 'bg-slate-100 text-slate-700',
};

const EventDetail = () => {
  const { id } = useParams();
  const { openModal } = useCounselling();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: '', email: '', phone: '', city: '', level: '' });
  const [submitted, setSubmitted] = useState(false);

  React.useEffect(() => {
    window.scrollTo(0, 0);
    const fetchEvent = async () => {
      try {
        const response = await api.get(`/events/${id}`);
        setEvent(response.data);
      } catch (err) {
        console.error("Failed to fetch event", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex justify-center items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col bg-slate-50">
        <h2 className="text-3xl font-bold text-slate-800 mb-4">Event Not Found</h2>
        <Link to="/events" className="text-primary font-bold hover:underline">← Back to Events</Link>
      </div>
    );
  }

  const eventDate = new Date(event.date);
  const badge = modeBadge[event.mode] || modeBadge.offline;
  const isGlobal = event.type === 'global' || (event.countries?.length > 1);
  const shareUrl = encodeURIComponent(window.location.href);
  const shareText = encodeURIComponent(`Check out this event: ${event.name}`);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* Hero Header */}
      <div className="bg-slate-900 pt-24 pb-16 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-rose-500 rounded-full blur-[100px]"></div>
        </div>
        <div className="max-w-5xl mx-auto relative z-10">
          <Link to="/events" className="inline-flex items-center gap-2 text-slate-400 hover:text-white font-medium mb-8 transition-colors">
            <HiArrowLeft className="h-4 w-4" /> Back to Events
          </Link>

          <div className="flex flex-wrap gap-3 mb-6">
            <span className={`inline-flex items-center text-sm font-bold px-3 py-1.5 rounded-full ${badge.class}`}>
              {badge.icon}{badge.label}
            </span>
            {isGlobal && (
              <span className="inline-flex items-center text-sm font-bold px-3 py-1.5 rounded-full bg-amber-100 text-amber-700">
                <HiOutlineGlobeAlt className="h-4 w-4 mr-1.5" /> Global Event
              </span>
            )}
          </div>

          <div className="flex items-start gap-5 mb-6">
            <img
              src={event.logo}
              alt={event.name}
              className="w-20 h-20 rounded-2xl object-cover border-2 border-white/20 shadow-xl shrink-0"
            />
            <div>
              <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-3 leading-tight">{event.name}</h1>
              <p className="text-lg text-slate-300 max-w-3xl">{event.description}</p>
            </div>
          </div>

          {/* Social Share Bar */}
          <div className="flex items-center gap-3 mt-6 pt-6 border-t border-white/10">
            <span className="text-slate-400 text-sm font-medium flex items-center gap-2">
              <HiShare className="h-4 w-4" /> Share:
            </span>
            <a href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`} target="_blank" rel="noreferrer"
              className="w-9 h-9 bg-blue-600 text-white rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors shadow-sm" title="Share on Facebook">
              <FacebookIcon />
            </a>
            <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${shareText}`} target="_blank" rel="noreferrer"
              className="w-9 h-9 bg-sky-700 text-white rounded-lg flex items-center justify-center hover:bg-sky-800 transition-colors shadow-sm" title="Share on LinkedIn">
              <LinkedinIcon />
            </a>
            <a href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareText}`} target="_blank" rel="noreferrer"
              className="w-9 h-9 bg-slate-800 text-white rounded-lg flex items-center justify-center hover:bg-black transition-colors shadow-sm" title="Share on Twitter/X">
              <TwitterIcon />
            </a>
            <a href={`https://api.whatsapp.com/send?text=${shareText}%20${shareUrl}`} target="_blank" rel="noreferrer"
              className="w-9 h-9 bg-emerald-600 text-white rounded-lg flex items-center justify-center hover:bg-emerald-700 transition-colors shadow-sm" title="Share on WhatsApp">
              <WhatsappIcon />
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">

          {/* Event Highlights */}
          {event.highlights?.length > 0 && (
            <section className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <HiStar className="h-6 w-6 text-amber-400 fill-amber-400" /> Event Highlights
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {event.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-3 bg-indigo-50 rounded-xl p-4">
                    <HiCheckCircle className="h-5 w-5 text-indigo-500 shrink-0 mt-0.5" />
                    <span className="text-slate-700 font-medium text-sm">{h}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Participating Universities */}
          {event.universities?.length > 0 && (
            <section className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <HiUsers className="h-6 w-6 text-primary" /> Participating Universities
              </h2>
              {isGlobal && event.countries?.length > 0 && (
                <div className="mb-6 p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <p className="text-sm font-semibold text-slate-600 mb-2">Countries represented:</p>
                  <div className="flex flex-wrap gap-2">
                    {event.countries.map((c, i) => (
                      <span key={i} className="px-3 py-1 bg-white border border-slate-200 rounded-full text-sm font-medium text-slate-700 shadow-sm">{c}</span>
                    ))}
                  </div>
                </div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {event.universities.map((uni, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-indigo-200 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-sm shrink-0">
                        {uni.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800 text-sm leading-tight">{uni.name}</p>
                        <p className="text-slate-500 text-xs">{uni.country}</p>
                      </div>
                    </div>
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full shrink-0 ml-2 ${roleColor[uni.role] || roleColor['Participant']}`}>
                      {uni.role}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Event Info */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-5">
            <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-3">Event Details</h3>

            <div className="flex gap-4 items-start">
              <div className="w-11 h-11 bg-indigo-50 text-indigo-500 rounded-xl flex items-center justify-center shrink-0">
                <HiCalendarDays className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-800 text-sm">Date</h4>
                <p className="text-slate-600 text-sm">{eventDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-11 h-11 bg-amber-50 text-amber-500 rounded-xl flex items-center justify-center shrink-0">
                <HiClock className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-800 text-sm">Time</h4>
                <p className="text-slate-600 text-sm">{event.time}</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-11 h-11 bg-rose-50 text-rose-500 rounded-xl flex items-center justify-center shrink-0">
                <HiMapPin className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-800 text-sm">{event.mode === 'online' ? 'Platform' : 'Venue'}</h4>
                <p className="text-slate-600 text-sm">{event.venue}</p>
                {event.mode !== 'online' && <p className="text-slate-500 text-xs mt-0.5">{event.location}</p>}
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-11 h-11 bg-violet-50 text-violet-500 rounded-xl flex items-center justify-center shrink-0">
                <HiAcademicCap className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-800 text-sm">Mode</h4>
                <span className={`inline-flex items-center text-xs font-bold px-2.5 py-1 rounded-full mt-1 ${badge.class}`}>
                  {badge.icon}{badge.label}
                </span>
              </div>
            </div>
          </div>

          {/* Registration Form */}
          <div className="bg-slate-900 rounded-2xl p-6 text-white shadow-xl">
            <h3 className="text-xl font-bold mb-1">Register for this Event</h3>
            <p className="text-slate-400 text-sm mb-5">Free registration. Limited seats available.</p>

            {submitted ? (
              <div className="text-center py-8">
                <HiCheckCircle className="h-14 w-14 text-emerald-400 mx-auto mb-4" />
                <h4 className="text-xl font-bold text-white mb-2">You're Registered!</h4>
                <p className="text-slate-300 text-sm">We'll send you a confirmation email shortly. Looking forward to seeing you!</p>
              </div>
            ) : (
              <form className="space-y-3" onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Full Name *"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 focus:border-primary outline-none text-white placeholder-slate-500 text-sm transition-colors"
                  required
                />
                <input
                  type="email"
                  placeholder="Email Address *"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 focus:border-primary outline-none text-white placeholder-slate-500 text-sm"
                  required
                />
                <input
                  type="tel"
                  placeholder="Phone Number *"
                  value={form.phone}
                  onChange={e => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 focus:border-primary outline-none text-white placeholder-slate-500 text-sm"
                  required
                />
                <input
                  type="text"
                  placeholder="City / Location *"
                  value={form.city}
                  onChange={e => setForm({ ...form, city: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 focus:border-primary outline-none text-white placeholder-slate-500 text-sm"
                  required
                />
                <select
                  value={form.level}
                  onChange={e => setForm({ ...form, level: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 focus:border-primary outline-none text-sm appearance-none cursor-pointer text-white"
                >
                  <option value="" disabled>Study Level</option>
                  <option value="UG">Undergraduate</option>
                  <option value="PG">Postgraduate</option>
                  <option value="PhD">PhD / Research</option>
                  <option value="Diploma">Diploma / Certificate</option>
                </select>
                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-indigo-500 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg hover:shadow-indigo-500/50 mt-2"
                >
                  Confirm Registration →
                </button>
              </form>
            )}
          </div>

          {/* Free Counselling CTA */}
          <div className="bg-gradient-to-br from-rose-500 to-indigo-600 rounded-2xl p-6 text-center text-white shadow-xl">
            <p className="text-sm text-white/80 mb-1">Need personalized guidance?</p>
            <h4 className="text-lg font-bold mb-3">Book a Free Counselling Session</h4>
            <button onClick={openModal} className="w-full bg-white text-primary hover:bg-slate-50 font-bold py-3 rounded-xl transition-colors">
              Book Free Session
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
