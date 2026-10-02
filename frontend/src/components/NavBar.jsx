// Top menu bar - Owner: SHALOM

import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

function NavBar() {
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);

  function handleLogout() {
    logout();
    setMenuOpen(false);
    navigate("/");
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  function isActive(path) {
    return location.pathname === path;
  }

  return (
    <header className="site-nav">

      {/* Normal navbar */}
      <div className="nav-container">

        <Link to="/" className="brand" onClick={closeMenu}>
          <span className="brand-mark"></span>
          <span>ArtMind</span>
        </Link>

        {/* Desktop navigation */}
        <div className="desktop-nav">

          <nav className="nav-links">
            <Link
              to="/gallery"
              className={`nav-link ${isActive("/gallery") ? "active" : ""}`}
            >
              Gallery
            </Link>

            <Link
              to="/upload"
              className={`nav-link ${isActive("/upload") ? "active" : ""}`}
            >
              Upload
            </Link>

            <Link
              to="/chatbot"
              className={`nav-link ${isActive("/chatbot") ? "active" : ""}`}
            >
              Chat
            </Link>

            <Link
              to="/dashboard"
              className={`nav-link ${isActive("/dashboard") ? "active" : ""}`}
            >
              Dashboard
            </Link>
          </nav>

          <div className="desktop-user">
            {user ? (
              <>
                <span className="user-name">{user.username}</span>

                <button
                  type="button"
                  className="sign-out-btn"
                  onClick={handleLogout}
                >
                  Sign out
                </button>
              </>
            ) : (
              <Link to="/login" className="sign-in-btn">
                Sign in
              </Link>
            )}
          </div>

        </div>

        {/* Hamburger */}
        <button
          type="button"
          className="nav-toggle"
          aria-label="Open navigation menu"
          onClick={() => setMenuOpen(true)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

      </div>


      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>

        <div className="mobile-menu-header">

          <Link to="/" className="brand" onClick={closeMenu}>
            <span className="brand-mark"></span>
            <span>ArtMind</span>
          </Link>

          <button
            type="button"
            className="mobile-close"
            aria-label="Close navigation menu"
            onClick={closeMenu}
          >
            ×
          </button>

        </div>

        <nav className="mobile-links">

          <Link
            to="/gallery"
            className={`mobile-link ${
              isActive("/gallery") ? "active" : ""
            }`}
            onClick={closeMenu}
          >
            Gallery
          </Link>

          <Link
            to="/upload"
            className={`mobile-link ${
              isActive("/upload") ? "active" : ""
            }`}
            onClick={closeMenu}
          >
            Upload
          </Link>

          <Link
            to="/chatbot"
            className={`mobile-link ${
              isActive("/chatbot") ? "active" : ""
            }`}
            onClick={closeMenu}
          >
            Chat
          </Link>

          <Link
            to="/dashboard"
            className={`mobile-link ${
              isActive("/dashboard") ? "active" : ""
            }`}
            onClick={closeMenu}
          >
            Dashboard
          </Link>

        </nav>

        {/* Bottom user section */}
        <div className="mobile-user">

          {user && (
            <span className="mobile-username">
              {user.username}
            </span>
          )}

          {user ? (
            <button
              type="button"
              className="mobile-signout"
              onClick={handleLogout}
            >
              Sign out
            </button>
          ) : (
            <Link
              to="/login"
              className="mobile-signin"
              onClick={closeMenu}
            >
              Sign in
            </Link>
          )}

        </div>

      </div>

    </header>
  );
}

export default NavBar;