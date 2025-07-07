// src/components/Footer.jsx
import React from 'react';
import './Footer.css'; // optional for styling

function Footer() {
  return (
    <div className=''>
    <footer className="footer text-center footer1">
      <div>© {new Date().getFullYear()} Your Company Name. All rights reserved.</div>
    </footer>
    </div>
  );
}

export default Footer;
