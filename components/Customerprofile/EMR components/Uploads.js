import React, { useState } from "react";
import "./Uploads.css";
import { FaTrash, FaDownload, FaCloudUploadAlt } from "react-icons/fa";

const Uploads = () => {
  const [uploads, setUploads] = useState([
    {
      id: 1,
      date: "2025-04-17",
      image:
        "https://i.imgur.com/Qz1R2Ug.jpeg", // replace with real URLs if needed
    },
  ]);

  const handleUpload = () => {
    const newUpload = {
      id: uploads.length + 1,
      date: new Date().toISOString().split("T")[0],
      image:
        "https://i.imgur.com/Qz1R2Ug.jpeg", // Replace with real uploaded URL
    };
    setUploads([...uploads, newUpload]);
  };

  const handleDelete = (id) => {
    setUploads(uploads.filter((upload) => upload.id !== id));
  };

  return (
    <div className="uploads-container">
      <div className="uploads-header">
        <h2>Uploads</h2>
        <button className="upload-btn" onClick={handleUpload}>
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
                <a href={item.image} download>
                  <FaDownload className="icon-btn download-icon" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Uploads;
