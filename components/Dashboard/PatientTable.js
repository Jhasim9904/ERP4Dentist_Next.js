"use client";
import React from "react";
import "./PatientTable.css";

// Accepts appointments as props
const PatientTable = ({ appointments = [] }) => {
  return (
    <div className="card patient-card">
      <div className="card-body">
        <h5 className="card-title">Today's Patients</h5>
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item d-flex table-header">
          <p className="table-cell header">PatientID</p>
          <p className="table-cell header">Name</p>
          <p className="table-cell header">Age</p>
          <p className="table-cell header">Treatments</p>
        </li>

        {appointments.length === 0 ? (
          <li className="list-group-item d-flex">
            <p className="table-cell">No patients today</p>
          </li>
        ) : (
          appointments.map((p, i) => (
            <li
              className={`list-group-item d-flex ${i % 2 !== 0 ? "striped" : ""}`}
              key={p.id}
            >
              <p className="table-cell">{p.id}</p>
              <p className="table-cell">{`${p.firstname} ${p.lastname}`}</p>
              <p className="table-cell">{p.age}</p>
              <p className="table-cell">{p.reason_appointment}</p>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default PatientTable;
