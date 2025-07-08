// components/PopupModals/AddNewPrescriptionModal/AddNewPrescriptionModal.js
import React, { useState } from 'react';
import styles from './AddNewPrescriptionModal.module.css';

const AddNewPrescriptionModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    drug: '',
    drugType: '',
    morning: 0,
    afternoon: 0,
    night: 0,
    duration: '1 days',
    doctor: '',
    instructions: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    console.log('Saving Prescription:', formData);
    onClose();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h3>Prescriptions</h3>
          <button className={styles.closeBtn} onClick={onClose}>×</button>
        </div>

        <div className={styles.body}>
          <div className={styles.row}>
            <div className={styles.inputGroup}>
              <label>Drug</label>
              <input type="text" name="drug" value={formData.drug} onChange={handleChange} />
            </div>
            <div className={styles.inputGroup}>
              <label>Drug Type</label>
              <input type="text" name="drugType" value={formData.drugType} onChange={handleChange} placeholder="Enter Drug Frequency" />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.inputGroup}>
              <label>Morning</label>
              <input type="number" name="morning" value={formData.morning} onChange={handleChange} />
            </div>
            <div className={styles.inputGroup}>
              <label>Afternoon</label>
              <input type="number" name="afternoon" value={formData.afternoon} onChange={handleChange} />
            </div>
            <div className={styles.inputGroup}>
              <label>Night</label>
              <input type="number" name="night" value={formData.night} onChange={handleChange} />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.inputGroup}>
              <label>Duration</label>
              <input type="text" name="duration" value={formData.duration} onChange={handleChange} />
            </div>
            <div className={styles.inputGroup}>
              <label>Doctor</label>
              <select name="doctor" value={formData.doctor} onChange={handleChange}>
                <option value="">Select Doctor</option>
                <option value="Dr. Sabari">Dr. Sabari</option>
                <option value="Dr. Giri">Dr. Giri</option>
              </select>
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.inputGroupFull}>
              <label>Instructions</label>
              <textarea name="instructions" rows={3} value={formData.instructions} onChange={handleChange} />
            </div>
          </div>
        </div>

        <div className={styles.footer}>
          <button className={styles.cancelBtn} onClick={onClose}>Cancel</button>
          <button className={styles.saveBtn} onClick={handleSubmit}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default AddNewPrescriptionModal;
