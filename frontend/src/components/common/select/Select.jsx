import Option from './option/Option';
import './select.css';

const Select = ({ className, placeholder, objects, value, onChange, onBlur }) => {
    return (
        <select className={className} value={value} onChange={onChange} onBlur={onBlur} >
            <Option className="select-placeholder" key="placeholder" value="" label={placeholder} disabled={true} selected={true} />
            {Object.entries(objects).map((object, key) => <Option key={key} value={object[0]} label={object[1]} />)}
        </select>
    );
}


export default Select;