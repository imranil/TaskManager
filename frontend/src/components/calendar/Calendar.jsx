import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import MonthControl from "./MonthControl";
import Month from "./month/Month";
import './calendar.css'


const Calendar = () => {
    return (
        <div className="container">
            <MonthControl/>
            <Month/>
        </div>
    );
}


export default Calendar;