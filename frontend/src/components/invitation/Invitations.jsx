import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Popup from "../popup/Popup";
import { getInvitations, acceptInvitation, declineInvitation } from "../../actions/invitation";
import { setInvitations } from "../../reducers/invitationSlice";
import './invitation.css';


const Invitations = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const invitations = useSelector(state => state.invitations.invitations)
    const invitationsЕxist = useSelector(state => state.invitations.invitationsЕxist)
    const [popupActive, setPopupActive] = useState(false)
    const [popupCoords, setPopupCoords] = useState()

    useEffect(() => {
        if(!popupActive) {
            dispatch(setInvitations([]))
        }
    }, [popupActive])

    function toggleClickHandler(event) {
        if(invitationsЕxist) {
            dispatch(getInvitations())
        }
        const elementCoords = event.target.closest('.nav-bar').getBoundingClientRect()
        setPopupCoords({ top: elementCoords.top + elementCoords.height + 10, left: elementCoords.left, width: elementCoords.width })
        setPopupActive(!popupActive)
    }

    function deleteInvitationHandler(invitationId) {
        dispatch(declineInvitation(invitationId))
        dispatch(getInvitations())
    }

    return (
        <div className="invitations">
            <a className={invitationsЕxist ? "invitations-control invitation-exists" : "invitations-control"} onClick={(event) => toggleClickHandler(event)}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M19,4H5A3,3,0,0,0,2,7V17a3,3,0,0,0,3,3H19a3,3,0,0,0,3-3V7A3,3,0,0,0,19,4ZM5,6H19a1,1,0,0,1,1,1l-8,4.88L4,7A1,1,0,0,1,5,6ZM20,17a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V9.28l7.48,4.57a1,1,0,0,0,1,0L20,9.28Z" />
                </svg>
            </a>
            <Popup active={popupActive} setActive={setPopupActive} coords={popupCoords} bcTransparent={true} >
                <div className="invitations-content">
                    {invitationsЕxist && invitations.length !== 0
                        ? invitations.map(invitation =>
                            <div className="invite-item">
                                <div className="title">
                                    <div className="name">{invitation.senderName}</div>
                                    <div className="date">{new Date(invitation.createdAt).toLocaleString()}</div>
                                </div>
                                <div className="description">
                                    Приглашает, вас, стать участником задачи <b>{invitation.taskName}</b>
                                </div>
                                <div className="make-decision">
                                    <button onClick={() => dispatch(acceptInvitation(invitation.id, invitation.taskId))} className="extra-button">Принять</button>
                                    <button onClick={() => deleteInvitationHandler(invitation.id)} className="extra-button">Отклонить</button>
                                </div>
                            </div>)
                        : <div className="invite-item"><div className="title">Приглашений нет</div></div>
                    }
                </div>
            </Popup>
        </div>
    );
}

export default Invitations;