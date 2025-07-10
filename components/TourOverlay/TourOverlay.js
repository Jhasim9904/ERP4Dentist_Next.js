"use client";
import React, { useEffect, useRef } from "react";
import { useTour } from "@/context/TourContext";
import styles from "./TourOverlay.module.css";

const steps = [
  {
    id: "sidebar-doctor",
    title: "Doctors",
    desc: "Manage clinic doctors and their details.",
  },
  {
    id: "add-appointment",
    title: "Add Appointment",
    desc: "Create appointments for patients from here.",
  },
  {
    id: "sidebar-calendar",
    title: "Calendar",
    desc: "Track appointments visually in calendar.",
  },
  {
    id: "sidebar-appointments",
    title: "Appointments",
    desc: "View all patient appointments in one place.",
  },
  {
    id: "sidebar-lab",
    title: "Lab",
    desc: "Manage patient lab work requests here.",
  },
  {
    id: "sidebar-drug",
    title: "Drug",
    desc: "Prescribe and manage medication lists.",
  },
  {
    id: "notification-icon",
    title: "Notifications",
    desc: "System alerts and reminders show up here.",
  },
];

const TourOverlay = () => {
  const { isTourActive, currentStep, setCurrentStep, endTour } = useTour();
  const tooltipRef = useRef(null);

  useEffect(() => {
    if (!isTourActive) return;

    const target = document.getElementById(steps[currentStep]?.id);
    if (!target || !tooltipRef.current) return;

    const rect = target.getBoundingClientRect();
    const tooltip = tooltipRef.current;

    tooltip.style.top = `${rect.top + window.scrollY + rect.height / 2}px`;
    tooltip.style.left = `${rect.left + rect.width + 20}px`;

    // Scroll into view
    target.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [currentStep, isTourActive]);

  if (!isTourActive) return null;

  const step = steps[currentStep];

  return (
    <>
      <div className={styles.overlay}></div>

      <div ref={tooltipRef} className={styles.tooltip}>
        <button className={styles.closeBtn} onClick={endTour}>
          ×
        </button>
        <h4>{step.title}</h4>
        <p>{step.desc}</p>

        <div className={styles.dots}>
          {steps.map((_, i) => (
            <span
              key={i}
              className={`${styles.dot} ${
                i === currentStep ? styles.active : ""
              }`}
            ></span>
          ))}
        </div>

        <div className={styles.navButtons}>
          <button
            onClick={() => setCurrentStep((p) => Math.max(0, p - 1))}
            disabled={currentStep === 0}
          >
            ◀
          </button>
          <button
            onClick={() => {
              if (currentStep === steps.length - 1) endTour();
              else setCurrentStep((p) => p + 1);
            }}
          >
            {currentStep === steps.length - 1 ? "Finish" : "▶"}
          </button>
        </div>
      </div>
    </>
  );
};

export default TourOverlay;
