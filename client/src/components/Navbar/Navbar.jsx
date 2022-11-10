import React from "react";
import "./navbar.scss";

import Logo from "../../assets/img/logo.png";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "../../redux/actions/userActions";

import userAvatar from "../../assets/img/user avatar.png";
import { API_URL } from "../../config";

const Navbar = () => {
  const { isAuth, currentUser } = useSelector(({ user }) => user);
  const dispatch = useDispatch();

  const avatar = currentUser.avatar
    ? `${API_URL}/${currentUser.avatar}`
    : userAvatar;

  return (
    <div className="navbar">
      <div className="container">
        <NavLink className="navbar__link" to="/">
          <img src={Logo} alt="logo.png" className="navbar__logo" />
          <div className="navbar__header">MERN CLOUD</div>
        </NavLink>
        {!isAuth ? (
          <>
            <div className="navbar__login">
              <NavLink to="/login">Login</NavLink>
            </div>
            <div className="navbar__registration">
              <NavLink to="/registration">Registration</NavLink>
            </div>
          </>
        ) : (
          <>
            <div
              style={{ cursor: "pointer" }}
              className="navbar__login"
              onClick={() => dispatch(logoutAction())}
            >
              Log out
            </div>
            <NavLink to="/profile" className="avatar">
              {<img src={avatar} alt="user avatar.png" />}
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
