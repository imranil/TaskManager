import React from "react";
import { useSelector } from 'react-redux';
import Multiselect from "../../common/select/MultiSelect";
import Select from "../../common/select/Select";
import CreateTask from "../../task/operations/CreateTask";

const TaskControl = ({ setPriority, setStatus }) => {
    const priorities = useSelector(state => state.tasks.priorities)
    const statuses = useSelector(state => state.tasks.statuses)
    const tags = useSelector(state => state.tags.tags)

    return (
        <div className="task-control">
            <Select onChange={e => setPriority(e.target.value) } placeholder="По приоритету" objects={{ '': 'Все', ...priorities }} />
            <Select onChange={e => setStatus(e.target.value) } placeholder="По статусу" objects={{  '': 'Все', ...statuses }} />
            <Multiselect placeholder="Мультиселект" />
            <CreateTask />
        </div>
    );
}


export default TaskControl;