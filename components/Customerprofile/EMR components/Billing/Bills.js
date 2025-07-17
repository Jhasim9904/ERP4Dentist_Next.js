import React, { useState } from "react";
import "./Bills.css";
import { FaEdit } from "react-icons/fa";
import CreateReceiptModal from "@/components/PopupModals/CreateReceiptModal/CreateReceiptModal";

const Bills = ({ data = [] }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="bills-container">
      <div className="bill-summary-bar">
        <span>Total Estimated Plan Amount: ₹ {/* Optional: Add dynamic total */}</span>
        <span>Total Confirmed Plan Amount: ₹ {/* Optional: Add dynamic total */}</span>
      </div>

      <table className="bill-table">
        <thead>
          <tr>
            <th>Bill No</th>
            <th>Bill Date</th>
            <th>Treatment Cost</th>
            <th>Bill Amount</th>
            <th>Received Amount</th>
            <th>Balance Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.bill_id}>
              <td>{item.unibill}</td>
              <td>{item.bill_date}</td>
              <td>₹ {item.treatment_cost}</td>
              <td>₹ {item.bill_amount}</td>
              <td>₹ {item.received_amount}</td>
              <td>₹ {item.balance_amt}</td>
              <td>
                <button className="edit-icon-btn" onClick={() => setShowModal(true)}>
                  <FaEdit />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for editing receipts */}
      {showModal && <CreateReceiptModal onClose={() => setShowModal(false)} />}

      <p className="entries-text">Showing 1 to {data.length} of {data.length} Entries →</p>
    </div>
  );
};

export default Bills;
