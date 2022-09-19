import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTask } from "../../../actions/task";
import Select from "../../common/select/Select";


// update priority & status
export const UpdateState = ({ name, placeholder, objects }) => { 
    const dispatch = useDispatch()
    const task = useSelector(state => state.tasks.currentTask)
    const [state, setState] = useState('')

    function updateStateHandler(value) {
        setState(value)
        dispatch(updateTask({ ...task, [name]: value }))
    }

    return (
        <Select value={state} onChange={(event) => updateStateHandler(event.target.value)} name={name} placeholder={placeholder} objects={objects} />
    );
}