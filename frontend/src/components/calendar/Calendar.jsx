import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import MonthControl from "./month/MonthControl";
import MonthGrid from "./month/MonthGrid";
import './calendar.css'


const Calendar = () => {
    return (
        <div className="container">
            <MonthControl/>
            <MonthGrid/>
        </div>
    );
}


export default Calendar;