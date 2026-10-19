import React from "react";
import { Link } from "react-router-dom";

const AdminTopbar = () => (
  <header className="h-[72px] shrink-0 bg-white border-b border-slate-200 flex items-center justify-between px-6">
    <span className="text-2xl font-bold tracking-tight text-[#1F2853]">
      <Link to="/">edeco<sup className="text-xs font-semibold align-super">®</sup></Link>
    </span>
  </header>
);

export default AdminTopbar;
