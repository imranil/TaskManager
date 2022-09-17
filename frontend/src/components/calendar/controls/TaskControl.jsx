import React from "react";
import { useSelector } from 'react-redux';
import Select from "../../common/select/Select";
import CreateTaskPopup from "../../task/CreateTaskPopup";

const TaskControl = ({ setPriority, setStatus }) => {
    const priorities = useSelector(state => state.tasks.priorities)
    const statuses = useSelector(state => state.tasks.statuses)

    return (
        <div className="task-control">
            <Select onChange={e => setPriority(e.target.value) } className="task-sort-select" placeholder="По приоритету" objects={{ '': 'Все', ...priorities }} />
            <Select onChange={e => setStatus(e.target.value) } className="task-sort-select" placeholder="По статусу" objects={{  '': 'Все', ...statuses }} />
            <CreateTaskPopup />
        </div>
    );
}


export default TaskControl;