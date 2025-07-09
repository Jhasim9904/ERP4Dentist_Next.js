"use client";
import React, { useState, useEffect } from "react";
import DrugTable from "./DrugTable";
import DrugForm from "./DrugForm";
import "./DrugStyles.css";

const Drug = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [drugs, setDrugs] = useState([]);
  const [editingDrug, setEditingDrug] = useState(null);

  useEffect(() => {
    const storedDrugs = JSON.parse(localStorage.getItem("drugs")) || [];
    setDrugs(storedDrugs);
  }, []);

  const filteredDrugs = drugs.filter((drug) =>
    (drug.name || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (drug) => {
    setEditingDrug(drug);
    setShowForm(true);
  };

  return (
    <div className="drug-container">
      <h4 className="text-start mb-3">Drugs</h4>
      <div className="drug-content-box">
        <div className="drug-header">
          <div className="drug-count">
            Drugs <span className="count-badge">{drugs.length}</span>
          </div>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="search-btn rounded">Search</button>
            <button className="clear-btn rounded" onClick={() => setSearchTerm("")}>
              Clear
            </button>
          </div>
          <button
            className="btn btn-primary create-btn sm"
            onClick={() => {
              setEditingDrug(null);
              setShowForm(true);
            }}
          >
            + Create Drug
          </button>
        </div>

        <DrugTable drugs={filteredDrugs} setDrugs={setDrugs} onEdit={handleEdit} />

        <div className="entry-summary mt-3 text-muted">
          {filteredDrugs.length > 0
            ? `Showing 1 to ${filteredDrugs.length} of ${filteredDrugs.length} entries`
            : "No entries found"}
        </div>
      </div>

      {showForm && (
        <DrugForm
          setShowForm={setShowForm}
          setDrugs={setDrugs}
          editingDrug={editingDrug}
        />
      )}
    </div>
  );
};

export default Drug;
