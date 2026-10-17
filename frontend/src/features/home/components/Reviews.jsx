import React from "react";
import { HiStar } from "react-icons/hi2";

const Reviews = () => (
  <div className="py-24 bg-white relative">
    <div className="max-w-[1400px] mx-auto px-6">
      <h2 className="text-4xl font-extrabold text-center text-[#1F2853] mb-16">
        What Our Students Say
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            name: "Sarah Jenkins",
            uni: "University of Toronto, Canada",
            text: "GlobalEdu made my dream of studying in Canada a reality. Their visa guidance was absolutely flawless!",
          },
          {
            name: "Rahul Sharma",
            uni: "University of Melbourne, Australia",
            text: "From shortlisting universities to my offer letter, the team was with me every step. Highly recommended!",
          },
          {
            name: "Amira Hassan",
            uni: "University of Edinburgh, UK",
            text: "The scholarship guidance helped me secure a partial scholarship worth £6,000. Truly life-changing!",
          },
          {
            name: "James Park",
            uni: "TU Munich, Germany",
            text: "I had no idea Germany offered free education. GlobalEdu opened that door for me. Best decision ever!",
          },
        ].map((item) => (
          <div
            key={item.name}
            className="bg-slate-50 rounded-2xl p-8 border border-slate-100 transition-all duration-300"
          >
            <div className="flex gap-1 text-amber-400 mb-4">
              <HiStar className="fill-current w-5 h-5" />
              <HiStar className="fill-current w-5 h-5" />
              <HiStar className="fill-current w-5 h-5" />
              <HiStar className="fill-current w-5 h-5" />
              <HiStar className="fill-current w-5 h-5" />
            </div>
            <p className="text-slate-600 mb-6 italic hover:text-[#1F2853] transition-colors">
              &ldquo;{item.text}&rdquo;
            </p>
            <div className="flex items-center gap-4">
              <img
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(item.name)}&background=random`}
                alt={item.name}
                className="w-12 h-12 rounded-full ring-2 ring-primary/20"
              />
              <div>
                <h4 className="font-bold text-[#1F2853]">{item.name}</h4>
                <p className="text-xs text-slate-500">{item.uni}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default Reviews;
