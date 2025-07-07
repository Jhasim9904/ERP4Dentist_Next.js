import React, { useState } from "react";
import "./Container.css";
import Patient from "./Patient";
import Card from "./Card";
import EMR from "./EMR";
import BookAppointmentModal from "./BookAppointmentModal"; // Import modal component

const Container = ({ activeTab, setActiveTab }) => {
  const [bookModalOpen, setBookModalOpen] = useState(false); // State to control modal

  const handleBookClick = () => {
    setBookModalOpen(true);
  };

  return (
    <div>
      {activeTab === "History" && (
        <div className="card" style={{ width: "78rem", height: "30rem" }}>
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
                      {tab}
                    </button>
                  </div>
                ))}
              </div>

              <button className="btn btn-primary" onClick={handleBookClick}>
                Book Appointment for check
              </button>
            </div>

            <Card />
          </div>
        </div>
      )}

      {activeTab === "Patient" && (
        <Patient activeTab={activeTab} setActiveTab={setActiveTab} handleBookClick={handleBookClick}/>
      )}

      {activeTab === "EMR" && (
        <EMR activeTab={activeTab} setActiveTab={setActiveTab} handleBookClick={handleBookClick}/>
      )}

      {bookModalOpen && (
        <BookAppointmentModal onClose={() => setBookModalOpen(false)} />
      )}
    </div>
  );
};

export default Container;
