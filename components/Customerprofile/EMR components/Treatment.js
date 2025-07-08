import React, { useState } from "react";
import "./Treatment.css";
import AddNoteModal from "@/components/PopupModals/AddNoteModal/AddNoteModal";
import AddLabWorkModal from "@/components/PopupModals/AddLabWorkModal/AddLabWorkModal";

const Treatment = () => {
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [showLabWorkModal, setShowLabWorkModal] = useState(false);
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);

  const [treatmentPlans, setTreatmentPlans] = useState([
    {
      planNo: 1,
      planDate: "2025-04-17",
      doctor: "sabari",
      color: "#556B2F",
      teeth: "18,17,16,42,",
      procedure: "Braces Consulting",
      type: "Adjustment",
      cost: 700,
      discount: 100,
      treatmentCost: 700,
      invoicedAmount: 560,
      balanceAmount: 240,
    },
    {
      planNo: 2,
      planDate: "2025-04-18",
      doctor: "giri",
      color: "#FF6600",
      teeth: "11,21",
      procedure: "Cavity Filling",
      type: "Restoration",
      cost: 1200,
      discount: 200,
      treatmentCost: 1200,
      invoicedAmount: 800,
      balanceAmount: 400,
    },
  ]);

  const totalEstimated = treatmentPlans.reduce((sum, t) => sum + t.treatmentCost, 0);
  const totalConfirmed = treatmentPlans.reduce((sum, t) => sum + t.treatmentCost, 0); // Adjust if logic changes

  const toggleDropdown = (index) => {
    setOpenDropdownIndex(openDropdownIndex === index ? null : index);
  };

  const handleAddNote = (planNo) => {
    console.log(`Add Note for Plan No: ${planNo}`);
    setShowNoteModal(true);
    setOpenDropdownIndex(null);
  };

  const handleAddLabWork = (planNo) => {
    console.log(`Add Lab Work for Plan No: ${planNo}`);
    setShowLabWorkModal(true);
    setOpenDropdownIndex(null);
  };

  const handleDelete = (planNo) => {
    if (window.confirm(`Are you sure you want to delete Plan No: ${planNo}?`)) {
      setTreatmentPlans(treatmentPlans.filter((plan) => plan.planNo !== planNo));
    }
    setOpenDropdownIndex(null);
  };

  return (
    <div className="treatment-container">
      <h2 className="treatment-header">Treatment</h2>

      <div className="treatment-summary">
        <span>Total Estimated Plan Amount: ₹ {totalEstimated}</span>
        <span>Total Confirmed Plan Amount: ₹ {totalConfirmed}</span>
      </div>

      <table className="treatment-table">
        <thead>
          <tr>
            <th>Plan No</th>
            <th>Plan Date</th>
            <th>Dr</th>
            <th>Tooth Number</th>
            <th>Procedure</th>
            <th>Type</th>
            <th>Cost</th>
            <th>Discount</th>
            <th>Treatment Cost</th>
            <th>Invoiced Amount</th>
            <th>Balance Amount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {treatmentPlans.map((plan, index) => (
            <tr key={index}>
              <td>{plan.planNo}</td>
              <td>{plan.planDate}</td>
              <td>
                <div className="doctor-badge">
                  <span
                    className="doctor-color"
                    style={{ backgroundColor: plan.color }}
                  ></span>
                  {plan.doctor}
                </div>
              </td>
              <td>{plan.teeth}</td>
              <td>{plan.procedure}</td>
              <td>{plan.type}</td>
              <td>₹ {plan.cost}</td>
              <td>₹ {plan.discount}</td>
              <td>₹ {plan.treatmentCost}</td>
              <td>₹ {plan.invoicedAmount}</td>
              <td>₹ {plan.balanceAmount}</td>
              <td className="action-cell">
                <span onClick={() => toggleDropdown(index)} className="action-dots">⋮</span>
                {openDropdownIndex === index && (
                  <div className="action-dropdown">
                    <div className="dropdown-item" onClick={() => handleAddNote(plan.planNo)}>
                      <span className="dropdown-icon"></span> Add Note
                    </div>
                    <div className="dropdown-item" onClick={() => handleAddLabWork(plan.planNo)}>
                      <span className="dropdown-icon"></span> Add Lab Work
                    </div>
                    <div className="dropdown-item" onClick={() => handleDelete(plan.planNo)}>
                      <span className="dropdown-icon"></span> Delete
                    </div>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modals */}
      {showNoteModal && <AddNoteModal onClose={() => setShowNoteModal(false)} />}
      {showLabWorkModal && <AddLabWorkModal onClose={() => setShowLabWorkModal(false)} />}

      <div className="back-link">
        <a href="#">Back to History</a>
      </div>
    </div>
  );
};

export default Treatment;
