import React from "react";
import { Link } from "react-router-dom";
import Logo from "@/shared/components/Logo";

/**
 * Split-screen shell for the auth pages: brand panel on the left,
 * form column on the right. The brand panel is hidden on small screens.
 */
const AuthLayout = ({ heading, subheading, title, children, footer }) => {
  return (
    <div className="h-screen flex bg-white overflow-hidden">
      {/* Brand panel */}
      <div className="hidden lg:flex lg:w-1/2 shrink-0 bg-[#1F2853] flex-col p-12 xl:p-16 overflow-hidden">
        <Link to="/" className="flex items-center w-fit">
          <Logo className="h-9" />
        </Link>

        <div className="flex-grow flex flex-col justify-center max-w-lg">
          <h2 className="text-4xl xl:text-5xl font-bold text-white leading-tight">
            {heading}
          </h2>
          <p className="mt-6 text-base text-slate-300 leading-relaxed">
            {subheading}
          </p>
        </div>
      </div>

      {/* Form panel */}
      <div className="w-full lg:w-1/2 overflow-y-auto">
        <div className="min-h-full flex flex-col px-6 py-10 sm:px-10">
          <Link to="/" className="flex items-center w-fit lg:hidden mb-10">
            <Logo className="h-8" />
          </Link>

          <div className="flex-grow flex flex-col justify-center">
            <div className="w-full max-w-md mx-auto">
              <h1 className="text-2xl sm:text-3xl font-bold text-[#1F2853] text-center mb-8">
                {title}
              </h1>

              {children}

              {footer && (
                <div className="mt-8 text-center text-sm text-slate-600">
                  {footer}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
