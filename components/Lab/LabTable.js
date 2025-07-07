"use client";
import React from "react";

const LabTable = ({ labs, setLabs, onEdit }) => {
  const handleDelete = (id) => {
    const updatedLabs = labs.filter((lab) => lab.id !== id);
    localStorage.setItem("labs", JSON.stringify(updatedLabs));
    setLabs(updatedLabs);
  };

  return (
    <table className="lab-table">
      <thead>
        <tr>
          <th>Lab ID</th>
          <th>Lab Name</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {labs.map((lab, index) => (
          <tr key={lab.id}>
            <td>{index + 1}</td>
            <td>{lab.labName}</td>
            <td>
              <button className="edit-btn" onClick={() => onEdit(lab)}>
                <i
                  className="ri-pencil-line"
                  style={{ marginRight: "6px" }}
                ></i>
                Edit
              </button>
              <button
                className="delete-btn"
                onClick={() => handleDelete(lab.id)}
              >
                <i
                  className="ri-delete-bin-line"
                  style={{ marginRight: "6px" }}
                ></i>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default LabTable;
