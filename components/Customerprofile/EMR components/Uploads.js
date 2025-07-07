import React, { useState } from "react";
import "./Uploads.css"; // Keep modal styles here or move to UploadPopup.css if preferred
import { FaTrash, FaDownload, FaCloudUploadAlt } from "react-icons/fa";
import UploadPopup from '@/components/PopupModals/UploadModel/UploadPopup'; // Import the new UploadPopup component

const Uploads = () => {
  const [uploads, setUploads] = useState([
    {
      id: 1,
      date: "2025-04-17",
      image:
        "https://i.imgur.com/Qz1R2Ug.jpeg", // replace with real URLs if needed
    },
  ]);

  // State to control the visibility of the upload modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to handle saving the upload from the popup
  const handleSaveUpload = (file, previewUrl) => {
    // In a real application, you would send `file` to a backend server
    // using FormData and an API call (e.g., Axios, Fetch API).
    // For this example, we'll simulate by adding a new placeholder image.

    // Simulate a successful upload
    const newUpload = {
      id: uploads.length + 1,
      date: new Date().toISOString().split("T")[0],
      // In a real app, this would be the URL returned from your server
      image: previewUrl || "https://via.placeholder.com/250x200?text=Uploaded+File", // Use preview or generic placeholder
    };
    setUploads([...uploads, newUpload]);
    // Modal will be closed by UploadPopup's internal logic after onSave is called
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this upload?")) {
      setUploads(uploads.filter((upload) => upload.id !== id));
    }
  };

  return (
    <div className="uploads-container">
      <div className="uploads-header">
        <h2>Uploads</h2>
        <button className="upload-btn" onClick={openModal}>
          <FaCloudUploadAlt style={{ marginRight: "6px" }} />
          Upload
        </button>
      </div>

      <div className="uploads-grid">
        {uploads.map((item) => (
          <div key={item.id} className="upload-card">
            <img src={item.image} alt="upload" className="upload-image" />
            <div className="upload-footer">
              <span>Upload Date: {item.date}</span>
              <div className="upload-actions">
                <FaTrash
                  className="icon-btn delete-icon"
                  onClick={() => handleDelete(item.id)}
                />
                <a href={item.image} download target="_blank" rel="noopener noreferrer">
                  <FaDownload className="icon-btn download-icon" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Import and render the UploadPopup component */}
      <UploadPopup
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)} // Function to close the modal
        onSave={handleSaveUpload} // Function to handle saving the uploaded file
      />
    </div>
  );
};

export default Uploads;