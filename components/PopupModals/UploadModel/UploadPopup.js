// components/UploadPopup.js
import React, { useState } from 'react';
import { MdCloudUpload } from 'react-icons/md'; // For the cloud icon

const UploadPopup = ({ isOpen, onClose, onSave }) => {
  // State to hold the selected file for upload within the popup
  const [selectedFile, setSelectedFile] = useState(null);
  // State to hold the preview URL of the selected image within the popup
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);

  // If the modal is not open, don't render anything
  if (!isOpen) return null;

  // Function to handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Basic validation for file type and size (3MB = 3 * 1024 * 1024 bytes)
      const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'application/pdf'];
      const maxFileSize = 3 * 1024 * 1024; // 3MB

      if (!allowedTypes.includes(file.type)) {
        alert("Allowed file types are PNG, JPG, PDF."); // Using alert for simplicity, consider a custom modal
        setSelectedFile(null);
        setImagePreviewUrl(null);
        return;
      }

      if (file.size > maxFileSize) {
        alert("Max file size is 3MB."); // Using alert for simplicity, consider a custom modal
        setSelectedFile(null);
        setImagePreviewUrl(null);
        return;
      }

      setSelectedFile(file);

      // Create a URL for image preview if it's an image
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreviewUrl(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        setImagePreviewUrl(null); // No preview for PDF or other files
      }
    } else {
      setSelectedFile(null);
      setImagePreviewUrl(null);
    }
  };

  // Function to handle saving the upload from the popup
  const handleSave = () => {
    if (selectedFile) {
      // Call the onSave prop, passing the selected file and its preview URL
      onSave(selectedFile, imagePreviewUrl);
      // Reset popup's internal state and close it
      setSelectedFile(null);
      setImagePreviewUrl(null);
      onClose();
    } else {
      alert("Please select a file to upload."); // Using alert for simplicity, consider a custom modal
    }
  };

  // Function to handle closing the popup
  const handleClose = () => {
    // Reset popup's internal state and close it via the onClose prop
    setSelectedFile(null);
    setImagePreviewUrl(null);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Upload File</h3>
          <button className="close-button" onClick={handleClose}>&times;</button>
        </div>
        <div className="modal-body">
          <div className="upload-area" onClick={() => document.getElementById('fileInput').click()}>
            {imagePreviewUrl ? (
              <img src={imagePreviewUrl} alt="Preview" className="image-preview" />
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
              accept=".png,.jpg,.jpeg,.pdf" // Specify accepted file types
            />
          </div>
          <p className="allowed-types">Allowed file types: .PNG, .JPG, .PDF. Max size: 3MB</p>
        </div>
        <div className="modal-footer">
          <button className="modal-btn cancel-btn" onClick={handleClose}>
            <span className="icon-cancel"></span> Cancel
          </button>
          <button className="modal-btn save-btn" onClick={handleSave}>
            <span className="icon-save"></span> Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadPopup;