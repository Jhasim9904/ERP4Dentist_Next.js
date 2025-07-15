import React, { useContext } from "react";
import { FaUserCircle, FaEnvelope, FaPhone, FaMapMarkerAlt, FaComments, FaUser, FaPaperPlane } from "react-icons/fa";
import "./Card.css";
import "./Container.css";
import { MyContext } from "@/context/AppointmentContext.js";

const Card = () => {

    const {appointment_details} = useContext(MyContext);

  return (
    <div className="card card1" style={{ width: "28rem", height: "20rem" }}>
      <div className="d-flex top-card">
        <FaUserCircle style={{ fontSize: "40px", color: "white" }} className="my-4 mx-5" />
        <div className="content">
          <div style={{ color: "white" }}>{appointment_details.firstname}</div>
          <div className="my-1" style={{ color: "white" }}>
           {appointment_details.email}
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
          <div className="ms-3">{appointment_details.email}</div>
        </div>
        <div className="d-flex my-3">
          <FaPhone style={{ fontSize: "20px" }} />
          <div className="ms-3">{appointment_details.contact_no}</div>
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
