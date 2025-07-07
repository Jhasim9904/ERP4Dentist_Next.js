import React from "react";
import { FaUserCircle, FaEnvelope, FaPhone, FaMapMarkerAlt, FaComments, FaUser, FaPaperPlane } from "react-icons/fa";
import "./Card.css";
import "./Container.css";

const Card = () => {
  return (
    <div className="card card1" style={{ width: "28rem", height: "20rem" }}>
      <div className="d-flex top-card">
        <FaUserCircle style={{ fontSize: "40px", color: "white" }} className="my-4 mx-5" />
        <div className="content">
          <div style={{ color: "white" }}>Choki</div>
          <div className="my-1" style={{ color: "white" }}>
            chokidhani@gmail.com
          </div>
          <div className="row mt-2">
            <div className="col"><FaComments style={{ fontSize: "30px", color: "white" }} /></div>
            <div className="col"><FaUser style={{ fontSize: "30px", color: "white" }} /></div>
            <div className="col"><FaPaperPlane style={{ fontSize: "30px", color: "white" }} /></div>
          </div>
        </div>
      </div>

      <div className="card-body">
        <h5>Contact Information</h5>
        <div className="d-flex mt-3">
          <FaEnvelope style={{ fontSize: "20px" }} />
          <div className="ms-3">chokidhani@gmail.com</div>
        </div>
        <div className="d-flex my-3">
          <FaPhone style={{ fontSize: "20px" }} />
          <div className="ms-3">8237108278</div>
        </div>
        <div className="d-flex">
          <FaMapMarkerAlt style={{ fontSize: "20px" }} />
          <div className="ms-3">Varu village, Brahmnoli</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
