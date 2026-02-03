import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Briefcase, User, LogOut, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="navbar-logo">
          <Briefcase size={28} />
          <span className="gradient-text">JobPortal</span>
        </Link>

        {/* Desktop Menu */}
        <div className="navbar-menu">
          <Link to="/jobs" className="navbar-link">Browse Jobs</Link>
          
          {user ? (
            <>
              {user.role === 'admin' ? (
                <>
                  <Link to="/admin/dashboard" className="navbar-link">
                    <LayoutDashboard size={18} />
                    Dashboard
                  </Link>
                  <Link to="/admin/jobs" className="navbar-link">Manage Jobs</Link>
                </>
              ) : (
                <>
                  <Link to="/dashboard" className="navbar-link">
                    <User size={18} />
                    Dashboard
                  </Link>
                  <Link to="/applications" className="navbar-link">My Applications</Link>
                </>
              )}
              <button onClick={handleLogout} className="navbar-link navbar-logout">
                <LogOut size={18} />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="navbar-link">Login</Link>
              <Link to="/register" className="navbar-btn">Get Started</Link>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="navbar-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="navbar-mobile">
          <Link to="/jobs" className="navbar-mobile-link" onClick={() => setIsMenuOpen(false)}>
            Browse Jobs
          </Link>
          
          {user ? (
            <>
              {user.role === 'admin' ? (
                <>
                  <Link to="/admin/dashboard" className="navbar-mobile-link" onClick={() => setIsMenuOpen(false)}>
                    Dashboard
                  </Link>
                  <Link to="/admin/jobs" className="navbar-mobile-link" onClick={() => setIsMenuOpen(false)}>
                    Manage Jobs
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/dashboard" className="navbar-mobile-link" onClick={() => setIsMenuOpen(false)}>
                    Dashboard
                  </Link>
                  <Link to="/applications" className="navbar-mobile-link" onClick={() => setIsMenuOpen(false)}>
                    My Applications
                  </Link>
                </>
              )}
              <button onClick={handleLogout} className="navbar-mobile-link">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="navbar-mobile-link" onClick={() => setIsMenuOpen(false)}>
                Login
              </Link>
              <Link to="/register" className="navbar-mobile-link" onClick={() => setIsMenuOpen(false)}>
                Get Started
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
