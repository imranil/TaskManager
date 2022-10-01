import { useDispatch, useSelector } from 'react-redux';
import { createTask, getTasks } from "../../../../actions/task";
import useInput from "../../../../hooks/useInput";
import Popup from "../Popup";
import Select from "../../select/Select";
import Input from '../../input/Input';
import { useState } from 'react';



const CreateTaskPopup = ({ popupActive, setPopupActive }) => {
    const dispatch = useDispatch()
    const priorities = useSelector(state => state.tasks.priorities)
    const statuses = useSelector(state => state.tasks.statuses)
    const name = useInput('', { isEmpty: true, minLength: 2 })
    const description = useInput('', { isEmpty: true })
    const deadline = useInput('', { isEmpty: true })
    const [priority, setPriority] = useState([])
    const [status, setStatus] = useState([])


    function submitHandler(event) {
        event.preventDefault()
        dispatch(createTask(name.value, description.value, priority[0].value, status[0].value, deadline.value))
        dispatch(getTasks())
        setPopupActive(false)
    }

    function closeClickHandler(event) {
        event.preventDefault()
        event.stopPropagation()
        setPopupActive(false)
    }

    return (
        <Popup active={popupActive} setActive={setPopupActive} coords={{ top: '10em' }}>
            <form onSubmit={(event) => submitHandler(event)} className="task-form">
                <div className="header">
                    <div className="title">Созадние задачи</div>
                    <button onClick={(event) => closeClickHandler(event)} className="button-icon close-button">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 101 101">
                            <path d="M83.9 17.1c-.9-.9-2.5-.9-3.4 0l-30 30-30-30c-.9-.9-2.5-.9-3.4 0s-.9 2.5 0 3.4l30 30-30 30c-.9.9-.9 2.5 0 3.4.5.5 1.1.7 1.7.7.6 0 1.2-.2 1.7-.7l30-30 30 30c.5.5 1.1.7 1.7.7.6 0 1.2-.2 1.7-.7.9-.9.9-2.5 0-3.4l-30-30 30-30c.9-.9.9-2.4 0-3.4z" />
                        </svg>
                    </button>
                </div>
                <div className="body">
                    <Input value={name.value} onChange={e => name.onChange(e)} onBlur={e => name.onBlur(e)} name="name" type="text" placeholder="Название" formNoValidate={false} />
                    {(name.isDirty && name.minLengthError) && <div className="has-error">Поле не должно содержать меньше 2 символов</div>}
                    <textarea value={description.value} onChange={e => description.onChange(e)} onBlur={e => description.onBlur(e)} name="description" placeholder="Описание" rows="5" />
                    <Select selectedItems={priority} setSelectedItems={setPriority} placeholder="Приоритет" options={priorities} />
                    <Select selectedItems={status} setSelectedItems={setStatus} placeholder="Статус" options={statuses} />
                    <Input value={deadline.value} onChange={e => deadline.onChange(e)} onBlur={e => deadline.onBlur(e)} name="deadline" type="date" />
                    {(deadline.isDirty && deadline.isEmpty) && <div className="has-error">Поле не может быть пустым</div>}
                </div>
                <div className="footer">
                    <button disabled={!name.inputValid || priority.length===0 || status.length===0 || !deadline.inputValid} type="submit" className="main-button">Создать</button>
                </div>
            </form>
        </Popup>
    );
}


export default CreateTaskPopup;