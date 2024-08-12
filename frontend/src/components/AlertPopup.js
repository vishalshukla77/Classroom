import React, { useState, useEffect } from 'react';
import { FaCheckCircle } from 'react-icons/fa';

const AlertPopup = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div style={popupStyle}>
      <div style={contentStyle}>
        <FaCheckCircle color="#4caf50" size={40} />
        <span style={{ marginLeft: '10px' }}>Principal's account is already created.</span>
        <button onClick={() => setVisible(false)} style={closeButtonStyle}>&times;</button>
      </div>
    </div>
  );
};

const popupStyle = {
  position: 'fixed',
  top: '20px',
  left: '50%',
  transform: 'translateX(-50%)',
  zIndex: 1050,
  backgroundColor: '#ffffff',
  padding: '15px',
  borderRadius: '8px',
  border: '1px solid #4caf50',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  minWidth: '400px',
};

const contentStyle = {
  display: 'flex',
  alignItems: 'center',
};

const closeButtonStyle = {
  background: 'none',
  border: 'none',
  fontSize: '20px',
  marginLeft: '10px',
  cursor: 'pointer',
};

export default AlertPopup;
