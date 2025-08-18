"use client";

import { useOpenModal } from "@/contexts/open-modal-context";

export default function ToggleModalButton() {
  const { isModalOpen, setIsModalOpen } = useOpenModal();

  const handleToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <button
      onClick={handleToggle}
      className="inline-flex items-center justify-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-700 hover:text-blue-800 px-4 py-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
    >
      <span className="text-sm">Complete Profile</span>
    </button>
  );
}
