import { useState } from 'react';
import Option from './option/Option';
import './select.css';

const Multiselect = ({ placeholder, objects, value, onChange, onBlur }) => {
    const [active, setActive] = useState(false)

    return (
        <select onClick={() => setActive(!active)} onBlur={() => setActive(false)} className="multiselect">
            <Option className="select-placeholder" key="placeholder" value="" label={placeholder} disabled={true} selected={true} />
        </select>
    );
}


export default Multiselect;