import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/articles">Articles</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/create-account">Create Account</Link>
        </li>
        <li>
          <Link to="/upload-resume">Upload Resume</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
