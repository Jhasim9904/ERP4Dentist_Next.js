"use client";
import React, { useState, useEffect } from 'react';
import LabTable from './LabTable';
import LabForm from './LabForm';
import './styles.css';

const Lab = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [labs, setLabs] = useState([]);
  const [editingLab, setEditingLab] = useState(null);

  useEffect(() => {
    const storedLabs = JSON.parse(localStorage.getItem('labs')) || [];
    setLabs(storedLabs);
  }, []);

  const filteredLabs = labs.filter(lab =>
    (lab.labName || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (lab) => {
    setEditingLab(lab);
    setShowForm(true);
  };

  return (
    <div className="lab-container">
      <h4 className='text-start mb-3'>Labs</h4>

      {/* Rounded Card Container for everything below the heading */}
      <div className="lab-content-box">

        <div className="lab-header">
          <div className="lab-count">Labs <span className="count-badge">{labs.length}</span></div>

          <div className="search-bar">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
            <button className="search-btn rounded">Search</button>
            <button className="clear-btn rounded" onClick={() => setSearchTerm('')}>Clear</button>
          </div>

          <button
            className="btn btn-primary create-btn sm"
            onClick={() => {
              setEditingLab(null);
              setShowForm(true);
            }}
          >
            + Create Lab
          </button>
        </div>

        <LabTable labs={filteredLabs} setLabs={setLabs} onEdit={handleEdit} />

        {/* Entry summary below the table */}
        <div className="entry-summary mt-3 text-muted">
          {filteredLabs.length > 0
            ? `Showing 1 to ${filteredLabs.length} of ${filteredLabs.length} entries`
            : 'No entries found'}
        </div>

      </div>

      {showForm && (
        <LabForm
          setShowForm={setShowForm}
          setLabs={setLabs}
          editingLab={editingLab}
        />
      )}
    </div>
  );
};

export default Lab;
