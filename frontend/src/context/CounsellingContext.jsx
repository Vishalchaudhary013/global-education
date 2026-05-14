import React, { createContext, useState, useContext } from 'react';

const CounsellingContext = createContext();

export const useCounselling = () => useContext(CounsellingContext);

export const CounsellingProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <CounsellingContext.Provider value={{ isModalOpen, openModal, closeModal }}>
      {children}
    </CounsellingContext.Provider>
  );
};
