import React from "react";
import "./PatientTable.css";
const PatientTable = () => {
  // const patients = [
  //   { id: 1, name: "John Doe", age: 30, treatment: "Braces" },
  //   { id: 2, name: "Jane Smith", age: 28, treatment: "Whitening" },
  //   { id: 3, name: "Alice Johnson", age: 45, treatment: "Filling" },
  //   { id: 4, name: "Bob Brown", age: 50, treatment: "Extraction" },
  // ];

  return (
    <div className="card" style={{ width: "53rem"
     }}>
      <div className="card-body">
        <h5 className="card-title">Todays Patient's</h5>
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item d-flex">
          <p className="table1">PatientID</p>
          <p className="table1">Name</p>
          <p className="table1">Age</p>
          <p className="table1">Treatments</p>
        </li>
        <li className="list-group-item d-flex striped">
          <p className="table2">PatientID</p>
          <p className="table2">Name</p>
          <p className="table2">Age</p>
          <p className="table2">Treatments</p>
        </li>
        <li className="list-group-item d-flex">
          <p className="table2">PatientID</p>
          <p className="table2">Name</p>
          <p className="table2">Age</p>
          <p className="table2">Treatments</p>
        </li>
        <li className="list-group-item d-flex striped">
          <p className="table2">PatientID</p>
          <p className="table2">Name</p>
          <p className="table2">Age</p>
          <p className="table2">Treatments</p>
        </li>
        <li className="list-group-item d-flex">
          <p className="table2">PatientID</p>
          <p className="table2">Name</p>
          <p className="table2">Age</p>
          <p className="table2">Treatments</p>
        </li>
        <li className="list-group-item d-flex striped">
          <p className="table2">PatientID</p>
          <p className="table2">Name</p>
          <p className="table2">Age</p>
          <p className="table2">Treatments</p>
        </li>
      </ul>
    </div>
  );
};

export default PatientTable;
