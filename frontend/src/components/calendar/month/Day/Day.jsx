import React from "react";
import { useDispatch, useSelector } from 'react-redux';


const Day = (props) => {
    const classes = props.today ? 'day today' : 'day'
    return (
        <div className={classes}>
            <div className="heading">{props.heading}</div>
            <div className="title"></div>
            <div className="members"></div>
        </div>
    );
}

export default Day;