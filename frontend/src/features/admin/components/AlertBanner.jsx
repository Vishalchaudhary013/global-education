import React from "react";

const tones = {
  error: "bg-red-50 text-red-700 border-red-300",
  success: "bg-green-50 text-green-700 border-green-300",
};

/** Renders nothing without a message, so callers can pass state straight in. */
const AlertBanner = ({ tone = "error", message }) => {
  if (!message) return null;
  return (
    <div className={`mb-4 px-4 py-3 rounded-lg border ${tones[tone]}`}>
      {message}
    </div>
  );
};

export default AlertBanner;
