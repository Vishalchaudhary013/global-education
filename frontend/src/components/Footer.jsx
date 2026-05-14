import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  HiAcademicCap,
  HiMapPin,
  HiPhone,
  HiEnvelope,
  HiChevronRight,
  HiPaperAirplane,
  HiUsers,
} from "react-icons/hi2";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa6";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-300">
      {/* Top CTA Banner */}
      

      {/* Main Footer */}
      <div className="max-w-[1400px] mx-auto px-6 pt-16 pb-10">
        {/* Row 1: Brand + Contact + Newsletter */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-12 border-b border-slate-800">
          {/* Brand */}
          <div className="space-y-5">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <HiAcademicCap className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight">
                Global<span className="text-primary">Edu</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              Your trusted partner for studying abroad. We connect ambitious
              students with world-class universities, scholarships, and
              life-changing opportunities around the globe.
            </p>
            <div>
              <p className="text-white font-semibold text-sm mb-3">Follow Us</p>
              <div className="flex gap-3">
                {[
                  { icon: FaFacebookF, label: "Facebook" },
                  { icon: FaTwitter, label: "Twitter" },
                  { icon: FaLinkedinIn, label: "LinkedIn" },
                  { icon: FaInstagram, label: "Instagram" },
                  { icon: FaYoutube, label: "YouTube" },
                ].map(({ icon: Icon, label }) => (
                  <a
                    key={label}
                    href="#"
                    aria-label={label}
                    className="h-9 w-9 bg-slate-800 hover:bg-primary rounded-lg flex items-center justify-center transition-colors"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-5 flex items-center gap-2">
              <HiUsers className="h-4 w-4 text-primary" /> Contact Us
            </h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <HiMapPin className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span className="text-slate-400">
                  123 Education Lane, Global City, GC 10001
                </span>
              </li>
              <li className="flex items-center gap-3">
                <HiPhone className="h-4 w-4 text-primary shrink-0" />
                <a
                  href="tel:+11234567890"
                  className="text-slate-400 hover:text-primary transition-colors"
                >
                  +1 (123) 456-7890
                </a>
              </li>
              <li className="flex items-center gap-3">
                <HiEnvelope className="h-4 w-4 text-primary shrink-0" />
                <a
                  href="mailto:info@globaledu.com"
                  className="text-slate-400 hover:text-primary transition-colors"
                >
                  info@globaledu.com
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-bold mb-3 flex items-center gap-2">
              <HiPaperAirplane className="h-4 w-4 text-primary" /> Newsletter
            </h4>
            <p className="text-slate-400 text-sm mb-4">
              Get scholarship alerts &amp; study abroad tips in your inbox.
            </p>
            {subscribed ? (
              <div className="bg-emerald-900/40 border border-emerald-700 text-emerald-400 text-sm rounded-xl px-4 py-3 font-semibold">
                You are subscribed! Thanks.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address..."
                  required
                  className="flex-1 min-w-0 bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-primary"
                />
                <button
                  type="submit"
                  className="bg-primary hover:bg-indigo-500 text-white p-2.5 rounded-xl transition-colors shrink-0"
                >
                  <HiPaperAirplane className="h-4 w-4" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Row 2: 5 Link Columns */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 pt-12">
          {/* Study Abroad */}
          <div>
            <h4 className="text-white font-bold mb-5 uppercase tracking-wider text-sm">
              Study Abroad
            </h4>
            <ul className="space-y-3 text-sm">
              {[
                { to: "/destinations/uk", label: "Study in UK" },
                { to: "/destinations/usa", label: "Study in USA" },
                { to: "/destinations/canada", label: "Study in Canada" },
                { to: "/destinations/australia", label: "Study in Australia" },
                { to: "/destinations/germany", label: "Study in Germany" },
                {
                  to: "/destinations/newzealand",
                  label: "Study in New Zealand",
                },
                { to: "/destinations/dubai", label: "Study in Dubai" },
                { to: "/destinations/singapore", label: "Study in Singapore" },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="flex items-center gap-1.5 text-slate-400 hover:text-primary transition-colors group"
                  >
                    <HiChevronRight className="h-3 w-3 text-slate-600 group-hover:text-primary shrink-0" />{" "}
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Services */}
          <div>
            <h4 className="text-white font-bold mb-5 uppercase tracking-wider text-sm">
              Our Services
            </h4>
            <ul className="space-y-3 text-sm">
              {[
                "Free Counselling",
                "University Shortlisting",
                "Application Assistance",
                "Visa Guidance",
                "SOP & LOR Help",
                "Pre-Departure Briefing",
                "Loan Assistance",
                "Accommodation Help",
              ].map((label) => (
                <li key={label}>
                  <Link
                    to="/services"
                    className="flex items-center gap-1.5 text-slate-400 hover:text-primary transition-colors group"
                  >
                    <HiChevronRight className="h-3 w-3 text-slate-600 group-hover:text-primary shrink-0" />{" "}
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Scholarships */}
          <div>
            <h4 className="text-white font-bold mb-5 uppercase tracking-wider text-sm">
              Scholarships
            </h4>
            <ul className="space-y-3 text-sm">
              {[
                { to: "/scholarships/1", label: "Chevening Scholarship" },
                { to: "/scholarships/2", label: "Fulbright Program" },
                { to: "/scholarships/3", label: "Endeavour Award" },
                { to: "/scholarships/4", label: "Vanier Canada" },
                { to: "/scholarships/5", label: "DAAD Scholarship" },
                { to: "/scholarships/6", label: "Commonwealth Scholarship" },
                { to: "/scholarships", label: "View All Scholarships" },
              ].map(({ to, label }) => (
                <li key={label}>
                  <Link
                    to={to}
                    className="flex items-center gap-1.5 text-slate-400 hover:text-primary transition-colors group"
                  >
                    <HiChevronRight className="h-3 w-3 text-slate-600 group-hover:text-primary shrink-0" />{" "}
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Test Preparation */}
          <div>
            <h4 className="text-white font-bold mb-5 uppercase tracking-wider text-sm">
              Test Preparation
            </h4>
            <ul className="space-y-3 text-sm">
              {[
                "IELTS",
                "TOEFL",
                "GRE",
                "GMAT",
                "SAT",
                "PTE Academic",
                "Duolingo English",
                "Cambridge English",
              ].map((label) => (
                <li key={label}>
                  <Link
                    to="/exams"
                    className="flex items-center gap-1.5 text-slate-400 hover:text-primary transition-colors group"
                  >
                    <HiChevronRight className="h-3 w-3 text-slate-600 group-hover:text-primary shrink-0" />{" "}
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About Us */}
          <div>
            <h4 className="text-white font-bold mb-5 uppercase tracking-wider text-sm">
              About Us
            </h4>
            <ul className="space-y-3 text-sm">
              {[
                { to: "/", label: "Who We Are" },
                { to: "/", label: "Our Story" },
                { to: "/", label: "Our Team" },
                { to: "/events", label: "Events & Webinars" },
                { to: "/", label: "Careers" },
                { to: "/", label: "Blog & Articles" },
                { to: "/", label: "Contact Us" },
                { to: "/privacy", label: "Privacy Policy" },
              ].map(({ to, label }) => (
                <li key={label}>
                  <Link
                    to={to}
                    className="flex items-center gap-1.5 text-slate-400 hover:text-primary transition-colors group"
                  >
                    <HiChevronRight className="h-3 w-3 text-slate-600 group-hover:text-primary shrink-0" />{" "}
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="max-w-[1400px] mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            &copy; {new Date().getFullYear()} Global Education and Career. All
            rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <Link
              to="/privacy"
              className="hover:text-primary transition-colors"
            >
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <Link
              to="/sitemap"
              className="hover:text-primary transition-colors"
            >
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
