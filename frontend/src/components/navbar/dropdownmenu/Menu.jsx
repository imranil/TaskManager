import React, { useState } from "react";
import { useSelector } from 'react-redux';
import { API_URL } from "../../../config";
import avatarLogo from "../../../assets/img/avatar.svg";
import MenuPopup from "../../common/popup/popups/MenuPopup";


const Menu = () => {
    const currentUser = useSelector(state => state.user.currentUser)
    const avatar = currentUser.avatar ? `${API_URL + currentUser.avatar}` : avatarLogo
    const [popupActive, setPopupActive] = useState(false)
    const [popupCoords, setPopupCoords] = useState()

    function toggleClickHandler(event) {
        const elementCoords = event.target.closest('.dropdown').getBoundingClientRect()
        setPopupCoords({ top: elementCoords.bottom + 10, left: elementCoords.left, width: elementCoords.width })
        setPopupActive(!popupActive)
    }

    return (
        <div className="dropdown">
            <a className="dropdown-control" onClick={(event) => toggleClickHandler(event)}>
                <img src={avatar} /> 
                {currentUser.firstName}
            </a>
            <MenuPopup popupActive={popupActive} setPopupActive={setPopupActive} popupCoords={popupCoords} />
        </div>
    );
}

export default Menu;