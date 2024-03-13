import React from "react";
import { Link, NavLink } from "react-router-dom";
import style from "./Navbar.module.css";
import imagepic from "./images/Navbar.png"
function Navbar() {
  return (
    <nav className={"navbar"}>
      <div className="container-fluid">
        <div className="navbar-header">
        <Link to="/"> <div className={style.pranit}> 
        <img src={imagepic}/>
        </div>
            
          </Link> 
        </div>
        <div className="navbar-right">
          <Link to="/signup">
            <button className="btn btn-outline-primary">SignUp</button>
          </Link>
          <Link to={"/login"}>
            <button className="btn btn-outline-success">LogIn</button>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
