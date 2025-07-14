import React, { useEffect, useState } from 'react';
import './SAdminDashboard.css'; // Custom CSS file for styling

const SAdminDashboard = () => {
  // State to control bar heights for animation
  const [barHeights, setBarHeights] = useState(
    Array(7).fill({ blue: 0, cyan: 0 }) // Initialize all heights to 0
  );

  // Define target heights for the bars (percentages)
  const targetBarHeights = [
    { blue: 50, cyan: 30 }, // Jan
    { blue: 20, cyan: 20 }, // Feb
    { blue: 40, cyan: 15 }, // Mar
    { blue: 70, cyan: 25 }, // Apr
    { blue: 45, cyan: 10 }, // May
    { blue: 35, cyan: 5 },  // Jun
    { blue: 25, cyan: 15 }, // Jul
  ];

  // Trigger animation on component mount
  useEffect(() => {
    // A small delay to ensure the component is rendered before starting animation
    const timer = setTimeout(() => {
      setBarHeights(targetBarHeights);
    }, 100); // Adjust delay as needed

    return () => clearTimeout(timer); // Cleanup timeout
  }, []);

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];

  return (
    <div className="dashboard-container">
      {/* Top Section */}
      <div className="dashboard-header-row">
        {/* Welcome Card */}
        <div className="welcome-card">
          <div className="welcome-text-content">
            <h2>Congratulations Super Admin!
              {/* PartyPopper Icon (Inline SVG) */}
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-icon yellow-icon">
                <path d="M5.8 11.3 2 22l10.7-3.79" />
                <path d="M11.2 18.2L22 14.4 14.39 3.79" />
                <path d="M2 14h10" />
                <path d="M12 2v10" />
                <path d="M18 7h.01" />
                <path d="M18 11h.01" />
                <path d="M22 7h.01" />
                <path d="M22 11h.01" />
                <path d="M18 15h.01" />
                <path d="M22 15h.01" />
                <path d="M14 18h.01" />
                <path d="M14 22h.01" />
                <path d="M18 19h.01" />
                <path d="M18 22h.01" />
              </svg>
            </h2>
            <p>You have done <span className="highlight">72%</span> more sales today. Check your new badge in your profile.</p>
            <button className="view-badges-button">View Badges</button>
          </div>
          <div className="welcome-image">
            {/* Placeholder image, replace with your actual illustration */}
            <img src="https://placehold.co/180x150/E0F2F7/3B5998?text=Admin+Illustration" alt="Admin Illustration" />
          </div>
        </div>

        {/* Summary Cards Container (Clinics, Users) */}
        <div className="summary-cards-container">
          {/* Clinic Card */}
          <div className="summary-card clinic-card">
            <div className="summary-icon-wrapper green">
              {/* Clock Icon (Inline SVG) */}
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon-large">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
            </div>
            <div className="summary-details">
              {/* MoreVertical Icon (Inline SVG) */}
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="more-options-icon">
                <circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/>
              </svg>
              <p className="summary-label">Clinics</p>
              <p className="summary-value">25</p>
            </div>
          </div>
          {/* User Card */}
          <div className="summary-card user-card">
            <div className="summary-icon-wrapper purple">
              {/* Users Icon (Inline SVG) */}
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon-large">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </div>
            <div className="summary-details">
              {/* MoreVertical Icon (Inline SVG) */}
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="more-options-icon">
                <circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/>
              </svg>
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
            <span className="legend-item"><span className="dot cyan"></span> 2020</span>
          </div>
          <div className="revenue-chart">
            {/* Y-axis */}
            <div className="y-axis">
              <span>30</span>
              <span>20</span>
              <span>10</span>
              <span>0</span>
              <span>-10</span>
              <span>-20</span>
            </div>
            {/* Bars Container */}
            <div className="bars-container">
              {months.map((month, index) => (
                <div key={month} className="bar-group">
                  <div
                    className="bar blue-bar"
                    style={{ height: barHeights[index].blue + '%' }}
                  ></div>
                  <div
                    className="bar cyan-bar"
                    style={{ height: barHeights[index].cyan + '%' }}
                  ></div>
                  <span className="month">{month}</span>
                </div>
              ))}
            </div>
          <div className="growth-card">
            <div className="growth-header">
              <div className="select-wrapper">
                <select className="year-select">
                  <option value="2022">2022</option>
                  <option value="2023">2023</option>
                </select>
                {/* Custom dropdown arrow handled by CSS ::after */}
              </div>
            </div>
            <div className="growth-chart-container">
              <svg viewBox="0 0 36 36" className="circular-chart">
                <path
                  className="circle-bg"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="circle"
                  strokeDasharray="78, 100" // 78% of 100
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  transform="rotate(-90 18 18)"
                />
                <text x="18" y="20.35" className="percentage" dominantBaseline="middle" textAnchor="middle">78%</text>
              </svg>
              <p className="growth-label">Growth</p>
            </div>
            <p className="company-growth">62% Company Growth</p>
            <div className="growth-financials">
              <p>2022 <br/><span className="value">$32.5k</span></p>
              <p>2021 <br/><span className="value">$41.2k</span></p>
            </div>
          </div>
          </div>
        </div>

        {/* Right Side Column */}
        <div className="dashboard-right-column">
          {/* Summary Cards (Payments, Help) */}
          <div className="summary-cards-lower">
            {/* Payment Card */}
            <div className="summary-card payment-card">
              <div className="summary-icon-wrapper red">
                {/* CreditCard Icon (Inline SVG) */}
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon-large">
                  <rect width="20" height="14" x="2" y="5" rx="2"/>
                  <line x1="2" x2="22" y1="10" y2="10"/>
                </svg>
              </div>
              <div className="summary-details">
                {/* MoreVertical Icon (Inline SVG) */}
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="more-options-icon">
                  <circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/>
                </svg>
                <p className="summary-label">Payments</p>
                <p className="summary-value">1</p>
              </div>
            </div>
            {/* Help Card */}
            <div className="summary-card help-card">
              <div className="summary-icon-wrapper blue-light">
                {/* HelpCircle Icon (Inline SVG) */}
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon-large">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M9.09 9a3 3 0 0 1 5.81 1c0 2-3 3-3 3"/>
                  <path d="M12 17h.01"/>
                </svg>
              </div>
              <div className="summary-details">
                {/* MoreVertical Icon (Inline SVG) */}
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="more-options-icon">
                  <circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/>
                </svg>
                <p className="summary-label">Help</p>
                <p className="summary-value">4</p>
              </div>
            </div>
          </div>

          {/* Growth Card */}


          {/* Leads Card */}
          <div className="leads-card">
            <h3>Leads</h3>
            {/* MoreVertical Icon (Inline SVG) */}
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="more-options-icon">
              <circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/>
            </svg>
            <p className="leads-value">8</p>
            <div className="leads-graph">
              <svg viewBox="0 0 100 30" preserveAspectRatio="none" className="leads-svg">
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