import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../../../reducers/userSlice";
import Popup from "../Popup";


const MenuPopup = ({ popupActive, setPopupActive, popupCoords }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    function redirectHandler() {
        navigate(`/profile`)
        setPopupActive(false)
    }

    return (
        <Popup active={popupActive} setActive={setPopupActive} coords={popupCoords} bcTransparent={true} >
            <div className="dropdown-content">
                <a href={null} onClick={(event => redirectHandler(event))} className="dropdown-item">Профиль</a>
                <a href={null} onClick={() => dispatch(logout())} className="dropdown-item">Выход</a>
            </div>
        </Popup>
    );
}

export default MenuPopup;