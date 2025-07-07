// components/UploadPopup.js
import React, { useState } from 'react';
import { MdCloudUpload } from 'react-icons/md';
import './UploadPopup.css';

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
    <div className="upload-popup-overlay">
      <div className="upload-popup-content">
        <div className="upload-popup-header">
          <h3>Upload File</h3>
          <button className="upload-popup-close" onClick={handleClose}>&times;</button>
        </div>
        <div className="upload-popup-body">
          <div
            className="upload-popup-dropzone"
            onClick={() => document.getElementById('fileInput').click()}
          >
            {imagePreviewUrl ? (
              <img src={imagePreviewUrl} alt="Preview" className="upload-popup-preview" />
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
          <p className="upload-popup-hint">Allowed: PNG, JPG, PDF. Max size: 3MB.</p>
        </div>
        <div className="upload-popup-footer">
          <button className="upload-popup-btn cancel" onClick={handleClose}>
            <span className="icon-cancel"></span> Cancel
          </button>
          <button className="upload-popup-btn save" onClick={handleSave}>
            <span className="icon-save"></span> Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadPopup;
