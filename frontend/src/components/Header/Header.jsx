import React, { useRef } from "react";
import { Container } from "reactstrap";
import "./header.css";
import { useAppState } from "../../app/App";
import { useNavigate } from "react-router-dom";

const navLinks = [
  {
    display: "Home",
    url: "/",
  },
  {
    display: "About",
    url: "/about",
  },

  {
    display: "Courses",
    url: "#",
  },
  {
    display: "Pages",
    url: "#",
  },
  {
    display: "Blog",
    url: "#",
  },
 
];

const Header = () => {

  const{state,setState}=useAppState();
 
  const menuRef = useRef();
  const navigate = useNavigate();
  const menuToggle = () => menuRef.current.classList.toggle("active__menu");

  return (
    <header className="header">
      <Container>
        <div className="navigation d-flex align-items-center justify-content-between">
          <div className="logo">
            <h2 className=" d-flex align-items-center gap-1">
              <i class="ri-pantone-line"></i> Learners.
            </h2>
        </div>

          <div className="nav d-flex align-items-center gap-5">
            <div className="nav__menu" ref={menuRef} onClick={menuToggle}>
              <ul className="nav__list">
                {navLinks.map((item, index) => (
                  <li key={index} className="nav__item">
                    <a href={item.url}>{item.display}</a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="nav__right">
              <p className="mb-0 d-flex align-items-center gap-2 nav__item">

              {state.user ? (
            
            <div>
              <span>Welcome, {state.user.username}</span>
              <button
                onClick={() => {
                  // Clear user state
                  setState((prev) => ({ ...prev, user: null }));

                  // Remove user from localStorage
                  localStorage.removeItem('user');

                  // Redirect to the logout page
                  navigate('/');
                }}
              >
                Logout
              </button>
            </div>
          ) : (
         
            <a href="/login">Log in</a>
            
          )}
             
              </p>
             
            </div>
           
          </div>

          <div className="mobile__menu">
            <span>
              <i class="ri-menu-line" onClick={menuToggle}></i>
            </span>
          </div>
        </div> 
      </Container>
    </header>
  );
};

export default Header;
