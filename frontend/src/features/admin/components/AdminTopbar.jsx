import React from "react";
import { Link } from "react-router-dom";
import Logo from "@/shared/components/Logo";

const AdminTopbar = () => (
  <header className="h-[72px] shrink-0 bg-white border-b border-slate-200 flex items-center justify-between px-6">
    {/* The anchor itself is the flex item so the whole logo area is clickable,
        not just the glyphs. */}
    <Link to="/" className="flex h-full items-center">
      <Logo className="h-8" />
    </Link>
  </header>
);

export default AdminTopbar;
