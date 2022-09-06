import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";
import { setCurrentTask } from "../../../reducers/taskSlice";

const Month = () => {
    const isLoading = useSelector(state => state.app.loader)
    const currentMonth = useSelector(state => state.calendar.currentMonth)
    const currentYear = useSelector(state => state.calendar.currentYear)
    const daysOfWeek = Object.keys(useSelector(state => state.calendar.daysOfWeek))
    const tasks = useSelector(state => state.tasks.tasks)

    const WEEK_DAY_SUNDAY = 6;
    const WEEK_DAY_MONDAY = 0;

    function createMonthGrid() {
        let date = new Date(currentYear, currentMonth, 1)
        let month = [], days = []

        fillArrayWithEmptyDays(days, WEEK_DAY_MONDAY, getDay(date) - 1)

        while (date.getMonth() === currentMonth) {
            let tasksOfDay = getTasksOfDay(date.getDate())

            days.push(<Day key={date.getDate()} heading={date.getDate()} tasks={tasksOfDay} today={isToday(date)} />)

            if (getDay(date) % 7 === WEEK_DAY_SUNDAY) {
                month.push(<Week key={month.length} days={days} />)
                days = []
            }
            date.setDate(date.getDate() + 1);
        }

        if (getDay(date) !== WEEK_DAY_MONDAY) {
            fillArrayWithEmptyDays(days, getDay(date), WEEK_DAY_SUNDAY)
        }

        month.push(<Week key={month.length} days={days} />)

        return month
    }

    function fillArrayWithEmptyDays(array, initialValue, finalValue) {
        for (let i = initialValue; i <= finalValue; i++) {
            array.push(<Day />);
        }
    }

    function getDay(date) {
        let day = date.getDay();
        if (day === 0) {
            day = 7;
        }

        return day - 1;
    }

    function getTasksOfDay(currentDay) {
        return tasks.filter(task => task.deadline === new Date(currentYear, currentMonth, currentDay).toLocaleDateString('en-CA'))
    }

    function isToday(date) {
        return date.getFullYear() === new Date().getFullYear() && date.getMonth() === new Date().getMonth() && date.getDate() === new Date().getDate();
    }
    
    if (isLoading) {
        return (
            <div className="loader">
                <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
            </div>
        );
    }

    return (
        <div className="month">
            <Week days={daysOfWeek.map(day => <div className="week-day">{day}</div>)} />
            {createMonthGrid()}
        </div>
    );
}

const Week = ({ days }) => {
    return (
        <div className='week'>
            {days}
        </div>
    );
}

const Day = (props) => {
    let tasks = []
    for (let key in props.tasks) {
        tasks.push(props.tasks[key])
    }

    return (
        <div className={props.today ? 'day today' : 'day'}>
            <div className="heading">{props.heading} {props.today && 'Сегодня'}</div>
            <ul className="task-list">
                {tasks.length !== 0 &&
                    tasks.map(task => <TaskOfDay key={task.id} task={task} />)
                }
            </ul>
        </div>
    );
}

const TaskOfDay = ({ task }) => {
    const dispatch = useDispatch()
    const priorities = useSelector(state => state.tasks.priorities)
    
    return (
        <NavLink to={'/task/' + task.id} onClick={() => dispatch(setCurrentTask(task))} className="item">
            {task.name}
            <span className={task.priority}>{priorities[task.priority]}</span>
        </NavLink>
    );
}

export default Month;