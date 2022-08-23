import React from "react";
import { useDispatch, useSelector } from 'react-redux';


const Day = (props) => {
    return (
        <div className="day">
            <div className="title">{props.title}</div>
            <div className="members"></div>
            <div className="description"></div>
        </div>
    );
}

export default Day;