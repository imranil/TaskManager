import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import Day from './Day/Day'

const MonthGrid = () => {
    const currentDate = useSelector(state => state.calendar.currentDate)
    const view = useSelector(state => state.calendar.view)
    const weekDay = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье']
    let date = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
    let month = [], days = []

    if (view === 'grid') {
        for (let i = 0; i < getDay(date); i++) {
            days.push(<Day />);
        }

        while (date.getMonth() === currentDate.getMonth()) {
            if(date.getDate() === currentDate.getDate()) {
                days.push(<Day key={date.getDate()} heading={date.getDate()} today={true} />)
            } else {
                days.push(<Day key={date.getDate()} heading={date.getDate()} />)
            }
            if (getDay(date) % 7 == 6) {
                month.push(<div key={month.length} className="week">{days}</div>)
                days = []
            }
            date.setDate(date.getDate() + 1);
        }

        if (getDay(date) != 0) {
            for (let i = getDay(date); i < 7; i++) {
                days.push(<Day />);
            }
        }

        month.push(<div key={month.length} className="week">{days}</div>);


        return (
            <div className="month">
                <div className="week">{weekDay.map(day => <div className="week-day">{day}</div>)}</div>
                {month}
            </div>
        );
    }
}

function getDay(date) {
    let day = date.getDay();
    if (day == 0) day = 7;
    return day - 1;
}

export default MonthGrid;