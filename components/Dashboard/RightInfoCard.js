import React from "react";
import "./RightInfoCard.css";

const RightInfoCard = () => {
  return (
    <>
      <div>
        <input
          style={{ width: "465px", margin:"10px 0px"}}
          className="form-control inpapp "
          type="search"
          placeholder="Ask AI anything here..."
          aria-label="Search"
        />
          <div
        style={{
          width: "463px", // ⬅️ Increased width here
          background: "#fff",
          borderRadius: "8px",
          boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
          padding: "16px",
          fontSize: "14px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          height: "465px",
        }}
        >
        <p
          style={{
            display: "flex",
            padding: "0px 0px 10px 130px",
            fontWeight: "bolder",
            borderBottom: "1px solid #eee",
          }}
        >
          Today's Schedules
        </p>
        {/* Row 1 */}
        <div style={{ padding: "0px 0", borderBottom: "1px solid #eee" }}>
          <div>
            <div className="container text-center">
              <div className="row">
                <div
                  className="col"
                  style={{ borderRight: "1px solid #eee", height: "10px" }}
                >
                  Today
                <p className="Rtablerow21" style={{color:"white"}}>5</p>
                </div>
                <div
                  className="col"
                  style={{ borderRight: "1px solid #eee", height: "10px" }}
                >
                  Waiting
                  <p className="Rtablerow22" style={{color:"white"}}>0</p>
                </div>
                <div className="col">
                  Done
                  <p className="Rtablerow23"style={{color:"white"}}>0</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Row 2: 3 columns */}
        <div>
          <div
            style={{
              fontWeight: "bold",
            }}
          >
            Mr.Varun
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "0px 0px 3px",
              borderBottom: "1px solid #eee",
            }}
          >
            <div>BP: 120/80</div>
            <div>HR: 76</div>
            <div>SpO₂: 98%</div>
            <div>SpO₂: 98%</div>
          </div>
        </div>

        <div>
          <div
            style={{
              fontWeight: "bold",
              padding: "0px 0px 3px",
            }}
          >
            Mr.Varun
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "0px 0px 3px",
              borderBottom: "1px solid #eee",
            }}
          >
            <div>BP: 120/80</div>
            <div>HR: 76</div>
            <div>SpO₂: 98%</div>
            <div>SpO₂: 98%</div>
          </div>
        </div>

        <div>
          <div
            style={{
              fontWeight: "bold",
              padding: "0px 0px 3px",
            }}
          >
            Mr.Varun
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "0px 0px 3px",
              borderBottom: "1px solid #eee",
            }}
          >
            <div>BP: 120/80</div>
            <div>HR: 76</div>
            <div>SpO₂: 98%</div>
            <div>SpO₂: 98%</div>
          </div>
        </div>

        <div>
          <div
            style={{
              fontWeight: "bold",
              padding: "0px 0px 3px",
            }}
          >
            Mr.Varun
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "0px 0px 3px",
              borderBottom: "1px solid #eee",
            }}
          >
            <div>BP: 120/80</div>
            <div>HR: 76</div>
            <div>SpO₂: 98%</div>
            <div>SpO₂: 98%</div>
          </div>
        </div>

        <div>
          <div
            style={{
              fontWeight: "bold",
              padding: "0px 0px 3px",
            }}
          >
            Mr.Varun
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "0px 0px 3px",
              borderBottom: "1px solid #eee",
            }}
          >
            <div>BP: 120/80</div>
            <div>HR: 76</div>
            <div>SpO₂: 98%</div>
            <div>SpO₂: 98%</div>
          </div>
        </div>
      </div>

        </div>


      
    </>
  );
};

export default RightInfoCard;
