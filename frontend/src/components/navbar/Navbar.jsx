import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import './navbar.css';
import { logout } from "../../reducers/userSlice";
import { showLoader } from "../../reducers/appSlice";
import { API_URL } from "../../config";
import avatarLogo from "../../assets/img/avatar.svg";


const Navbar = () => {
    const isAuth = useSelector(state => state.user.isAuth)
    const currentUser = useSelector(state => state.user.currentUser)
    const dispatch = useDispatch()
    const avatar = currentUser.avatar ? `${API_URL + currentUser.avatar}` : avatarLogo

    return (
        <nav>
            <div className="primary">
                {isAuth && <NavLink to="/">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                        <path d="M21 13v10h-6v-6h-6v6h-6v-10h-3l12-12 12 12h-3zm-1-5.907v-5.093h-3v2.093l3 3z" />
                    </svg>
                </NavLink>}
                {isAuth && <a href={null} onClick={() => dispatch(logout())}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                        <path d="M16 9v-4l8 7-8 7v-4h-8v-6h8zm-16-7v20h14v-2h-12v-16h12v-2h-14z" />
                    </svg>
                </a>}
            </div>
            <div className="secondary">
                {isAuth && <NavLink to="/profile"><img src={avatar} /></NavLink>}
            </div>
        </nav>
    );
};

export default Navbar;