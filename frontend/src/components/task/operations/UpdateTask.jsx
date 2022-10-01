import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTask } from "../../../actions/task";
import Select from "../../common/select/Select";


// update priority || status
export const UpdateState = ({ name, placeholder, options }) => { 
    const dispatch = useDispatch()
    const task = useSelector(state => state.tasks.currentTask)
    const [state, setState] = useState([])

    useEffect(() => {
        if(state.length !== 0) {
            dispatch(updateTask({ ...task, [name]: state[0].value }))
        }
    }, [state])

    return (
        <Select selectedItems={state} setSelectedItems={setState} placeholder={placeholder} options={options} />
    );
}