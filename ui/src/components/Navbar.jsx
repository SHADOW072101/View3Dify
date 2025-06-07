import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

// const Nav = styled.nav`
//   background: #1e1e1e;
//   padding: 15px 30px;
//   display: flex;
//   justify-content: space-between; /* ✅ Brand on left, links on right */
//   align-items: center;
//   position: fixed;
//   top: 0;
//   left: 0; /* ✅ Ensures it starts from the left */
//   width: 100vw; /* ✅ Full width */
//   box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3);
//   z-index: 1000; /* ✅ Ensures navbar stays on top */
// `;

const Nav = styled.nav`
  background: rgba(42, 41, 41, 0.3); /* Semi-transparent dark background */
  backdrop-filter: blur(20px); /* This creates the blur effect */
  -webkit-backdrop-filter: blur(10px); /* For Safari support */
  padding: 15px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  z-index: 1000;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1); /* Optional: subtle border */
`;

const Brand = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: rgb(0, 0, 0);
  cursor: pointer;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 20px;

  a {
    text-decoration: none;
    color: rgb(0, 0, 0); /* ✅ White text color */
    font-size: 16px;
    font-weight: 500;
    transition: color 0.3s ease-in-out;

    &:hover {
      color: #ffcc00; /* ✅ Highlight on hover */
    }
  }
`;

const Navbar = () => {
  return (
    <Nav>
      <Brand>View3Dify</Brand>
      <NavLinks>
        <Link to="/">Home</Link>
        <Link to="/ObjUploader">3DViewer</Link>
        <Link to="/profile">Profile</Link>
      </NavLinks>
    </Nav>
  );
};

export default Navbar;
