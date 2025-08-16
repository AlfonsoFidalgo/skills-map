"use client";

import { useState } from "react";
import { FaCopy, FaCheck } from "react-icons/fa";

export default function CopyUrlButton() {
  const [copied, setCopied] = useState(false);

  const handleCopyUrl = async () => {
    try {
      const url = window.location.href;
      await navigator.clipboard.writeText(url);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy URL:", err);
    }
  };

  return (
    <button
      onClick={handleCopyUrl}
      className="inline-flex items-center justify-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2 min-w-[130px] max-w-[130px]"
    >
      {copied ? (
        <>
          <FaCheck className="w-4 h-4" />
          <span className="text-sm">Copied!</span>
        </>
      ) : (
        <>
          <FaCopy className="w-4 h-4" />
          <span className="text-sm">Copy URL</span>
        </>
      )}
    </button>
  );
}
