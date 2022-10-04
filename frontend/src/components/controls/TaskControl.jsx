import React from "react";
import { useState } from "react";
import { useSelector } from 'react-redux';
import Select from "../common/select/Select";
import CreateTask from "../task/operations/CreateTask";

const TaskControl = (props) => {
    const { selectedPriorities, setSelectedPriorities, selectedStatuses, setSelectedStatuses, selectedTags, setSelectedTags } = props

    const priorities = useSelector(state => state.tasks.priorities)
    const statuses = useSelector(state => state.tasks.statuses)
    const tags = useSelector(state => state.tags.tags)

    return (
        <div className="task-control">
            <div className="select-area">
                <Select selectedItems={selectedPriorities} setSelectedItems={setSelectedPriorities} placeholder="По приоритету" options={priorities} isMulti={true} />
                <Select selectedItems={selectedStatuses} setSelectedItems={setSelectedStatuses} placeholder="По статусу" options={statuses} isMulti={true} />
            </div>
            <CreateTask />
        </div>
    );
}

// <Select selectedItems={selectedTags} setSelectedItems={setSelectedTags} placeholder="По тэгу" options={tags} isMulti={true} />
export default TaskControl;