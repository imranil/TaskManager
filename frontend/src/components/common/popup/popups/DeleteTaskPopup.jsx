import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask } from "../../../../actions/task";
import Popup from "../Popup";


const DeleteTaskPopup = ({ popupActive, setPopupActive }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const taskId = useSelector(state => state.tasks.currentTask).id

    function removeTaskHandler(event) {
        event.preventDefault()
        dispatch(deleteTask(taskId))
        setPopupActive(false)
        navigate('/calendar')
    }

    function closeClickHandler(event) {
        event.preventDefault()
        event.stopPropagation()
        setPopupActive(false)
    }

    return (
        <Popup active={popupActive} setActive={setPopupActive} coords={{ top: '10em' }} >
            <form onSubmit={(event) => removeTaskHandler(event)} className="task-form">
                <div className="header">
                    <div className="title">Удаление задачи</div>
                    <button onClick={(event) => closeClickHandler(event)} className="button-icon close-button">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 101 101">
                            <path d="M83.9 17.1c-.9-.9-2.5-.9-3.4 0l-30 30-30-30c-.9-.9-2.5-.9-3.4 0s-.9 2.5 0 3.4l30 30-30 30c-.9.9-.9 2.5 0 3.4.5.5 1.1.7 1.7.7.6 0 1.2-.2 1.7-.7l30-30 30 30c.5.5 1.1.7 1.7.7.6 0 1.2-.2 1.7-.7.9-.9.9-2.5 0-3.4l-30-30 30-30c.9-.9.9-2.4 0-3.4z" />
                        </svg>
                    </button>
                </div>
                <div className="body">
                    <span>Вы действительно хотите удалить задачу?</span>
                </div>
                <div className="footer">
                    <button type="submit" className="main-button close-button">Удалить</button>
                    <button onClick={(event) => closeClickHandler(event)} className="main-button">Отмена</button>
                </div>
            </form>
        </Popup>
    );
}

export default DeleteTaskPopup;