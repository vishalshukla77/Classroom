import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <div className="d-flex w-100 justify-content-between align-items-center">
          <Link className="navbar-brand" to="/">Home</Link>
          <Link className="btn btn-outline-primary" to="/login">Login</Link>
        </div>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {/* Additional nav items can be added here */}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
