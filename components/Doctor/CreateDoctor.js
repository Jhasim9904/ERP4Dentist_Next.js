// components/Doctor/CreateDoctor.js
"use client";
import React, { useState, useEffect, useRef, useContext } from "react";
import { MyContext } from "@/context/SetContext.js"; // Corrected import path
import "./CreateDoctor.css";

const CreateDoctor = ({ onClose, formData }) => {
  const { AddDoctorApi, addingDocLoading, addingDocError,setEditDoctors } = useContext(MyContext);

  const [doctorData, setDoctorData] = useState({
    doc_id: null,
    name: "",
    type: "",
    specialization: "",
    email: "",
    contactNumber: "",
    joinDate: "",
    status: "",
    profileImage: "", // This will now store base64 string or URL
    note: "",
    color: "#3a6351",
    signature: "", // This will now store base64 string or URL
  });

  const [errors, setErrors] = useState({});
  const canvasRef = useRef(null);
  const isDrawing = useRef(false);
  const [ctx, setCtx] = useState(null);

  useEffect(() => {
    if (formData) {
      setDoctorData({
        doc_id: formData.doc_id || null,
        name: formData.doc_name || "",
        type: formData.doc_type || "",
        specialization: formData.doc_speciality || "",
        email: formData.doc_email || "",
        contactNumber: formData.doc_mobile || "",
        joinDate: formData.doc_join_date || "",
        status: formData.doc_status || "",
        profileImage: formData.image || "", // Existing image URL
        note: formData.note || "",
        color: formData.doc_cal_color || "#3a6351",
        signature: formData.signature || "", // Existing signature URL
      });

      if (formData.signature && canvasRef.current) {
        const img = new Image();
        img.onload = () => {
          const canvas = canvasRef.current;
          if (canvas) {
            const context = canvas.getContext("2d");
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(img, 0, 0, canvas.width, canvas.height);
          }
        };
        img.src = formData.signature;
      } else if (canvasRef.current) {
        const context = canvasRef.current.getContext("2d");
        context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      }
    } else {
      setDoctorData({
        doc_id: null,
        name: "",
        type: "",
        specialization: "",
        email: "",
        contactNumber: "",
        joinDate: "",
        status: "",
        profileImage: "",
        note: "",
        color: "#3a6351",
        signature: "",
      });
      if (canvasRef.current) {
        const context = canvasRef.current.getContext("2d");
        context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      }
    }
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctorData({ ...doctorData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: "" });
  };

  const handleColorChange = (e) => {
    setDoctorData({ ...doctorData, color: e.target.value });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (ev) => {
        setDoctorData({ ...doctorData, profileImage: ev.target.result }); // Store as Data URL (base64)
      };
      reader.readAsDataURL(file);
    }
  };

  const validateFields = () => {
    const newErrors = {};
    if (!doctorData.name.trim()) newErrors.name = "Name is required";
    if (!doctorData.type.trim()) newErrors.type = "Type is required";
    if (!doctorData.specialization.trim())
      newErrors.specialization = "Specialization is required";
    if (!doctorData.email.trim()) newErrors.email = "Email is required";
    if (!doctorData.contactNumber.trim())
      newErrors.contactNumber = "Contact number is required";
    if (!doctorData.joinDate.trim())
      newErrors.joinDate = "Join date is required";
    if (!doctorData.status.trim()) newErrors.status = "Status is required";
    return newErrors;
  };

  const handleSubmit = async () => {
    const newErrors = validateFields();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const canvas = canvasRef.current;
    let signatureImageBase64 = doctorData.signature; // Default to existing signature if not redrawn or empty

    if (canvas && !isCanvasEmpty(canvas)) {
      const trimmed = trimCanvas(canvas);
      signatureImageBase64 = trimmed.toDataURL("image/png"); // Get base64 for new signature
    } else if (!formData && isCanvasEmpty(canvas)) {
      signatureImageBase64 = ""; // New doctor, empty canvas means no signature
    }
    // If it's an existing doctor and canvas is empty but formData.signature had a value, keep it.
    // Otherwise, if canvas was cleared, signatureImageBase64 is effectively an empty string.


    // Construct JSON object for API submission
    const apiJsonData = {
      doc_id: doctorData.doc_id, // Will be null for new doctors
      doc_name: doctorData.name,
      doc_type: doctorData.type,
      doc_speciality: doctorData.specialization,
      doc_email: doctorData.email,
      doc_mobile: doctorData.contactNumber,
      doc_join_date: doctorData.joinDate,
      doc_cal_color: doctorData.color,
      doc_status: doctorData.status,
      note: doctorData.note,
      signature: signatureImageBase64, // Send base64 string
      image: doctorData.profileImage, // Send base64 string or existing URL
      doc_branch: "1",
      user_email: doctorData.email,
      main_email: doctorData.email,
      user_id: "1",
    };

    try {
      // Call the API function from context
      const responseData = await AddDoctorApi(apiJsonData); // Pass JSON object
      console.log("Doctor added/updated successfully:", responseData);
      onClose();
      setErrors({});
    } catch (err) {
      console.error("Failed to add/update doctor:", err);
      if (typeof err === "object" && err !== null) {
        setErrors(err);
      } else {
        // Error message from context's addingDocError will be displayed automatically
      }
    }
  };

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#000";
    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    isDrawing.current = true;
    setCtx(ctx);
  };

  const draw = (e) => {
    if (!isDrawing.current || !ctx) return;
    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctx.stroke();
  };

  const stopDrawing = () => {
    isDrawing.current = false;
    if (ctx) ctx.closePath();
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      setDoctorData((prev) => ({ ...prev, signature: "" }));
    }
  };

  const isCanvasEmpty = (canvas) => {
    if (!canvas) return true;
    const ctx = canvas.getContext("2d");
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < imageData.data.length; i += 4) {
      if (imageData.data[i + 3] !== 0) return false;
    }
    return true;
  };

  const trimCanvas = (canvas) => {
    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;
    const imageData = ctx.getImageData(0, 0, width, height);
    const pixels = imageData.data;

    let bound = {
      top: null,
      left: null,
      right: null,
      bottom: null,
    };

    for (let i = 0; i < pixels.length; i += 4) {
      const alpha = pixels[i + 3];
      if (alpha !== 0) {
        const x = (i / 4) % width;
        const y = ~~((i / 4) / width);
        if (bound.top === null) bound.top = y;
        if (bound.left === null || x < bound.left) bound.left = x;
        if (bound.right === null || x > bound.right) bound.right = x;
        if (bound.bottom === null || y > bound.bottom) bound.bottom = y;
      }
    }

    if (bound.top === null) return canvas;

    const trimmedWidth = bound.right - bound.left + 1;
    const trimmedHeight = bound.bottom - bound.top + 1;
    const trimmedCanvas = document.createElement("canvas");
    trimmedCanvas.width = trimmedWidth;
    trimmedCanvas.height = trimmedHeight;

    const trimmedCtx = trimmedCanvas.getContext("2d");
    trimmedCtx.putImageData(
      ctx.getImageData(bound.left, bound.top, trimmedWidth, trimmedHeight),
      0,
      0
    );

    return trimmedCanvas;
  };

  return (
    <div className="custom-modal-overlay">
      <div className="custom-modal">
        <h3>{formData ? "Edit Doctor" : "Create Doctor"}</h3>
        <div className="form-container">
          <div className="row">
            <div className="col">
              <label>Doctor Name</label>
              <input
                name="name"
                value={doctorData.name}
                onChange={handleChange}
                placeholder="Name"
                className={`input-field ${errors.name ? "error-border" : ""}`}
              />
              {errors.name && <span className="error-text">{errors.name}</span>}

              <label>Doctor Speciality</label>
              <input
                name="specialization"
                value={doctorData.specialization}
                onChange={handleChange}
                placeholder="Implant Surgery"
                className={`input-field ${errors.specialization ? "error-border" : ""}`}
              />
              {errors.specialization && (
                <span className="error-text">{errors.specialization}</span>
              )}

              <label>Contact Number</label>
              <input
                name="contactNumber"
                value={doctorData.contactNumber}
                onChange={handleChange}
                placeholder="Contact No"
                className={`input-field ${errors.contactNumber ? "error-border" : ""}`}
              />
              {errors.contactNumber && (
                <span className="error-text">{errors.contactNumber}</span>
              )}

              <label>Status</label>
              <input
                name="status"
                value={doctorData.status}
                onChange={handleChange}
                placeholder="Active"
                className={`input-field ${errors.status ? "error-border" : ""}`}
              />
              {errors.status && <span className="error-text">{errors.status}</span>}
            </div>

            <div className="col">
              <label>Type</label>
              <input
                name="type"
                value={doctorData.type}
                onChange={handleChange}
                placeholder="Resident Doctor"
                className={`input-field ${errors.type ? "error-border" : ""}`}
              />
              {errors.type && <span className="error-text">{errors.type}</span>}

              <label>Email</label>
              <input
                name="email"
                value={doctorData.email}
                onChange={handleChange}
                placeholder="Email"
                className={`input-field ${errors.email ? "error-border" : ""}`}
              />
              {errors.email && <span className="error-text">{errors.email}</span>}

              <label>Join Date</label>
              <input
                name="joinDate"
                type="date"
                value={doctorData.joinDate}
                onChange={handleChange}
                className={`input-field ${errors.joinDate ? "error-border" : ""}`}
              />
              {errors.joinDate && (
                <span className="error-text">{errors.joinDate}</span>
              )}

              <label>Choose Color</label>
              <input
                type="color"
                className="color-input"
                value={doctorData.color}
                onChange={handleColorChange}
              />

              <label>Profile (max 2MB)</label>
              <input type="file" onChange={handleFileChange} />
            </div>
          </div>

          <div className="signature-section">
            <h5 className="signature-label">E-Signature</h5>
            <p className="signature-subtext">Save your signature as an image!</p>
            <canvas
              ref={canvasRef}
              width={600}
              height={160}
              className="signature-canvas"
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
            ></canvas>
          </div>

          <label>Note</label>
          <textarea
            name="note"
            value={doctorData.note}
            onChange={handleChange}
            className="input-field"
            rows="2"
            placeholder="Note"
          />
        </div>

        {addingDocLoading && <p>Processing doctor data...</p>}
        {addingDocError && <p className="error-text">{addingDocError}</p>}

        <div className="buttons">
          <button className="cancel-btn" onClick={clearSignature}>
            Clear Signature
          </button>
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button
            className="create-btn"
            onClick={handleSubmit}
            disabled={addingDocLoading}
          >
            {addingDocLoading ? "Saving..." : formData ? "Update" : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateDoctor;