import React from 'react';
import { HiPaperAirplane, HiCalendarDays, HiBookOpen, HiAcademicCap, HiBuildingOffice2, HiDocumentText } from "react-icons/hi2";
import { useCounselling } from '../context/CounsellingContext';

const Services = () => {
  const { openModal } = useCounselling();
  const services = [
    { icon: <HiCalendarDays className="h-8 w-8" />, title: 'Free Counselling', desc: 'Expert guidance to help you choose the right course and university based on your profile.' },
    { icon: <HiBuildingOffice2 className="h-8 w-8" />, title: 'University Selection', desc: 'Shortlising top universities that fit your budget, academic record, and career goals.' },
    { icon: <HiPaperAirplane className="h-8 w-8" />, title: 'Visa Guidance', desc: 'Complete assistance with visa applications, interview prep, and documentation.' },
    { icon: <HiDocumentText className="h-8 w-8" />, title: 'Fee Structure Guidance', desc: 'Detailed breakdown of tuition and living expenses, plus scholarship assistance.' },
    { icon: <HiAcademicCap className="h-8 w-8" />, title: 'After Study Roadmap', desc: 'Career advice and post-study work visa pathways planning.' },
    { icon: <HiBookOpen className="h-8 w-8" />, title: 'Part-Time Work Guide', desc: 'Information on part-time work rights and how to find student jobs.' }
  ];

  return (
    <div className="min-h-screen bg-slate-50  pb-24">
      {/* Header */}
      <div className="py-16 text-center px-6 mb-8 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-6">Our Services</h1>
        <p className="text-xl text-slate-600">
          From the day you decide to study abroad to the day you graduate and find a job, we are here to support you at every step.
        </p>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, idx) => (
          <div key={idx} className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
            <div className="w-16 h-16 bg-indigo-50 text-primary rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
              {service.icon}
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-4 group-hover:text-primary transition-colors">{service.title}</h2>
            <p className="text-slate-600 mb-6">{service.desc}</p>
            <button className="text-primary font-semibold hover:underline flex items-center gap-1">
              Learn More
            </button>
          </div>
        ))}
      </div>

      {/* CTA Box */}
      <div className="max-w-4xl mx-auto px-6 mt-20">
        <div className="bg-gradient-to-br from-slate-900 to-indigo-900 rounded-3xl p-10 md:p-16 text-center shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/30 rounded-full blur-[80px]"></div>
          <div className="relative z-10">
            <h2 className="text-3xl font-extrabold text-white mb-4">Need help deciding?</h2>
            <p className="text-indigo-100 mb-8 max-w-xl mx-auto">Our experts are available to guide you free of cost. Book a session now and clear all your doubts.</p>
            <button onClick={openModal} className="bg-white text-slate-900 hover:bg-slate-100 px-8 py-4 rounded-full font-bold shadow-lg transition-transform hover:-translate-y-1">
              Book Free Counselling
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
