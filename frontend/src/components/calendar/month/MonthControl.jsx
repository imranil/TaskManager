import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { prevMonth, todayMonth, nextMonth } from "../../../reducers/calendarSlice";
import ucFirst from '../../../utils/ucFirst'

const MonthControl = () => {
    const dispatch = useDispatch();
    const currentMonth = useSelector(state => state.calendar.currentMonth)
    const currentYear = useSelector(state => state.calendar.currentYear)

    return (
        <div className="top-row">
            <div className="month-control">
                <button className="button-icon" onClick={() => dispatch(prevMonth())}>
                    <svg width="12" height="16" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.884184 9.47933L9.75966 15.5374C10.1695 15.8173 10.5825 15.9655 10.9258 15.9655C11.5895 15.9655 12 15.4345 12 14.5456L12 1.45237C12 0.564497 11.59 0.0344801 10.9279 0.0344801C10.5841 0.0344801 10.1777 0.182782 9.7669 0.463523L0.887289 6.52143C0.316242 6.91166 0 7.43678 0 8.00071C-0.0001297 8.56425 0.31249 9.08924 0.884184 9.47933Z" fill="#6B6B6B" />
                    </svg>
                </button>
                <span>{ucFirst(new Date(currentYear, currentMonth).toLocaleString('ru', { year: 'numeric', month: 'long' }).slice(0, -3))}</span>
                <button className="button-icon" onClick={() => dispatch(nextMonth())}>
                    <svg width="12" height="16" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.1158 6.52067L2.24034 0.462624C1.83045 0.182657 1.41746 0.0344849 1.07419 0.0344849C0.410533 0.0344849 0 0.565532 0 1.45444V14.5476C0 15.4355 0.410015 15.9655 1.07212 15.9655C1.41591 15.9655 1.82231 15.8172 2.2331 15.5365L11.1127 9.47857C11.6838 9.08834 12 8.56322 12 7.99929C12.0001 7.43575 11.6875 6.91076 11.1158 6.52067Z" fill="#6B6B6B" />
                    </svg>
                </button>
            </div>
            <button className="extra-button" onClick={() => dispatch(todayMonth())}>Сегодня</button>
        </div>
    );
}


export default MonthControl;