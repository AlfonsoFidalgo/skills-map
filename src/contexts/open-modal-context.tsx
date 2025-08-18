"use client";

import { createContext, useState, useContext } from "react";

const OpenModalContext = createContext<{
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}>({
  isModalOpen: false,
  setIsModalOpen: () => {},
});

export const OpenModalProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <OpenModalContext.Provider value={{ isModalOpen, setIsModalOpen }}>
      {children}
    </OpenModalContext.Provider>
  );
};

export const useOpenModal = () => {
  return useContext(OpenModalContext);
};
