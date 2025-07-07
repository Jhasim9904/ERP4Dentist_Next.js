// ProcedureTable.jsx
import React, { useState, useEffect } from 'react';

const ProcedureTable = ({ procedures, setProcedures, onDelete }) => {
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    const updated = procedures.map(p => ({
      ...p,
      isChecked: selectAll,
    }));
    setProcedures(updated);
  }, [selectAll]);

  const handleRowCheck = (id) => {
    const updated = procedures.map(p =>
      p.id === id ? { ...p, isChecked: !p.isChecked } : p
    );
    setProcedures(updated);

    const allSelected = updated.every(p => p.isChecked);
    setSelectAll(allSelected);
  };

  const handlePriceChange = (id, newPrice) => {
    const updated = procedures.map(p =>
      p.id === id ? { ...p, price: newPrice } : p
    );
    setProcedures(updated);
  };

  return (
    <table className="procedure-table">
      <thead>
        <tr>
          <th>
            <input
              type="checkbox"
              checked={selectAll}
              onChange={() => setSelectAll(!selectAll)}
            />
          </th>
          <th>Procedure Name</th>
          <th>Procedure Type</th>
          <th>Price</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {procedures.map((p) => (
          <tr key={p.id}>
            <td>
              <input
                type="checkbox"
                checked={p.isChecked || false}
                onChange={() => handleRowCheck(p.id)}
              />
            </td>
            <td>{p.name}</td>
            <td>{p.type}</td>
            <td>
              <input
                type="number"
                value={p.price}
                onChange={(e) => handlePriceChange(p.id, e.target.value)}
                className="procedure-price-input"
              />
            </td>
            <td>
              <button
                className="procedure-delete-btn"
                onClick={() => onDelete(p.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProcedureTable;
