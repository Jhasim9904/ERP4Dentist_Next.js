import React, { useState } from 'react';
import './Examination.css';

const Examination = ({ activeTab, setActiveTab }) => {
  // General Info States
  const [examDate, setExamDate] = useState('2025-04-17');
  const [doctor, setDoctor] = useState('sabari');
  const [chiefComplaint, setChiefComplaint] = useState('Bad breath');
  const [description, setDescription] = useState(
    'Patient complains of persistent halitosis for the past 6 months. No history of gastrointestinal issues reported. Oral hygiene practices irregular.'
  );
  const [occlusion, setOcclusion] = useState('Class 1');
  const [subType, setSubType] = useState('Anterior cross bite');

  // Clinical Findings States
  const [wisdomTeeth, setWisdomTeeth] = useState([]);
  const [calculus, setCalculus] = useState('++');
  const [stains, setStains] = useState('++');
  const [hardTissue, setHardTissue] = useState('Attrition noted on anterior teeth');
  const [softTissue, setSoftTissue] = useState('No ulceration or lesions noted');
  const [observations, setObservations] = useState('patient advised to improve brushing technique');

  const toggleTooth = (tooth) => {
    setWisdomTeeth((prev) =>
      prev.includes(tooth) ? prev.filter((t) => t !== tooth) : [...prev, tooth]
    );
  };

  return (
    <div className="exam-container">
      <h2 className="section-heading">Examination</h2>

      {/* General Information */}
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

      {/* Occlusion */}
      <div className="form-group">
        <label>Occlusion</label>
        <div className="radio-group">
          {['Class 1', 'Class 2', 'Class 3', 'Bi-maxillary protrusion', 'None'].map((item) => (
            <label key={item} style={{ marginRight: '15px' }}>
              <input
                type="radio"
                name="occlusion"
                value={item}
                checked={occlusion === item}
                onChange={() => setOcclusion(item)}
              />{' '}
              {item}
            </label>
          ))}
        </div>
      </div>

      <div className="form-group full-width">
        <label>Sub Type</label>
        <input type="text" value={subType} onChange={(e) => setSubType(e.target.value)} />
      </div>

      {/* Wisdom Teeth */}
      <div className="form-group">
        <label>Wisdom Teeth</label>
        <div className="d-flex">
          {['18', '28', '38', '48'].map((tooth) => (
            <label key={tooth} className="d-flex" style={{ marginRight: '20px' }}>
              <input
                type="checkbox"
                checked={wisdomTeeth.includes(tooth)}
                onChange={() => toggleTooth(tooth)}
              />{' '}
              Teeth No. {tooth}
            </label>
          ))}
        </div>
      </div>

      {/* Calculus and Stains */}
      <div className="form-row">
        <div className="form-group">
          <label>Calculus</label>
          <div className="radio-group">
            {['+', '++', '+++'].map((level) => (
              <label key={level} style={{ marginRight: '15px' }}>
                <input
                  type="radio"
                  name="calculus"
                  checked={calculus === level}
                  onChange={() => setCalculus(level)}
                />{' '}
                {level}
              </label>
            ))}
          </div>
        </div>

        <div className="form-group" style={{ marginLeft: '40px' }}>
          <label>Stains</label>
          <div className="radio-group">
            {['+', '++', '+++'].map((level) => (
              <label key={level} style={{ marginRight: '15px' }}>
                <input
                  type="radio"
                  name="stains"
                  checked={stains === level}
                  onChange={() => setStains(level)}
                />{' '}
                {level}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Findings */}
      <div className="form-group full-width">
        <label><strong>Hard tissue findings</strong></label>
        <input
          type="text"
          value={hardTissue}
          onChange={(e) => setHardTissue(e.target.value)}
        />
      </div>

      <div className="form-group full-width">
        <label><strong>Soft tissue findings</strong></label>
        <input
          type="text"
          value={softTissue}
          onChange={(e) => setSoftTissue(e.target.value)}
        />
      </div>

      <div className="form-group full-width">
        <label><strong>Other observations</strong></label>
        <input
          type="text"
          value={observations}
          onChange={(e) => setObservations(e.target.value)}
        />
      </div>

      <div className="text-center mt-4">
        <button className="btn btn-primary">Save</button>
      </div>
    </div>
  );
};

export default Examination;
