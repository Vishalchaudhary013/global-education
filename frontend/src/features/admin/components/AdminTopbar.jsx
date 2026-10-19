import React from "react";
import { Link } from "react-router-dom";

const AdminTopbar = () => (
  <header className="h-[72px] shrink-0 bg-white border-b border-slate-200 flex items-center justify-between px-6">
    {/* The anchor itself is the flex item so the whole logo area is clickable,
        not just the glyphs. */}
    <Link
      to="/"
      className="flex h-full items-center text-lg font-bold tracking-tight text-[#1F2853] "
    >
      GlobalEdu<sup className="text-md font-semibold align-super">®</sup>
    </Link>
  </header>
);

export default AdminTopbar;
