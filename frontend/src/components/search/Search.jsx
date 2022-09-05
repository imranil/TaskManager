import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Popup from "../popup/Popup";
import { searchTasks } from "../../actions/task";
import { setCurrentTask, setFoundTasks } from "../../reducers/taskSlice";


const Search = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const tasks = useSelector(state => state.tasks.foundTasks)
    const priorities = useSelector(state => state.tasks.priorities)
    const statuses = useSelector(state => state.tasks.statuses)
    const [searchInput, setSearchInput] = useState('')
    const [searchTimeout, setSearchTimeout] = useState(false)
    const [popupActive, setPopupActive] = useState(false)
    const [popupCoords, setPopupCoords] = useState({ top: 0, left: 0, width: 0 })

    useEffect(() => {
        if (!popupActive) {
            dispatch(setFoundTasks([]))
        }
    }, [popupActive])

    function setPopupCoordsHandler(event) {
        const elementCoords = event.target.getBoundingClientRect()
        setPopupCoords({ top: elementCoords.top + elementCoords.height + 10, left: elementCoords.left, width: elementCoords.width })
    }

    function searchChangeHandler(event) {
        setSearchInput(event.target.value)
        setPopupActive(true)
        if (searchTimeout !== false) {
            clearTimeout(searchTimeout)
        }
        if (event.target.value !== '') {
            setSearchTimeout(setTimeout((value) => {
                dispatch(searchTasks(value));
            }, 500, event.target.value))
        } else {
            setPopupActive(false)
        }
    }

    function redirectHandler(task) {
        dispatch(setCurrentTask(task))
        navigate(`/task/${task.id}`)
        setPopupActive(false)
    }

    return (
        <div className="search-area" >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 101 101">
                <path d="M63.3 59.9c3.8-4.6 6.2-10.5 6.2-17 0-14.6-11.9-26.5-26.5-26.5S16.5 28.3 16.5 42.9 28.4 69.4 43 69.4c6.4 0 12.4-2.3 17-6.2l20.6 20.6c.5.5 1.1.7 1.7.7.6 0 1.2-.2 1.7-.7.9-.9.9-2.5 0-3.4L63.3 59.9zm-20.4 4.7c-12 0-21.7-9.7-21.7-21.7s9.7-21.7 21.7-21.7 21.7 9.7 21.7 21.7-9.7 21.7-21.7 21.7z" />
            </svg>
            <input value={searchInput} onChange={(event) => searchChangeHandler(event)} onClick={(event) => setPopupCoordsHandler(event)} className="search" type='search' placeholder="Поиск" />
            <Popup active={popupActive} setActive={setPopupActive} coords={popupCoords} bcTransparent={true}>
                <div className="list">
                    {tasks.length !== 0
                        ? tasks.map(task =>
                            <div onClick={() => redirectHandler(task)} key={task.id} className="item">
                                <div className="name">{task.name}</div>
                                <div className="priority"><span className={task.priority}>{priorities[task.priority]}</span></div>
                                <div className="status">{statuses[task.status]}</div>
                                <div className="deadline">{new Date(task.deadline).toLocaleDateString()}</div>
                            </div>)
                        : <div className="item"><div className="name">Задачи не найдены</div></div>
                    }
                </div>
            </Popup>
        </div>
    );
}

export default Search;