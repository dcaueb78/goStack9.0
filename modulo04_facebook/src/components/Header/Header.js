import React from "react";
import Logo from "../../assets/facebook.svg";
import Profile from "../../assets/profile.jpeg";
import "./Header.css";

function Header() {
  return (
    <>
      <header id="main-header">
        <div className="main-content">
          <div className="logo">
            <img src={Logo} alt="Logo" />
          </div>
          <div className="side">
            <p>Meu perfil</p>
            <img src={Profile} alt="avatar twitter" />
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
