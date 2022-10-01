import { useState } from "react";
import DeleteTaskPopup from "../../common/popup/popups/DeleteTaskPopup";


const DeleteTask = () => {
    const [popupActive, setPopupActive] = useState(false)

    return (
        <>
            <button onClick={() => setPopupActive(true)} className="main-button close-button">Удалить</button>
            <DeleteTaskPopup popupActive={popupActive} setPopupActive={setPopupActive} />
        </>
    );
}


export default DeleteTask;