import React, { useState } from "react";
import SendInvitationPopup from "../../common/popup/popups/SendInvitationPopup";


const SendInvitation = ({ taskId }) => {
    const [popupActive, setPopupActive] = useState(false)

    return (
        <>
            <button className="main-button" onClick={() => setPopupActive(true)}>
                Добавить участника
            </button>
            <SendInvitationPopup taskId={taskId} popupActive={popupActive} setPopupActive={setPopupActive} />
        </>
    );
}

export default SendInvitation;