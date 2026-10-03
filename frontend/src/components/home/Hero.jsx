import React from "react";
import { HiChevronRight, HiCheckCircle } from "react-icons/hi2";

const heroImage = "https://images.pexels.com/photos/207691/pexels-photo-207691.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";

const Hero = ({ openModal }) => (
  <div className="relative pt-10 pb-10 lg:pt-25 lg:pb-40 overflow-hidden bg-[#1F2853]">
    <div className="absolute inset-0 z-0">
      <img
        src={heroImage}
        alt="University Campus"
        className="absolute inset-0 w-full h-full object-cover opacity-50"
      />
      <div className="absolute inset-0 bg-white/40 "></div>
    </div>

    <div className="max-w-[1400px] mx-auto px-6 relative z-10">
      <div className="max-w-3xl">
        <span className="inline-block py-1 px-3 rounded-full bg-[#FF4E45]/10 text-[#FF4E45] border border-[#FF4E45]/30 text-sm font-semibold mb-6 tracking-wide">
          DISCOVER YOUR POTENTIAL
        </span>
        <h1 className="text-3xl sm:text-5xl lg:text-7xl font-extrabold text-[#1F2853] mb-8 leading-tight tracking-tight">
          Study Abroad with{" "}
          <span className="text-[#FF4E45]">
            Global Education
          </span>{" "}
          and Career
        </h1>
        <p className="text-xl text-[#1F2853]/80 mb-10 leading-relaxed max-w-2xl font-medium">
          Explore top universities, scholarships, and career opportunities
          around the world. Your journey to global success starts here.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={openModal}
            className="bg-[#FF4E45] hover:bg-[#E03A30] text-white px-8 py-4 rounded-full font-bold shadow-lg shadow-[#FF4E45]/30 hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
          >
            Book Free Counselling <HiChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-4 sm:gap-8 text-sm font-bold text-[#1F2853]">
          <div className="flex items-center gap-2">
            <HiCheckCircle className="h-5 w-5 text-[#FF4E45]" /> 100% Free
            Guidance
          </div>
          <div className="flex items-center gap-2">
            <HiCheckCircle className="h-5 w-5 text-[#FF4E45]" /> 500+ Top
            Universities
          </div>
          <div className="flex items-center gap-2">
            <HiCheckCircle className="h-5 w-5 text-[#FF4E45]" /> Fast Visa
            Processing
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Hero;
