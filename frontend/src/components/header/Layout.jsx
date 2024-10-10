import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import './Layout.css'
const Layout = () => {
  const navigate = useNavigate();

  const logout = () => {
    sessionStorage.clear();
    navigate('/login')
  }

  return (
    <>
      <header className="header">
        <div className="brand">
          <img className="logo" src="micro.svg" alt="" />
          <h3 className="nav-title">PhD Research Tool</h3>
        </div>          <ul className="nav-links">
          <li><a href="/home">Home</a></li>
          <li><a href="/dashboard">Dashboard</a></li>
          <li><a href="/bookmarks">Library</a></li>
        </ul>
        <button onClick={logout} style={{ borderRadius: '10px' }}>Logout</button>
      </header>
      <Outlet></Outlet>
    </>
  );
};

export default Layout;