import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";
import { setCurrentTask } from "../../../reducers/taskSlice";

const Month = () => {
    const currentMonth = useSelector(state => state.calendar.currentMonth)
    const currentYear = useSelector(state => state.calendar.currentYear)
    const tasks = useSelector(state => state.tasks.tasks)
    const daysOfWeek = Object.keys(useSelector(state => state.calendar.daysOfWeek))

    function createMonthGrid() {
        let date = new Date(currentYear, currentMonth, 1)
        let month = [], days = []

        for (let i = 0; i < getDay(date); i++) {
            days.push(<Day />);
        }

        while (date.getMonth() == currentMonth) {
            let tasksOfDay = tasks.filter(task => task.deadline === new Date(currentYear, currentMonth, date.getDate()).toLocaleDateString('en-CA'))

            if (date.getFullYear() === new Date().getFullYear() && date.getMonth() === new Date().getMonth() && date.getDate() === new Date().getDate()) {
                days.push(<Day key={date.getDate()} heading={date.getDate()} tasks={tasksOfDay} today={true} />)
            } else {
                days.push(<Day key={date.getDate()} heading={date.getDate()} tasks={tasksOfDay} />)
            }
            if (getDay(date) % 7 == 6) {
                month.push(<Week key={month.length} days={days} />)
                days = []
            }
            date.setDate(date.getDate() + 1);
        }

        if (getDay(date) != 0) {
            for (let i = getDay(date); i < 7; i++) {
                days.push(<Day />);
            }
        }

        month.push(<Week key={month.length} days={days} />)
        return month
    }

    function getDay(date) {
        let day = date.getDay();
        if (day === 0) day = 7;
        return day - 1;
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
    const classes = props.today ? 'day today' : 'day'
    let tasks = []
    for (let key in props.tasks) {
        tasks.push(props.tasks[key])
    }
    return (
        <div className={classes}>
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