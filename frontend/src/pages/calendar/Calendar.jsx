import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getTasks } from "../../actions/task";
import { getTags } from "../../actions/tag";
import Month from "../../components/month/Month";
import MonthControl from "../../components/controls/MonthControl";
import TaskControl from "../../components/controls/TaskControl";
import { taskPropertyAdapter } from "../../utils/taskPropertyAdapter";
import './calendar.css';

const MonthControlMemo = memo(MonthControl);
const TaskControlMemo = memo(TaskControl);

const Calendar = () => {
    const dispatch = useDispatch()
    const currentMonth = useSelector(state => state.calendar.currentMonth)
    const currentYear = useSelector(state => state.calendar.currentYear)
    
    const startDate = new Date(currentYear, currentMonth, 1).toLocaleDateString('en-CA') // yyyy-mm-dd
    const endDate = new Date(currentYear, currentMonth + 1, 0).toLocaleDateString('en-CA')

    const [selectedPriorities, setSelectedPriorities] = useState([])
    const [selectedStatuses, setSelectedStatuses] = useState([])
    const [selectedTags, setSelectedTags] = useState([])

    useEffect(() => {
        dispatch(getTasks({
            startDate,
            endDate,
            priorities: taskPropertyAdapter(selectedPriorities),
            statuses: taskPropertyAdapter(selectedStatuses)
        }))
    }, [currentMonth, currentYear, selectedPriorities, selectedStatuses]);

    useEffect(() => {
        dispatch(getTags())
    }, []);

    return (
        <div className="container">
            <div className="top-row">
                <MonthControlMemo currentMonth={currentMonth} currentYear={currentYear} />
                <TaskControlMemo
                    selectedPriorities={selectedPriorities}
                    setSelectedPriorities={setSelectedPriorities}
                    selectedStatuses={selectedStatuses}
                    setSelectedStatuses={setSelectedStatuses}
                    selectedTags={selectedTags}
                    setSelectedTags={setSelectedTags}
                />
            </div>
            <Month />
        </div>
    );
}


export default Calendar;

