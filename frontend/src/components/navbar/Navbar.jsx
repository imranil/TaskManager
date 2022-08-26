import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import './navbar.css';
import { logout } from "../../reducers/userSlice";
import { showLoader } from "../../reducers/appSlice";
import { API_URL } from "../../config";
import avatarLogo from "../../assets/img/avatar.svg";


const Navbar = () => {
    const [searchInput, setSearchInput] = useState('')

    function searchChangeHandler(event) {
        setSearchInput(event.target.value)
    }

    return (
        <header>
            <div className="container">
                <nav>
                    <div className="input-area">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 101 101">
                            <path d="M63.3 59.9c3.8-4.6 6.2-10.5 6.2-17 0-14.6-11.9-26.5-26.5-26.5S16.5 28.3 16.5 42.9 28.4 69.4 43 69.4c6.4 0 12.4-2.3 17-6.2l20.6 20.6c.5.5 1.1.7 1.7.7.6 0 1.2-.2 1.7-.7.9-.9.9-2.5 0-3.4L63.3 59.9zm-20.4 4.7c-12 0-21.7-9.7-21.7-21.7s9.7-21.7 21.7-21.7 21.7 9.7 21.7 21.7-9.7 21.7-21.7 21.7z" />
                        </svg>
                        <input value={searchInput} onChange={(event) => searchChangeHandler(event)} className="search" type='search' placeholder="Поиск" />
                    </div>
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
                <a className="dropdown-item" href={null}>Профиль</a>
                <a className="dropdown-item" onClick={() => dispatch(logout())}>Выход</a>
            </div>
        </div>
    );
}

export default Navbar;