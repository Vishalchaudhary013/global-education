import React, { useRef, useState } from "react";
import { HiArrowUpTray, HiLink, HiXMark } from "react-icons/hi2";
import { getApiErrorMessage } from "@/shared/utils/apiError";
import { uploadImage } from "@/shared/services/uploadService";
import { TextInput, labelClass } from "./formFields";

const MODES = [
  { id: "upload", label: "Upload file", icon: HiArrowUpTray },
  { id: "link", label: "From link", icon: HiLink },
];

/**
 * One image slot with the two ways of filling it: uploading a file from this
 * machine, or pasting a link. Both end up as a URL string in `value`, so the
 * stored field looks the same either way.
 */
const ImageField = ({ label, hint, value, onChange, className = "" }) => {
  const inputRef = useRef(null);
  const [mode, setMode] = useState("upload");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const handleFile = async (file) => {
    if (!file) return;
    setUploadError("");
    setIsUploading(true);
    try {
      const { url } = await uploadImage(file);
      onChange(url);
    } catch (error) {
      setUploadError(getApiErrorMessage(error));
    } finally {
      setIsUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <label className={labelClass}>
          {label}
          {hint && <span className="text-gray-400 font-normal"> ({hint})</span>}
        </label>
      )}

      <div className="flex gap-2">
        {MODES.map((option) => {
          const Icon = option.icon;
          const isActive = mode === option.id;
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => setMode(option.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-sm border text-xs font-semibold transition-colors ${isActive
                ? "bg-[#1F2853] border-[#1F2853] text-white"
                : "bg-white border-gray-200 text-gray-600 hover:border-gray-400"
                }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {option.label}
            </button>
          );
        })}
      </div>

      {mode === "upload" ? (
        <div className="flex items-center gap-3">
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={(e) => handleFile(e.target.files?.[0])}
            className="block w-full text-sm text-gray-600 file:mr-3 file:rounded-sm file:border file:border-gray-200 file:bg-gray-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-gray-700 hover:file:bg-gray-100 file:cursor-pointer border border-gray-200 rounded-sm bg-gray-50 p-1.5"
          />
          {isUploading && (
            <span className="text-xs font-semibold text-gray-500 whitespace-nowrap">
              Uploading…
            </span>
          )}
        </div>
      ) : (
        <TextInput
          placeholder="https://..."
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
        />
      )}

      {uploadError && <p className="text-xs text-red-600">{uploadError}</p>}

      {value && (
        <div className="flex items-center gap-3 border border-gray-200 rounded-sm p-2 bg-gray-50">
          <img
            src={value}
            alt=""
            className="w-14 h-14 object-cover rounded-sm border border-gray-200 bg-white"
            onError={(e) => {
              e.currentTarget.style.visibility = "hidden";
            }}
          />
          <span className="flex-1 text-xs text-gray-500 break-all line-clamp-2">{value}</span>
          <button
            type="button"
            onClick={() => onChange("")}
            aria-label="Clear image"
            className="p-1.5 rounded-sm border border-gray-200 text-gray-400 hover:text-red-600 hover:border-red-200 transition-colors"
          >
            <HiXMark className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageField;
