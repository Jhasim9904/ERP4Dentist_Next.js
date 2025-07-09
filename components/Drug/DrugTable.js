"use client";
import React from "react";
import "./DrugStyles.css";

const DrugTable = ({ drugs, setDrugs, onEdit }) => {
  const handleDelete = (id) => {
    const updated = drugs.filter((d) => d.id !== id);
    localStorage.setItem("drugs", JSON.stringify(updated));
    setDrugs(updated);
  };

  return (
    <table className="drug-table">
      <thead>
        <tr>
          <th>Drug Name</th>
          <th>Drug Type</th>
          <th>Strength</th>
          <th>Instructions</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {drugs.map((drug) => (
          <tr key={drug.id}>
            <td>{drug.name}</td>
            <td>{drug.type}</td>
            <td>{drug.strength}</td>
            <td>{drug.instructions}</td>
            <td>
              <button className="edit-btn" onClick={() => onEdit(drug)}>Edit</button>
              <button className="delete-btn" onClick={() => handleDelete(drug.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DrugTable;
