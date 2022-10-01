import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Popup from "../Popup";
import { setCurrentTask } from "../../../../reducers/taskSlice";


const SearchPopup = ({ popupActive, setPopupActive, popupCoords }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const tasks = useSelector(state => state.tasks.foundTasks)
    const priorities = useSelector(state => state.tasks.priorities)
    const statuses = useSelector(state => state.tasks.statuses)

    function redirectHandler(task) {
        dispatch(setCurrentTask(task))
        navigate(`/task/${task.id}`)
        setPopupActive(false)
    }

    return (
        <Popup active={popupActive} setActive={setPopupActive} coords={popupCoords} bcTransparent={true}>
            <div className="list">
                {tasks.length !== 0
                    ? tasks.map(task =>
                        <div onClick={() => redirectHandler(task)} key={task.id} className="item">
                            <div className="name">{task.name}</div>
                            <div className="priority"><span className={task.priority}>{priorities.find(priority => priority.value === task.priority).label}</span></div>
                            <div className="status">{statuses.find(status => status.value === task.status).label}</div>
                            <div className="deadline">{new Date(task.deadline).toLocaleDateString()}</div>
                        </div>)
                    : <div className="item"><div className="name">Задачи не найдены</div></div>
                }
            </div>
        </Popup>
    );
}

export default SearchPopup;