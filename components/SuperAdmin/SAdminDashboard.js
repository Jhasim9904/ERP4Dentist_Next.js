import React from 'react';
import './SAdminDashboard.css'; // Make sure to create this CSS file

const SAdminDashboard = () => {
  return (
    <div className="dashboard-container">
      {/* Top Section */}
      <div className="dashboard-header-row">
        <div className="welcome-card">
          <div className="welcome-text-content">
            <h2>Congratulations Super Admin! <span role="img" aria-label="party popper">🎉</span></h2>
            <p>You have done <span className="highlight">72%</span> more sales today. Check your new badge in your profile.</p>
            <button className="view-badges-button">View Badges</button>
          </div>
          <div className="welcome-image">
            {/* Replace with your actual image path or SVG */}
            <img src="/path/to/your/admin-illustration.png" alt="Admin Illustration" />
          </div>
        </div>

        <div className="summary-cards-container">
          <div className="summary-card clinic-card">
            <div className="summary-icon-wrapper green">
              <span className="material-icons">schedule</span> {/* Replace with actual icon component if using */}
            </div>
            <div className="summary-details">
              <span className="material-icons more-options">more_vert</span>
              <p className="summary-label">Clinics</p>
              <p className="summary-value">25</p>
            </div>
          </div>
          <div className="summary-card user-card">
            <div className="summary-icon-wrapper purple">
              <span className="material-icons">people</span> {/* Replace with actual icon component if using */}
            </div>
            <div className="summary-details">
              <span className="material-icons more-options">more_vert</span>
              <p className="summary-label">Users</p>
              <p className="summary-value">26</p>
            </div>
          </div>
        </div>
      </div>

      {/* Middle and Bottom Section */}
      <div className="dashboard-content-row">
        {/* Left Side - Total Revenue */}
        <div className="revenue-card">
          <h3>Total Revenue</h3>
          <div className="revenue-legend">
            <span className="legend-item"><span className="dot blue"></span> 2021</span>
            <span className="legend-item"><span className="dot purple"></span> 2020</span>
          </div>
          <div className="revenue-chart">
            {/* This is a simplified representation. For actual charts, use a library like Chart.js or Recharts */}
            <div className="y-axis">
              <span>30</span>
              <span>20</span>
              <span>10</span>
              <span>0</span>
              <span>-10</span>
              <span>-20</span>
            </div>
            <div className="bars-container">
              {/* Example Bars - You'd map over data for actual implementation */}
              <div className="bar-group">
                <div className="bar blue" style={{ height: '50%' }}></div>
                <div className="bar cyan" style={{ height: '30%' }}></div>
                <span className="month">Jan</span>
              </div>
              <div className="bar-group">
                <div className="bar blue" style={{ height: '20%' }}></div>
                <div className="bar cyan" style={{ height: '20%' }}></div>
                <span className="month">Feb</span>
              </div>
              <div className="bar-group">
                <div className="bar blue" style={{ height: '40%' }}></div>
                <div className="bar cyan" style={{ height: '15%' }}></div>
                <span className="month">Mar</span>
              </div>
              <div className="bar-group">
                <div className="bar blue" style={{ height: '70%' }}></div>
                <div className="bar cyan" style={{ height: '25%' }}></div>
                <span className="month">Apr</span>
              </div>
              <div className="bar-group">
                <div className="bar blue" style={{ height: '45%' }}></div>
                <div className="bar cyan" style={{ height: '10%' }}></div>
                <span className="month">May</span>
              </div>
              <div className="bar-group">
                <div className="bar blue" style={{ height: '35%' }}></div>
                <div className="bar cyan" style={{ height: '5%' }}></div>
                <span className="month">Jun</span>
              </div>
              <div className="bar-group">
                <div className="bar blue" style={{ height: '25%' }}></div>
                <div className="bar cyan" style={{ height: '15%' }}></div>
                <span className="month">Jul</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Payments, Help, Growth, Leads */}
        <div className="dashboard-right-column">
          <div className="summary-cards-lower">
            <div className="summary-card payment-card">
              <div className="summary-icon-wrapper red">
                <span className="material-icons">payments</span>
              </div>
              <div className="summary-details">
                <span className="material-icons more-options">more_vert</span>
                <p className="summary-label">Payments</p>
                <p className="summary-value">1</p>
              </div>
            </div>
            <div className="summary-card help-card">
              <div className="summary-icon-wrapper blue-light">
                <span className="material-icons">help_outline</span>
              </div>
              <div className="summary-details">
                <span className="material-icons more-options">more_vert</span>
                <p className="summary-label">Help</p>
                <p className="summary-value">4</p>
              </div>
            </div>
          </div>

          <div className="growth-card">
            <div className="growth-header">
              <select className="year-select">
                <option value="2022">2022</option>
                <option value="2023">2023</option>
              </select>
            </div>
            <div className="growth-chart-container">
              {/* This is a simple SVG representation for the donut chart */}
              <svg viewBox="0 0 36 36" className="circular-chart">
                <path
                  className="circle-bg"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="circle"
                  strokeDasharray="78, 100" // 78% of 100
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <text x="18" y="20.35" className="percentage">78%</text>
              </svg>
              <p className="growth-label">Growth</p>
            </div>
            <p className="company-growth">62% Company Growth</p>
            <div className="growth-financials">
              <p>2022 <br/> <span className="value">$32.5k</span></p>
              <p>2021 <br/> <span className="value">$41.2k</span></p>
            </div>
          </div>

          <div className="leads-card">
            <h3>Leads</h3>
            <span className="material-icons more-options">more_vert</span>
            <p className="leads-value">8</p>
            <div className="leads-graph">
              {/* This is a very simplified SVG for the wavy line. For real graphs, use a library. */}
              <svg viewBox="0 0 100 30" preserveAspectRatio="none">
                <path d="M0,20 Q25,0 50,20 T100,20" fill="none" stroke="#FFBF00" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SAdminDashboard;