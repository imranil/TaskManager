import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import './navbar.css';
import { logout } from "../../reducers/userSlice";
import { getCounts } from "../../actions/task";
import { API_URL } from "../../config";
import avatarLogo from "../../assets/img/avatar.svg";
import Search from "./search/Search";
import Popup from "../popup/Popup";


const Navbar = () => {

    return (
        <header>
            <div className="container">
                <nav>
                    <Search />
                    <NavLink to="/calendar">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                            <path d="M5 4.5a.5.5 0 0 1-.5-.5V2a.5.5 0 0 1 1 0v2a.5.5 0 0 1-.5.5zM11 4.5a.5.5 0 0 1-.5-.5V2a.5.5 0 0 1 1 0v2a.5.5 0 0 1-.5.5z" /><path d="M13 14.5H3c-.827 0-1.5-.673-1.5-1.5V4c0-.827.673-1.5 1.5-1.5h10c.827 0 1.5.673 1.5 1.5v9c0 .827-.673 1.5-1.5 1.5zM3 3.5a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V4a.5.5 0 0 0-.5-.5H3z" /><path d="M14 6.5H2a.5.5 0 0 1 0-1h12a.5.5 0 0 1 0 1zM5.5 7.5h1v1h-1zM7.5 7.5h1v1h-1zM9.5 7.5h1v1h-1zM11.5 7.5h1v1h-1zM3.5 9.5h1v1h-1zM5.5 9.5h1v1h-1zM7.5 9.5h1v1h-1zM9.5 9.5h1v1h-1zM11.5 9.5h1v1h-1zM3.5 11.5h1v1h-1zM5.5 11.5h1v1h-1zM7.5 11.5h1v1h-1z" />
                        </svg>
                    </NavLink>
                    <DropDownMenu />
                </nav>
            </div>
        </header>
    );
};

const DropDownMenu = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const currentUser = useSelector(state => state.user.currentUser)
    const avatar = currentUser.avatar ? `${API_URL + currentUser.avatar}` : avatarLogo
    const [popupActive, setPopupActive] = useState(false)
    const [popupCoords, setPopupCoords] = useState()

    function toggleClickHandler(event) {
        const elementCoords = event.target.closest('.dropdown').getBoundingClientRect()
        setPopupCoords({ top: elementCoords.top + elementCoords.height + 10, left: elementCoords.left, width: elementCoords.width })
        setPopupActive(!popupActive)
    }

    function redirectHandler() {
        dispatch(getCounts())
        navigate(`/profile`)
        setPopupActive(false)
    }

    return (
        <div className="dropdown">
            <a className="dropdown-control" onClick={(event) => toggleClickHandler(event)}><img src={avatar} /> {currentUser.firstName}</a>
            <Popup active={popupActive} setActive={setPopupActive} coords={popupCoords} bcTransparent={true} >
                <div className="dropdown-content">
                    <a href={null} onClick={(event => redirectHandler(event))} className="dropdown-item">Профиль</a>
                    <a href={null} onClick={() => dispatch(logout())} className="dropdown-item">Выход</a>
                </div>
            </Popup>
        </div>
    );
}

export default Navbar;