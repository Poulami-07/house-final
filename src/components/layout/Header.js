import React from 'react';
import {Link, NavLink} from "react-router-dom";
import { BsBuilding } from 'react-icons/bs';
import {Fabars} from 'react-icons/fa';
import "../../styles/Header.css";

const Header = () => {
  return (
    <>
   <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-sm-top">
    <div className='container'>
       <Link className="navbar-brand" to="/">
        <BsBuilding size={30} className='me-2'/>
            House MarketPlace
          </Link>
    </div>
      <div className="container-fluid ">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon">
            {/* <Fabars/> */}
          </span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          {/* <Link className="navbar-brand" to="/">
            House MarketPlace
          </Link> */}
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              {/* <Link className="nav-link active" aria-current="page" to="/"> */}
                  <NavLink
                  className={`nav-link ${({ isActive}) =>
                isActive ? "active" : "inactive"}`}
                aria-current="page" to="/">
                  Explore
                  </NavLink>
              {/* </Link> */}
            </li>
            <li className="nav-item">
              {/* <Link className="nav-link" to="/offers"> */}
              <NavLink
                  className={`nav-link ${({ isActive}) =>
                isActive ? "active" : "inactive"}`} to="/offers">
                  Offers
                </NavLink>
                
              {/* </Link> */}
            </li>
            <li className="nav-item">
              {/* <Link className="nav-link" to="/profile"> */}
              <NavLink
                  className={`nav-link ${({ isActive}) =>
                isActive ? "active" : "inactive"}`} to="/profile">
                     Profile
                </NavLink>
               
              {/* </Link> */}
            </li>
          </ul>
          
        </div>
      </div>
    </nav>
    </>
  );
};

export default Header;