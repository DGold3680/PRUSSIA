import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../Firebase/config";
import { useAuthContext } from "../hooks/useAuthContext";

import "./navbar.css";

export default function Navbar() {
  const { dispatch, user } = useAuthContext();
  const [sidebar, setSidebar] = useState(false);
  const navigate = useNavigate();
  const hamIcon = useRef(null);

  const closeSidebar = (e) => {
    if(sidebar){
    setSidebar(false);
    hamIcon.current.shadowRoot.querySelector("div").click();
    console.log(hamIcon.current.shadowRoot.querySelector("div"));
  }};

  const handleLogout = (e) => {
    e.preventDefault();
    signOut(auth)
      .then(() => {
        if (user) {
          dispatch({ type: "LOGOUT" });
          closeSidebar()
          return navigate("/")
        }
      })
      .catch((error) => {
        // An error happened.
      });
  };
  return (
    <div className="navbar">
      <Link to="/" className="logo" onClick={closeSidebar}>    
          <img src="hero2.jpeg" className="logo-img" alt="" />
      </Link>
      <div className={(sidebar && "tint") || (!sidebar && "no-tint")}></div>
      <ham-icon
        ref={hamIcon}
        class="ham-icon"
        onClick={(e) => {
          setSidebar(!sidebar);
          !sidebar
            ? document.body.classList.add("no-scroll")
            : document.body.classList.remove("no-scroll");
        }}
      />
      <div className={(sidebar && "sidebar-open") || (!sidebar && "sidebar")}>
        <div className="nav-box">
        <Link to="/" className="logo2" onClick={closeSidebar}>    
          <img src="hero2.jpeg" className="logo-img" alt="" />
      </Link>
          <Link to="/" className="nav-link" onClick={closeSidebar}>
            Home
          </Link>
          <a href="#about" className="nav-link" onClick={closeSidebar}>
            About
          </a>
          <a href="#contact" className="nav-link" onClick={closeSidebar}>
            Contact
          </a>
          {user && (
            <Link to="/create" className="nav-link" onClick={closeSidebar}>
              Add item
            </Link>
          )}
          </div>
          <div className="auth-box">
          {!user && (
            <Link to="/login" className="nav-link" onClick={closeSidebar}>
              Login
            </Link>
          )}
          {user && (
            <Link to="/" className="nav-link" onClick={handleLogout}>
              Logout
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
