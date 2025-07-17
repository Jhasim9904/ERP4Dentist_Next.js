// components\Customerprofile\EMR components\Examination.js
import React, { useState, useEffect } from "react";
import "./Examination.css";

const Examination = ({ data }) => {
  const [examDate, setExamDate] = useState("");
  const [doctor, setDoctor] = useState("");
  const [chiefComplaint, setChiefComplaint] = useState("");
  const [description, setDescription] = useState("");
  const [occlusion, setOcclusion] = useState("");
  const [subType, setSubType] = useState("");
  const [wisdomTeeth, setWisdomTeeth] = useState([]);
  const [calculus, setCalculus] = useState("");
  const [stains, setStains] = useState("");
  const [hardTissue, setHardTissue] = useState("");
  const [softTissue, setSoftTissue] = useState("");
  const [observations, setObservations] = useState("");

  useEffect(() => {
    if (data) {
      setExamDate(data.examdate || "");
      setDoctor(data.exam_doctor || "");
      setChiefComplaint(data.chief_complaint || "");
      setDescription(data.exam_description || "");
      setSubType(data.subtype || "");
      setHardTissue(data.hardTissue || "");
      setSoftTissue(data.softTissue || "");
      setObservations(data.observations || "");

      // Determine occlusion class
      if (data.class1) setOcclusion("Class 1");
      else if (data.class2) setOcclusion("Class 2");
      else if (data.class3) setOcclusion("Class 3");
      else if (data.bimaxillary) setOcclusion("Bi-maxillary protrusion");
      else if (data.none) setOcclusion("None");

      // Determine calculus & stains level
      if (data.calculus1) setCalculus("++");
      if (data.stains1) setStains("++");

      // Wisdom teeth selection
      const selected = [];
      ["18sub", "28sub", "38sub", "48sub"].forEach((tooth) => {
        if (data[tooth]) selected.push(tooth.slice(0, 2));
      });
      setWisdomTeeth(selected);
    }
  }, [data]);

  const toggleTooth = (tooth) => {
    setWisdomTeeth((prev) =>
      prev.includes(tooth) ? prev.filter((t) => t !== tooth) : [...prev, tooth]
    );
  };

  return (
    <div className="exam-container">
      <h2 className="section-heading">Examination</h2>

      <div className="form-row">
        <div className="form-group">
          <label>Examination Date*</label>
          <input type="date" value={examDate} onChange={(e) => setExamDate(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Doctor</label>
          <select value={doctor} onChange={(e) => setDoctor(e.target.value)}>
            <option>sabari</option>
            <option>anand</option>
          </select>
        </div>
        <div className="form-group">
          <label>Chief Complaint</label>
          <select value={chiefComplaint} onChange={(e) => setChiefComplaint(e.target.value)}>
            <option>Bad breath</option>
            <option>Toothache</option>
            <option>Bleeding gums</option>
          </select>
        </div>
      </div>

      <div className="form-group full-width">
        <label>Description</label>
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>

      <hr />
      <h3 className="section-heading">Clinical findings</h3>

      <div className="form-group">
        <label>Occlusion</label>
        <div className="radio-group">
          {["Class 1", "Class 2", "Class 3", "Bi-maxillary protrusion", "None"].map((item) => (
            <label key={item} style={{ marginRight: "15px" }}>
              <input
                type="radio"
                name="occlusion"
                value={item}
                checked={occlusion === item}
                onChange={() => setOcclusion(item)}
              />{" "}
              {item}
            </label>
          ))}
        </div>
      </div>

      <div className="form-group full-width">
        <label>Sub Type</label>
        <input type="text" value={subType} onChange={(e) => setSubType(e.target.value)} />
      </div>

      <div className="form-group">
        <label>Wisdom Teeth</label>
        <div className="d-flex">
          {["18", "28", "38", "48"].map((tooth) => (
            <label key={tooth} className="d-flex" style={{ marginRight: "20px" }}>
              <input
                type="checkbox"
                checked={wisdomTeeth.includes(tooth)}
                onChange={() => toggleTooth(tooth)}
              />{" "}
              Teeth No. {tooth}
            </label>
          ))}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Calculus</label>
          <div className="radio-group">
            {["+", "++", "+++"].map((level) => (
              <label key={level} style={{ marginRight: "15px" }}>
                <input
                  type="radio"
                  name="calculus"
                  checked={calculus === level}
                  onChange={() => setCalculus(level)}
                />{" "}
                {level}
              </label>
            ))}
          </div>
        </div>

        <div className="form-group" style={{ marginLeft: "40px" }}>
          <label>Stains</label>
          <div className="radio-group">
            {["+", "++", "+++"].map((level) => (
              <label key={level} style={{ marginRight: "15px" }}>
                <input
                  type="radio"
                  name="stains"
                  checked={stains === level}
                  onChange={() => setStains(level)}
                />{" "}
                {level}
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="form-group full-width">
        <label><strong>Hard tissue findings</strong></label>
        <input type="text" value={hardTissue} onChange={(e) => setHardTissue(e.target.value)} />
      </div>

      <div className="form-group full-width">
        <label><strong>Soft tissue findings</strong></label>
        <input type="text" value={softTissue} onChange={(e) => setSoftTissue(e.target.value)} />
      </div>

      <div className="form-group full-width">
        <label><strong>Other observations</strong></label>
        <input type="text" value={observations} onChange={(e) => setObservations(e.target.value)} />
      </div>

      <div className="text-center mt-4">
        <button className="btn btn-primary">Save</button>
      </div>
    </div>
  );
};

export default Examination;
