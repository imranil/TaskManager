import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Popup from "./Popup";
import { searchTasks } from "../../../actions/task";
import { setFoundTasks } from "../../../reducers/taskSlice";


const Search = () => {
    const dispatch = useDispatch()
    const [searchInput, setSearchInput] = useState('')
    const [searchTimeout, setSearchTimeout] = useState(false)
    const [viewPopup, setViewPopup] = useState(false)
    const [popupCoordinates, setPopupCoordinates] = useState({top: 0, left: 0})

    function setCoordinatesHandler(event) {
        const elementCoords = event.target.getBoundingClientRect()
        setPopupCoordinates({ top: elementCoords.top + elementCoords.height + 15, left: elementCoords.left})
    }

    function searchChangeHandler(event) {
        setSearchInput(event.target.value)
        setViewPopup(true)
        if (searchTimeout !== false) {
            clearTimeout(searchTimeout)
        }
        if (event.target.value !== '') {
            setSearchTimeout(setTimeout((value) => {
                dispatch(searchTasks(value));
            }, 500, event.target.value))
        } else {
            dispatch(setFoundTasks([]))
            setViewPopup(false)
        }
    }

    return (
        <div className="search-area" >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 101 101">
                <path d="M63.3 59.9c3.8-4.6 6.2-10.5 6.2-17 0-14.6-11.9-26.5-26.5-26.5S16.5 28.3 16.5 42.9 28.4 69.4 43 69.4c6.4 0 12.4-2.3 17-6.2l20.6 20.6c.5.5 1.1.7 1.7.7.6 0 1.2-.2 1.7-.7.9-.9.9-2.5 0-3.4L63.3 59.9zm-20.4 4.7c-12 0-21.7-9.7-21.7-21.7s9.7-21.7 21.7-21.7 21.7 9.7 21.7 21.7-9.7 21.7-21.7 21.7z" />
            </svg>
            <input value={searchInput} onChange={(event) => searchChangeHandler(event)} onClick={(event) => setCoordinatesHandler(event)} className="search" type='search' placeholder="Поиск" />
            {viewPopup 
                ? <Popup setViewPopup={setViewPopup} popupCoordinates={popupCoordinates} />
                : null
            }
        </div>
    );
}

export default Search;