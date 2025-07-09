"use client";
import React, { useState, useRef } from "react";
import "./CreateDoctor.css";

const CreateDoctor = ({ onClose, onCreate }) => {
  const [doctorData, setDoctorData] = useState({
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

  const [errors, setErrors] = useState({});
  const canvasRef = useRef(null);
  const isDrawing = useRef(false);
  const [ctx, setCtx] = useState(null);

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
      const reader = new FileReader();
      reader.onload = (ev) => {
        setDoctorData({ ...doctorData, profileImage: ev.target.result });
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const validateFields = () => {
    const newErrors = {};
    if (!doctorData.name.trim()) newErrors.name = "Name is required";
    if (!doctorData.type.trim()) newErrors.type = "Type is required";
    if (!doctorData.specialization.trim()) newErrors.specialization = "Specialization is required";
    if (!doctorData.email.trim()) newErrors.email = "Email is required";
    if (!doctorData.contactNumber.trim()) newErrors.contactNumber = "Contact number is required";
    if (!doctorData.joinDate.trim()) newErrors.joinDate = "Join date is required";
    if (!doctorData.status.trim()) newErrors.status = "Status is required";
    return newErrors;
  };

  const handleSubmit = () => {
    const newErrors = validateFields();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const canvas = canvasRef.current;
    const trimmed = trimCanvas(canvas); // Auto-trim white
    const signatureImage = trimmed.toDataURL("image/png");

    const updatedDoctor = { ...doctorData, signature: signatureImage };
    onCreate(updatedDoctor);
    onClose();
  };

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
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
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  // --- Trim canvas to remove white space ---
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

    const trimmedWidth = bound.right - bound.left;
    const trimmedHeight = bound.bottom - bound.top;
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
        <h3>Create Doctor</h3>
        <div className="form-container">
          <div className="row">
            <div className="col">
              <label>Doctor Name</label>
              <input name="name" value={doctorData.name} onChange={handleChange} placeholder="Name" className={`input-field ${errors.name ? "error-border" : ""}`} />
              {errors.name && <span className="error-text">{errors.name}</span>}

              <label>Doctor Speciality</label>
              <input name="specialization" value={doctorData.specialization} onChange={handleChange} placeholder="Implant Surgery" className={`input-field ${errors.specialization ? "error-border" : ""}`} />
              {errors.specialization && <span className="error-text">{errors.specialization}</span>}

              <label>Contact Number</label>
              <input name="contactNumber" value={doctorData.contactNumber} onChange={handleChange} placeholder="Contact No" className={`input-field ${errors.contactNumber ? "error-border" : ""}`} />
              {errors.contactNumber && <span className="error-text">{errors.contactNumber}</span>}

              <label>Status</label>
              <input name="status" value={doctorData.status} onChange={handleChange} placeholder="Active" className={`input-field ${errors.status ? "error-border" : ""}`} />
              {errors.status && <span className="error-text">{errors.status}</span>}
            </div>

            <div className="col">
              <label>Type</label>
              <input name="type" value={doctorData.type} onChange={handleChange} placeholder="Resident Doctor" className={`input-field ${errors.type ? "error-border" : ""}`} />
              {errors.type && <span className="error-text">{errors.type}</span>}

              <label>Email</label>
              <input name="email" value={doctorData.email} onChange={handleChange} placeholder="Email" className={`input-field ${errors.email ? "error-border" : ""}`} />
              {errors.email && <span className="error-text">{errors.email}</span>}

              <label>Join Date</label>
              <input name="joinDate" type="date" value={doctorData.joinDate} onChange={handleChange} className={`input-field ${errors.joinDate ? "error-border" : ""}`} />
              {errors.joinDate && <span className="error-text">{errors.joinDate}</span>}

              <label>Choose Color</label>
              <input type="color" className="color-input" value={doctorData.color} onChange={handleColorChange} />

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

            {/* Optional Preview */}
            {/* {doctorData.signature && (
              <img src={doctorData.signature} alt="Signature Preview" style={{ maxWidth: "100%", marginTop: 10 }} />
            )} */}
          </div>

          <label>Note</label>
          <textarea name="note" value={doctorData.note} onChange={handleChange} className="input-field" rows="2" placeholder="Note" />
        </div>

        <div className="buttons">
          <button className="cancel-btn" onClick={clearSignature}>Clear Signature</button>
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
          <button className="create-btn" onClick={handleSubmit}>Create</button>
        </div>
      </div>
    </div>
  );
};

export default CreateDoctor;
