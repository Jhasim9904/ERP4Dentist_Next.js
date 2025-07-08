// components/PopupModals/UploadPopup/UploadPopup.js
"use client";
import React, { useState } from 'react';
import { MdCloudUpload } from 'react-icons/md';
import styles from './UploadPopup.module.css';

const UploadPopup = ({ isOpen, onClose, onSave }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);

  if (!isOpen) return null;

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'application/pdf'];
      const maxFileSize = 3 * 1024 * 1024;

      if (!allowedTypes.includes(file.type)) {
        alert("Allowed file types are PNG, JPG, PDF.");
        setSelectedFile(null);
        setImagePreviewUrl(null);
        return;
      }

      if (file.size > maxFileSize) {
        alert("Max file size is 3MB.");
        setSelectedFile(null);
        setImagePreviewUrl(null);
        return;
      }

      setSelectedFile(file);

      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreviewUrl(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        setImagePreviewUrl(null);
      }
    } else {
      setSelectedFile(null);
      setImagePreviewUrl(null);
    }
  };

  const handleSave = () => {
    if (selectedFile) {
      onSave(selectedFile, imagePreviewUrl);
      setSelectedFile(null);
      setImagePreviewUrl(null);
      onClose();
    } else {
      alert("Please select a file to upload.");
    }
  };

  const handleClose = () => {
    setSelectedFile(null);
    setImagePreviewUrl(null);
    onClose();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <div className={styles.header}>
          <h3>Upload File</h3>
          <button className={styles.close} onClick={handleClose}>&times;</button>
        </div>
        <div className={styles.body}>
          <div
            className={styles.dropzone}
            onClick={() => document.getElementById('fileInput').click()}
          >
            {imagePreviewUrl ? (
              <img src={imagePreviewUrl} alt="Preview" className={styles.preview} />
            ) : (
              <>
                <MdCloudUpload size={80} color="#007bff" />
                <p>Browse</p>
              </>
            )}
            <input
              type="file"
              id="fileInput"
              style={{ display: 'none' }}
              onChange={handleFileChange}
              accept=".png,.jpg,.jpeg,.pdf"
            />
          </div>
          <p className={styles.hint}>Allowed: PNG, JPG, PDF. Max size: 3MB.</p>
        </div>
        <div className={styles.footer}>
          <button className={`${styles.button} ${styles.cancel}`} onClick={handleClose}>
            <span className={styles.iconCancel}></span> Cancel
          </button>
          <button className={`${styles.button} ${styles.save}`} onClick={handleSave}>
            <span className={styles.iconSave}></span> Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadPopup;
