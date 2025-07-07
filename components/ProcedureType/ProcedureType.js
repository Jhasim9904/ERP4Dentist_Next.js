// ProcedureType.jsx
import React, { useState, useEffect } from "react";
import ProcedureTable from "./ProcedureTable";
import ProcedureForm from "./ProcedureForm";
import "./Procedure.css";
import Swal from "sweetalert2";

const ProcedureType = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [procedures, setProcedures] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("procedures")) || [];
    setProcedures(stored);
  }, []);

  const filtered = procedures.filter((p) =>
    (p.name || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSaveAll = () => {
    localStorage.setItem("procedures", JSON.stringify(procedures));

    Swal.fire({
      icon: "success",
      title: "Success!",
      text: "Prices updated successfully.",
      confirmButtonColor: "#a855f7",
      confirmButtonText: "OK",
    });
  };

  const handleDelete = (id) => {
    const updated = procedures.filter((p) => p.id !== id);
    setProcedures(updated);
    localStorage.setItem("procedures", JSON.stringify(updated));
  };

  return (
    <div className="procedure-container">
      <h4 className="text-start mb-3">Procedure Type</h4>

      <div className="procedure-table-box">
        <div className="procedure-header">
          <div className="procedure-count-label">
            Procedure Type{" "}
            <span className="procedure-count-badge">{procedures.length}</span>
          </div>

          <div className="procedure-search-bar">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="procedure-search-btn rounded">Search</button>
            <button
              className="procedure-clear-btn rounded"
              onClick={() => setSearchTerm("")}
            >
              Clear
            </button>
          </div>

          <button
            className="procedure-create-btn"
            onClick={() => setShowForm(true)}
          >
            + Create Procedure
          </button>
        </div>

        <ProcedureTable
          procedures={filtered}
          setProcedures={setProcedures}
          onDelete={handleDelete}
        />

        <div className="procedure-entry-summary mt-3 text-muted">
          {filtered.length
            ? `Showing 1 to ${filtered.length} of ${filtered.length} Entries`
            : "No entries found"}
        </div>

        <div className="d-flex justify-content-end mt-3">
          <button className="procedure-save-btn" onClick={handleSaveAll}>
            Save All
          </button>
        </div>
      </div>

      {showForm && (
        <ProcedureForm
          setProcedures={setProcedures}
          procedures={procedures}
          setShowForm={setShowForm}
        />
      )}
    </div>
  );
};

export default ProcedureType;
