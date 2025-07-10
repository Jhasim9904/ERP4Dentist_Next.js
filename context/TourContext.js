"use client";
import { createContext, useContext, useState } from "react";

const TourContext = createContext();

export const TourProvider = ({ children }) => {
  const [isTourActive, setIsTourActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const startTour = () => {
    setIsTourActive(true);
    setCurrentStep(0);
  };

  const endTour = () => {
    setIsTourActive(false);
    setCurrentStep(0);
  };

  return (
    <TourContext.Provider
      value={{ isTourActive, currentStep, setCurrentStep, startTour, endTour }}
    >
      {children}
    </TourContext.Provider>
  );
};

export const useTour = () => useContext(TourContext);
