import React from 'react';
import { HiPaperAirplane, HiCalendarDays, HiBookOpen, HiAcademicCap, HiBuildingOffice2, HiDocumentText } from "react-icons/hi2";
import { useCounselling } from '@/features/counselling';
import { seoConfig, staticPageMetadata, useSeo } from "@/shared/seo";

const Services = () => {
  useSeo(staticPageMetadata("/services", seoConfig));

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
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#1F2853] mb-6">Our Services</h1>
        <p className="text-xl text-slate-600">
          From the day you decide to study abroad to the day you graduate and find a job, we are here to support you at every step.
        </p>
      </div>

      <div className="max-w-[1300px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, idx) => (
          <div key={idx} className="bg-white rounded-2xl p-8 border border-slate-200 hover:-translate-y-2 transition-all duration-300 group">
            <div className="w-16 h-16 bg-indigo-50 text-[#FF4E45] rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#FF4E45] group-hover:text-white transition-colors duration-300">
              {service.icon}
            </div>
            <h2 className="text-2xl font-bold text-[#1F2853] mb-4 group-hover:text-[#FF4E45] transition-colors">{service.title}</h2>
            <p className="text-slate-600 mb-6">{service.desc}</p>
            <button className="text-[#FF4E45] font-semibold hover:underline flex items-center gap-1">
              Learn More
            </button>
          </div>
        ))}
      </div>

      {/* CTA Box */}
      <div className="max-w-4xl mx-auto px-6 mt-20">
        <div className="bg-[#1F2853] rounded-3xl p-10 md:p-16 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF4E45]/30 rounded-full blur-[80px]"></div>
          <div className="relative z-10">
            <h2 className="text-3xl font-extrabold text-white mb-4">Need help deciding?</h2>
            <p className="text-indigo-100 mb-8 max-w-xl mx-auto">Our experts are available to guide you free of cost. Book a session now and clear all your doubts.</p>
            <button onClick={openModal} className="bg-white text-[#1F2853] hover:bg-slate-100 px-8 py-4 rounded-full font-bold transition-transform hover:-translate-y-1">
              Book Free Counselling
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
