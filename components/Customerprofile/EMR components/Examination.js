// components\Customerprofile\EMR components\Examination.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Examination.css";
import Swal from "sweetalert2";

const Examination = ({ data, onUpdatePatient }) => {
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
  const [examinationId, setExaminationId] = useState(null);
  const [appoId, setAppoId] = useState(null);
  const [branch, setBranch] = useState("1");

  useEffect(() => {
    if (data) {
      setExaminationId(data.id);
      setExamDate(data.examdate || "");
      setDoctor(data.exam_doctor || "");
      setChiefComplaint(data.chief_complaint || "");
      setDescription(data.exam_description || "");
      setSubType(data.subtype || "");
      setHardTissue(data.hardTissue || "");
      setSoftTissue(data.softTissue || "");
      setObservations(data.observations || "");
      setAppoId(data.appo_id || null);
      setBranch(data.branch?.toString() || "1");

      if (data.class1) setOcclusion("Class 1");
      else if (data.class2) setOcclusion("Class 2");
      else if (data.class3) setOcclusion("Class 3");
      else if (data.bimaxillary) setOcclusion("Bi-maxillary protrusion");
      else if (data.none) setOcclusion("None");

      const selectedTeeth = [];
      ["18sub", "28sub", "38sub", "48sub"].forEach((tooth) => {
        if (data[tooth]) selectedTeeth.push(tooth.slice(0, 2));
      });
      setWisdomTeeth(selectedTeeth);

      if (data.calculus1 === "1") setCalculus("+");
      else if (data.calculus1 === "2") setCalculus("++");
      else if (data.calculus1 === "3") setCalculus("+++");

      if (data.stains1 === "1") setStains("+");
      else if (data.stains1 === "2") setStains("++");
      else if (data.stains1 === "3") setStains("+++");
    }
  }, [data]);

  const toggleTooth = (tooth) => {
    setWisdomTeeth((prev) =>
      prev.includes(tooth) ? prev.filter((t) => t !== tooth) : [...prev, tooth]
    );
  };

  const handleSubmit = async () => {
    const payload = {
      examdate: examDate,
      exam_doctor: doctor,
      chief_complaint: chiefComplaint,
      exam_description: description,
      appo_id: appoId,
      active_tab: "tab4-1",
      branch: branch,
      subtype: subType,
      hardTissue,
      softTissue,
      observations,
    };

    // Reset all occlusion flags
    payload.class1 = "0";
    payload.class2 = "0";
    payload.class3 = "0";
    payload.bimaxillary = "0";
    payload.none = "0";

    // Set occlusion
    if (occlusion === "Class 1") payload.class1 = "1";
    else if (occlusion === "Class 2") payload.class2 = "1";
    else if (occlusion === "Class 3") payload.class3 = "1";
    else if (occlusion === "Bi-maxillary protrusion") payload.bimaxillary = "1";
    else if (occlusion === "None") payload.none = "1";

    // Reset all wisdom teeth first
    ["18", "28", "38", "48"].forEach((tooth) => {
      payload[`${tooth}sub`] = "0";
    });

    // Set selected wisdom teeth
    wisdomTeeth.forEach((tooth) => {
      payload[`${tooth}sub`] = "1";
    });

    // Calculus
    if (calculus === "+") payload.calculus1 = "1";
    else if (calculus === "++") payload.calculus1 = "2";
    else if (calculus === "+++") payload.calculus1 = "3";

    // Stains
    if (stains === "+") payload.stains1 = "1";
    else if (stains === "++") payload.stains1 = "2";
    else if (stains === "+++") payload.stains1 = "3";

    try {
      const res = await axios.post(
        `https://testing.erp4dentist.com/api/examination/updatedata?id=${examinationId}`,
        payload
      );

      if (res.status === 200 || res.status === 201) {
        Swal.fire("Success", "Examination Details Updated", "success");
        onUpdatePatient?.(); // refresh if defined
      } else {
        console.error("⚠️ Unexpected Response:", res);
        Swal.fire(
          "Error",
          res.data?.message || "Something went wrong while updating.",
          "error"
        );
      }
    } catch (err) {
      console.error("💥 API Error:", err);
      Swal.fire(
        "Error",
        err.response?.data?.message || "Failed to update examination",
        "error"
      );
    }
  };

  return (
    <div className="exam-container">
      <h2 className="section-heading">Examination</h2>

      <div className="form-row">
        <div className="form-group">
          <label>Examination Date</label>
          <input
            type="date"
            value={examDate}
            onChange={(e) => setExamDate(e.target.value)}
          />
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
          <select
            value={chiefComplaint}
            onChange={(e) => setChiefComplaint(e.target.value)}
          >
            <option>Bad breath</option>
            <option>Toothache</option>
            <option>Bleeding gums</option>
          </select>
        </div>
      </div>

      <div className="form-group full-width">
        <label>Description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <hr />
      <h3 className="section-heading">Clinical findings</h3>

      <div className="form-group">
        <label>Occlusion</label>
        <div className="radio-group">
          {[
            "Class 1",
            "Class 2",
            "Class 3",
            "Bi-maxillary protrusion",
            "None",
          ].map((item) => (
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
        <input
          type="text"
          value={subType}
          onChange={(e) => setSubType(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Wisdom Teeth</label>
        <div className="d-flex">
          {["18", "28", "38", "48"].map((tooth) => (
            <label
              key={tooth}
              className="d-flex"
              style={{ marginRight: "20px" }}
            >
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
        <label>
          <strong>Hard tissue findings</strong>
        </label>
        <input
          type="text"
          value={hardTissue}
          onChange={(e) => setHardTissue(e.target.value)}
        />
      </div>

      <div className="form-group full-width">
        <label>
          <strong>Soft tissue findings</strong>
        </label>
        <input
          type="text"
          value={softTissue}
          onChange={(e) => setSoftTissue(e.target.value)}
        />
      </div>

      <div className="form-group full-width">
        <label>
          <strong>Other observations</strong>
        </label>
        <input
          type="text"
          value={observations}
          onChange={(e) => setObservations(e.target.value)}
        />
      </div>

      <div className="text-center mt-4">
        <button className="btn btn-primary" onClick={handleSubmit}>
          Save
        </button>
      </div>
    </div>
  );
};

export default Examination;
