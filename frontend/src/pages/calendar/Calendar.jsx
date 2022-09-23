import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getTasks } from "../../actions/task";
import { getTags } from "../../actions/tag";
import Month from "../../components/month/Month";
import MonthControl from "../../components/controls/MonthControl";
import TaskControl from "../../components/controls/TaskControl";
import './calendar.css';


const Calendar = () => {
    const dispatch = useDispatch()
    const currentTask = useSelector(state => state.tasks.currentTask)
    const currentMonth = useSelector(state => state.calendar.currentMonth)
    const currentYear = useSelector(state => state.calendar.currentYear)
    const currentUser = useSelector(state => state.user.currentUser)
    const startDate = new Date(currentYear, currentMonth, 1).toLocaleDateString('en-CA') // yyyy-mm-dd
    const endDate = new Date(currentYear, currentMonth + 1, 0).toLocaleDateString('en-CA')
    const [priority, setPriority] = useState('')
    const [status, setStatus] = useState('')

    useEffect(() => {
        dispatch(getTasks({ startDate, endDate, priority, status }))
    }, [currentMonth, currentYear, currentTask, priority, status]);

    useEffect(() => {
        dispatch(getTags())
    }, []);

    return (
        <div className="container">
            <div className="top-row">
                <MonthControl currentMonth={currentMonth} currentYear={currentYear} />
                <TaskControl setPriority={setPriority} setStatus={setStatus} />
            </div>
            <Month />
        </div>
    );
}


export default Calendar;