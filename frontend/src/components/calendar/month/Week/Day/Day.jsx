import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import taskSlice from "../../../../../reducers/taskSlice";


const Day = (props) => {
    const classes = props.today ? 'day today' : 'day'
    let tasks = []
    for (let key in props.tasks) {
        tasks.push(props.tasks[key])
    }
    return (
        <div className={classes}>
            <div className="heading">{props.heading}</div>
            <ul className="tasks">
                {tasks.length !== 0 &&
                    tasks.map(task => <li className="task"><div className="name">{task.name}</div><div className={task.priority}>{task.priority}</div></li>)
                }
            </ul>
        </div>
    );
}

export default Day;