import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../Nabvar.css"; // Make sure to style your Navbar here
import { useAuth } from "../store/Auth";

const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false); // Sidebar state
  const { User, isLoggedIn } = useAuth(); // User and login state from context

  // Toggle sidebar
  const toggleSidebar = () => setSidebarOpen((prevState) => !prevState);

  // Collapse sidebar on small screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo_item">
          <i
            className={`bx ${sidebarOpen ? "bx-x" : "bx-menu"}`}
            id="sidebarOpen"
            onClick={toggleSidebar}
            ></i>
          <center>
          <span className="mx-3">Eminance 2025</span>
          </center>
        </div>
      </nav>

      {/* Sidebar */}
      <nav className={`sidebar ${sidebarOpen ? "open" : "close"}`}>
        <div className="menu_content">
          <ul className="menu_items">
            <li className="item">
              <Link to="/home" className="nav_link">
                <span className="navlink_icon">
                  <i className="bx bxs-home"></i>
                </span>
                <span className="navlink">Home</span>
              </Link>
            </li>
            <li className="item">
              <Link to="/profile" className="nav_link">
                <span className="navlink_icon">
                  <i className="bx bxs-user-circle"></i>
                </span>
                <span className="navlink">Profile</span>
              </Link>
            </li>
            <li className="item">
              <Link to="/cart" className="nav_link">
                <span className="navlink_icon">
                  <i className="bx bxs-cart"></i>
                </span>
                <span className="navlink">Cart</span>
              </Link>
            </li>
          </ul>

          {/* Conditional Links for control level 1 */}
          {User && User.controll === 1 && (
            <ul className="menu_items">
              <li className="item">
                <Link to="/participantList" className="nav_link">
                  <span className="navlink_icon">
                    <i className="bx bxs-magic-wand"></i>
                  </span>
                  <span className="navlink">Participant List</span>
                </Link>
              </li>
            </ul>
          )}

          {/* Conditional Links for control level 2 */}
          {User && User.controll === 2 && (
            <>
              <ul className="menu_items">
                <li className="item">
                  <Link to="/participantList" className="nav_link">
                    <span className="navlink_icon">
                      <i className="bx bxs-magic-wand"></i>
                    </span>
                    <span className="navlink">Participant List</span>
                  </Link>
                </li>
                <li className="item">
                  <Link to="/addTechEvent" className="nav_link">
                    <span className="navlink_icon">
                      <i className="bx bxs-book-add"></i>
                    </span>
                    <span className="navlink">Add Tech Events</span>
                  </Link>
                </li>
                <li className="item">
                  <Link to="/addNonTechEvent" className="nav_link">
                    <span className="navlink_icon">
                      <i className="bx bxs-book-add"></i>
                    </span>
                    <span className="navlink">Add Non-Tech Events</span>
                  </Link>
                </li>
              </ul>
            </>
          )}

          {/* Authentication Links */}
          {!isLoggedIn ? (
            <>
              <ul className="menu_items">
                <li className="item">
                  <Link to="/register" className="nav_link">
                    <span className="navlink_icon">
                      <i className="bx bxs-book-alt"></i>
                    </span>
                    <span className="navlink">Register</span>
                  </Link>
                </li>
                <li className="item">
                  <Link to="/login" className="nav_link">
                    <span className="navlink_icon">
                      <i className="bx bxs-log-in-circle"></i>
                    </span>
                    <span className="navlink">Login</span>
                  </Link>
                </li>
              </ul>
            </>
          ) : (
            <ul className="menu_items">
              <li className="item">
                <Link to="/logout" className="nav_link">
                  <span className="navlink_icon">
                    <i className="bx bxs-log-out-circle"></i>
                  </span>
                  <span className="navlink">Logout</span>
                </Link>
              </li>
            </ul>
          )}

          {/* Expand/Collapse Sidebar */}
          <div className="bottom_content">
            <div className="bottom expand_sidebar" onClick={() => setSidebarOpen(true)}>
              <span>Expand</span>
              <i className="bx bx-log-in"></i>
            </div>
            <div className="bottom collapse_sidebar" onClick={() => setSidebarOpen(false)}>
              <span>Hide</span>
              <i className="bx bx-log-out"></i>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
