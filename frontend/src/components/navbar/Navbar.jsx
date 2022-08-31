import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import './navbar.css';
import { logout } from "../../reducers/userSlice";
import { API_URL } from "../../config";
import avatarLogo from "../../assets/img/avatar.svg";
import Search from "./search/Search";


const Navbar = () => {

    return (
        <header>
            <div className="container">
                <nav>
                    <Search/>
                    <NavLink to="/calendar">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                            <path d="M5 4.5a.5.5 0 0 1-.5-.5V2a.5.5 0 0 1 1 0v2a.5.5 0 0 1-.5.5zM11 4.5a.5.5 0 0 1-.5-.5V2a.5.5 0 0 1 1 0v2a.5.5 0 0 1-.5.5z" /><path d="M13 14.5H3c-.827 0-1.5-.673-1.5-1.5V4c0-.827.673-1.5 1.5-1.5h10c.827 0 1.5.673 1.5 1.5v9c0 .827-.673 1.5-1.5 1.5zM3 3.5a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V4a.5.5 0 0 0-.5-.5H3z" /><path d="M14 6.5H2a.5.5 0 0 1 0-1h12a.5.5 0 0 1 0 1zM5.5 7.5h1v1h-1zM7.5 7.5h1v1h-1zM9.5 7.5h1v1h-1zM11.5 7.5h1v1h-1zM3.5 9.5h1v1h-1zM5.5 9.5h1v1h-1zM7.5 9.5h1v1h-1zM9.5 9.5h1v1h-1zM11.5 9.5h1v1h-1zM3.5 11.5h1v1h-1zM5.5 11.5h1v1h-1zM7.5 11.5h1v1h-1z" />
                        </svg>
                    </NavLink>
                    <NavLink to="/task/create">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 29 29">
                            <path d="M14.5 27.071c-6.893 0-12.5-5.607-12.5-12.5s5.607-12.5 12.5-12.5S27 7.678 27 14.571s-5.607 12.5-12.5 12.5zm0-23c-5.79 0-10.5 4.71-10.5 10.5s4.71 10.5 10.5 10.5S25 20.36 25 14.571s-4.71-10.5-10.5-10.5z" />
                            <path d="M14.5 21.571a1 1 0 0 1-1-1v-12a1 1 0 0 1 2 0v12a1 1 0 0 1-1 1z" />
                            <path d="M20.5 15.571h-12a1 1 0 0 1 0-2h12a1 1 0 0 1 0 2z" />
                        </svg>
                    </NavLink>
                    <DropDownMenu />
                </nav>
            </div>
        </header>
    );
};

const DropDownMenu = () => {
    const currentUser = useSelector(state => state.user.currentUser)
    const avatar = currentUser.avatar ? `${API_URL + currentUser.avatar}` : avatarLogo
    const [display, setDisplay] = useState('none')
    const dispatch = useDispatch()

    function dropDownHandler() {
        if (display === 'none') {
            setDisplay('block')
        } else {
            setDisplay('none')
        }
    }

    return (
        <div className="dropdown">
            <a className="dropdown-control" onClick={dropDownHandler}><img src={avatar} /> {currentUser.firstName}</a>
            <div className="dropdown-content" style={{ display: display }}>
                <NavLink to="/profile" className="dropdown-item">Профиль</NavLink>
                <a href={null} onClick={() => dispatch(logout())} className="dropdown-item">Выход</a>
            </div>
        </div>
    );
}

export default Navbar;