import React from "react";
import { Link, useLocation } from "react-router-dom";

interface NavLinksProps {
  isAuthenticated: boolean;
}

const NavLinks: React.FC<NavLinksProps> = ({ isAuthenticated }) => {
  const location = useLocation();
  return (
    <>
      <Link to="/" className={`nav-glass-link${location.pathname === '/' ? ' nav-glass-link-active' : ''}`}>Home</Link>
      <Link to="/events" className={`nav-glass-link${location.pathname.startsWith('/events') ? ' nav-glass-link-active' : ''}`}>Events</Link>
      {isAuthenticated && (
        <Link to="/my-events" className={`nav-glass-link${location.pathname.startsWith('/my-events') ? ' nav-glass-link-active' : ''}`}>My Events</Link>
      )}
      <Link to="/about" className={`nav-glass-link${location.pathname === '/about' ? ' nav-glass-link-active' : ''}`}>About</Link>
    </>
  );
};

export default NavLinks; 