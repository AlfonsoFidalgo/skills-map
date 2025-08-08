"use client";

import { FaLinkedin, FaShare } from "react-icons/fa";

interface LinkedInShareButtonProps {
  url: string;
  title?: string;
  summary?: string;
}

export default function LinkedInShareButton({
  url,
  title = "Check out this skills profile!",
  summary = "",
}: LinkedInShareButtonProps) {
  const isLocalhost = url.includes("localhost");

  const handleShare = () => {
    if (isLocalhost) {
      alert(
        "LinkedIn preview works only with public URLs. The share functionality will work properly once deployed to a public domain."
      );
    }

    const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      url
    )}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(
      summary
    )}`;
    window.open(linkedinUrl, "_blank", "width=600,height=600");
  };

  return (
    <button
      onClick={handleShare}
      className="inline-flex items-center gap-2 bg-[#0077B5] hover:bg-[#005885] text-white px-4 py-2 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#0077B5] focus:ring-offset-2"
      title="Share on LinkedIn"
    >
      <FaLinkedin className="w-4 h-4" />
      <FaShare className="w-3 h-3" />
      <span className="text-sm">Share</span>
    </button>
  );
}
