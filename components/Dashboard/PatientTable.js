// PatientTable.js
import React from "react";
import "./PatientTable.css";


const PatientTable = () => {
  const dummyPatients = new Array(6).fill({
  id: "PatientID",
  name: "Name",
  age: "Age",
  treatment: "Treatments",
});
  return (
    <div className="card patient-card">
      <div className="card-body">
        <h5 className="card-title">Todays Patients</h5>
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item d-flex table-header">
          <p className="table-cell header">PatientID</p>
          <p className="table-cell header">Name</p>
          <p className="table-cell header">Age</p>
          <p className="table-cell header">Treatments</p>
        </li>
        {dummyPatients.map((p, i) => (
          <li
            className={`list-group-item d-flex ${i % 2 !== 0 ? "striped" : ""}`}
            key={i}
          >
            <p className="table-cell">{p.id}</p>
            <p className="table-cell">{p.name}</p>
            <p className="table-cell">{p.age}</p>
            <p className="table-cell">{p.treatment}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PatientTable;