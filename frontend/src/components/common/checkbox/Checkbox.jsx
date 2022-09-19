
import './checkbox.css';

const Checkbox = ({ label }) => {
    return (
        <div className="checkbox-wrap">
            <label className="checkbox-label">
                <input className="checkbox-input" type="checkbox" />
                {label}
            </label>
        </div>
    );
}


export default Checkbox;