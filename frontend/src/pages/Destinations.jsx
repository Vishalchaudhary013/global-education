import React from 'react';
import { Link } from 'react-router-dom';
import { HiMapPin, HiArrowRight } from "react-icons/hi2";

const destinations = [
  { id: 'australia', name: 'Australia', img: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?q=80&w=2730&auto=format&fit=crop', desc: 'World-class education, post-study work opportunities, and an unmatched lifestyle.' },
  { id: 'uk', name: 'United Kingdom', img: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=2670&auto=format&fit=crop', desc: 'Home to some of the world\'s oldest and most prestigious universities.' },
  { id: 'canada', name: 'Canada', img: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?q=80&w=2611&auto=format&fit=crop', desc: 'High quality of life, diverse culture, and excellent immigration pathways.' },
  { id: 'usa', name: 'United States', img: 'https://images.unsplash.com/photo-1550850839-8dc894ed385a?q=80&w=2675&auto=format&fit=crop', desc: 'Leading technological innovation and a vast range of academic options.' },
  { id: 'germany', name: 'Germany', img: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=2670&auto=format&fit=crop', desc: 'Low tuition fees, strong economy, and top-tier engineering programs.' },
  { id: 'dubai', name: 'Dubai', img: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2670&auto=format&fit=crop', desc: 'A global hub for business and education with a futuristic outlook.' },
  { id: 'india', name: 'India', img: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=2671&auto=format&fit=crop', desc: 'Rich cultural heritage and rapidly growing educational institutions.' }
];

const Destinations = () => {

  return (
    <div className="min-h-screen bg-slate-50  pb-24">
      {/* Header */}
      <div className="bg-slate-900 py-16 text-center px-6">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">Explore Study Destinations</h1>
        <p className="text-xl text-slate-300 max-w-2xl mx-auto">
          Choose from the world's top study destinations and unlock a global career.
        </p>
      </div>

      {/* Grid */}
      <div className="max-w-[1400px] mx-auto px-6 mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((dest) => (
            <div key={dest.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
              <div className="h-64 overflow-hidden relative">
                <img src={dest.img} alt={dest.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                <h2 className="absolute bottom-6 left-6 text-3xl font-bold text-white flex items-center gap-2">
                  <HiMapPin className="h-6 w-6 text-primary" /> {dest.name}
                </h2>
              </div>
              <div className="p-6">
                <p className="text-slate-600 mb-6 line-clamp-2">{dest.desc}</p>
                <Link to={`/destinations/${dest.id}`} className="inline-flex items-center justify-center w-full gap-2 bg-slate-50 group-hover:bg-primary group-hover:text-white text-slate-700 font-bold py-3 px-6 rounded-xl transition-colors duration-300">
                  Explore {dest.name} <HiArrowRight className="h-5 w-5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Destinations;
