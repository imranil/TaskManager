
import './checkbox.css';

const Checkbox = ({ label, value, onChange, onBlur }) => {
    return (
        <div className="checkbox-wrap">
            <label className="checkbox-label">
                {label}
                <input className="checkbox-input" type="checkbox" value={value} onChange={onChange} onBlur={onBlur} />
            </label>

        </div>
    );
}


export default Checkbox;