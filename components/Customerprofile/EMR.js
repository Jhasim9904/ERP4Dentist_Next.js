import React, { useState } from "react";
import "./EMR.css";
import Examination from "./EMR components/Examination";
import Observation from "./EMR components/Observation";
import Treatment from "./EMR components/Treatment";
import Clinicalnotes from "./EMR components/Clinicalnotes";
import Prescriptions from "./EMR components/Prescriptions";
import LabWorks from "./EMR components/LabWorks";
import Uploads from "./EMR components/Uploads";
import Billing from "./EMR components/Billing/Billing";
import InvoiceView from "./EMR components/InvoiceView/InvoiceView";
const tabs = [
  { id: "examination", label: "Examination", icon: "🩺" },
  { id: "observation", label: "Observation", icon: "🔬" },
  { id: "treatment", label: "Treatment", icon: "🩹" },
  { id: "clinical-notes", label: "Clinical Notes", icon: "📋" },
  { id: "prescriptions", label: "Prescriptions", icon: "📝" },
  { id: "lab-works", label: "Lab Works", icon: "🔬" },
  { id: "uploads", label: "Uploads", icon: "⬆️" },
  { id: "billing", label: "Billing", icon: "🧾" },
  { id: "invoice", label: "Invoice", icon: "📄" },
];

const EMR = ({ activeTab, setActiveTab, handleBookClick }) => {
  const [activeTab1, setActiveTab1] = useState("examination");
  return (
    <div>
      <div className="card" style={{ width: "78rem", minHeight: "100vh" }}>
        <div className="card-body">
          <div className="heading d-flex justify-content-between">
            <div className="d-flex">
              {["History", "Patient", "EMR"].map((tab) => (
                <div className="mx-2" key={tab}>
                  <button
                    className={`tab-button ${
                      activeTab === tab ? "active-tab" : ""
                    }`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                </div>
              ))}
            </div>
            <div>
              <button className="btn btn-primary" onClick={handleBookClick}>
                Book Appointment for check
              </button>
            </div>
          </div>

          {/* Patient Form Content */}
          <div className="top-tabs" style={{ marginLeft: "60px" }}>
            {tabs.map((tab) => (
              <div
                key={tab.id}
                className={`tab-item ${activeTab1 === tab.id ? "active" : ""}`}
                onClick={() => setActiveTab1(tab.id)}
                style={{ margin: "0px 5px" }}
              >
                <div className="tab-icon">{tab.icon}</div>
                <div className="tab-label">{tab.label}</div>
              </div>
            ))}
          </div>
          {activeTab1 === "examination" && <Examination />}
          {activeTab1 === "observation" && <Observation />}
          {activeTab1 === "treatment" && <Treatment />}
          {activeTab1 === "clinical-notes" && <Clinicalnotes />}
          {activeTab1 === "prescriptions" && <Prescriptions />}
          {activeTab1 === "lab-works" && <LabWorks />}
          {activeTab1 === "uploads" && <Uploads />}
          {activeTab1 === "billing" && <Billing />}
          {activeTab1 === "invoice" && <InvoiceView />}

        </div>
      </div>
    </div>
  );
};

export default EMR;
