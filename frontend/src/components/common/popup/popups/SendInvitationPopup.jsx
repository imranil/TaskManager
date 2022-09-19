import { useDispatch, useSelector } from "react-redux";
import { createInvitation } from "../../../../actions/invitation";
import useInput from "../../../../hooks/useInput";
import Popup from "../Popup";


const SendInvitationPopup = ({ taskId, popupActive, setPopupActive }) => {
    const dispatch = useDispatch()
    const currentUserEmail = useSelector(state => state.user.currentUser.email)
    const email = useInput('', { isEmpty: true, isEmail: true })

    function closeClickHandler(event) {
        event.preventDefault()
        event.stopPropagation()
        setPopupActive(false)
    }

    function submitHandler(event) {
        event.preventDefault()
        dispatch(createInvitation(email.value, taskId))
    }

    return (
        <Popup active={popupActive} setActive={setPopupActive} coords={{ top: '10em' }}>
            <form onSubmit={(event) => submitHandler(event)} className="send-invitation-content">
                <div className="header">
                    <div className="title">Отправить приглашение</div>
                    <button onClick={(event) => closeClickHandler(event)} className="button-icon close-button">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 101 101">
                            <path d="M83.9 17.1c-.9-.9-2.5-.9-3.4 0l-30 30-30-30c-.9-.9-2.5-.9-3.4 0s-.9 2.5 0 3.4l30 30-30 30c-.9.9-.9 2.5 0 3.4.5.5 1.1.7 1.7.7.6 0 1.2-.2 1.7-.7l30-30 30 30c.5.5 1.1.7 1.7.7.6 0 1.2-.2 1.7-.7.9-.9.9-2.5 0-3.4l-30-30 30-30c.9-.9.9-2.4 0-3.4z" />
                        </svg>
                    </button>
                </div>
                <div className="body">
                    <input value={email.value} onChange={e => email.onChange(e)} onBlur={e => email.onBlur(e)} name="email" type="email" placeholder="Электронная почта" />
                    {(email.isDirty && email.emailError) && <div className="has-error">Поле должно содержать адрес электронной почты!</div>}
                    {(email.isDirty && (email.value === currentUserEmail)) && <div className="has-error">Вы не можете отправлять приглашение себе!</div>}
                </div>
                <div className="footer">
                    <button disabled={!email.inputValid || (email.value === currentUserEmail)} type="submit" className="main-button">Отправить</button>
                </div>
            </form>
        </Popup>
    );
}

export default SendInvitationPopup;