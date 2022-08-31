import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentTask } from "../../../reducers/taskSlice";
import { setFoundTasks } from "../../../reducers/taskSlice";


const Popup = ({ setViewPopup, popupCoordinates }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const tasks = useSelector(state => state.tasks.foundTasks)
    const priorities = useSelector(state => state.tasks.priorities)
    const statuses = useSelector(state => state.tasks.statuses)

    function taskClickHandler(task) {
        dispatch(setCurrentTask(task))
        navigate(`/task/${task.id}`)
        dispatch(setFoundTasks([]))
        setViewPopup(false)
    }

    function viewPopupHandler(event) {
        const target = event.target
        console.log(target)
        if(!target.closest('.popup-content')) {
            setViewPopup(false)
        }
    }

    return (
        <div className="search-popup" onClick={(event) => viewPopupHandler(event)}>
            <div className="popup-content" style={{ top: popupCoordinates.top + 'px', left: popupCoordinates.left + 'px' }}>
                <div className="list">
                    {tasks.length !== 0 
                        ? tasks.map(task => 
                            <div onClick={() => taskClickHandler(task)} key={task.id} className="item">
                                <div className="name">{task.name}</div>
                                <div className="priority"><span className={task.priority}>{priorities[task.priority]}</span></div>
                                <div className="status">{statuses[task.status]}</div>
                                <div className="deadline">{new Date(task.deadline).toLocaleDateString()}</div>
                            </div>)
                        : <div className="item"><div className="name">Задачи не найдены</div></div>
                    }
                </div>
            </div>
        </div>
    );
}

export default Popup;