import React from "react";
import { useState } from "react";
import { useSelector } from 'react-redux';
import Select from "../common/select/Select";
import CreateTask from "../task/operations/CreateTask";

const TaskControl = () => {
    const priorities = useSelector(state => state.tasks.priorities)
    const statuses = useSelector(state => state.tasks.statuses)
    const tags = useSelector(state => state.tags.tags)

    const [selectedPriorities, setSelectedPriorities] = useState([])
    const [selectedStatuses, setSelectedStatuses] = useState([])
    const [selectedTags, setSelectedTags] = useState([])

    return (
        <div className="task-control">
            <Select selectedItems={selectedPriorities} setSelectedItems={setSelectedPriorities} placeholder="По приоритету" options={priorities} isMulti={true} />
            <Select selectedItems={selectedStatuses} setSelectedItems={setSelectedStatuses}  placeholder="По статусу" options={statuses} isMulti={true} />
            <Select selectedItems={selectedTags} setSelectedItems={setSelectedTags}  placeholder="По тэгу" options={tags} isMulti={true} />
            <CreateTask />
        </div>
    );
}


export default TaskControl;