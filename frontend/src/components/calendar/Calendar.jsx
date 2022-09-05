import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getTasks, getCounts } from "../../actions/task";
import MonthControl from "./month/MonthControl";
import Month from "./month/Month";
import './calendar.css';


const Calendar = () => {
    const dispatch = useDispatch()
    const currentTask = useSelector(state => state.tasks.currentTask)
    const currentMonth = useSelector(state => state.calendar.currentMonth)
    const currentYear = useSelector(state => state.calendar.currentYear)
    const startDate = new Date(currentYear, currentMonth, 1).toLocaleDateString('en-CA') // yyyy-mm-dd
    const endDate = new Date(currentYear, currentMonth +1, 0).toLocaleDateString('en-CA')

    useEffect(() => {
        dispatch(getTasks({startDate, endDate}))
    }, [currentMonth, currentYear, currentTask]);

    return (
        <div className="container">
            <MonthControl/>
            <Month/>
        </div>
    );
}


export default Calendar;