import React, { useState } from "react";
import CreateTaskPopup from "../../common/popup/popups/CreateTaskPopup";
import '../task.css';

const CreateTask = () => {
    const [popupActive, setPopupActive] = useState(false)

    return (
        <>
            <button onClick={() => setPopupActive(true)} className="main-button">Добавить</button>
            <CreateTaskPopup popupActive={popupActive} setPopupActive={setPopupActive} />
        </>
    );
}


export default CreateTask;