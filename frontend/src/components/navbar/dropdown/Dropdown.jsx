import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../reducers/userSlice";
import { API_URL } from "../../../config";
import avatarLogo from "../../../assets/img/avatar.svg";
import Popup from "../../popup/Popup";


const Dropdown = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const currentUser = useSelector(state => state.user.currentUser)
    const avatar = currentUser.avatar ? `${API_URL + currentUser.avatar}` : avatarLogo
    const [popupActive, setPopupActive] = useState(false)
    const [popupCoords, setPopupCoords] = useState()

    function toggleClickHandler(event) {
        const elementCoords = event.target.closest('.dropdown').getBoundingClientRect()
        setPopupCoords({ top: elementCoords.bottom + 10, left: elementCoords.left, width: elementCoords.width })
        setPopupActive(!popupActive)
    }

    function redirectHandler() {
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

export default Dropdown;