import React from "react";
import logo from "@/assets/logo-trimmed.png";

/**
 * The edeco wordmark, used everywhere the brand appears.
 *
 * `logo-trimmed.png` is `logo.png` with its transparent margin cropped off, so
 * the height you set is the height of the lettering itself. Size it by height
 * only (`h-8`, `h-9`…); width follows from the 474×125 aspect ratio, which the
 * width/height attributes also give the browser to reserve space before load.
 */
const Logo = ({ className = "h-6" }) => (
  <img
    src={logo}
    alt="edeco"
    width="478"
    height="129"
    decoding="async"
    className={`w-auto select-none ${className}`}
    draggable="false"
  />
);

export default Logo;
