

const Select = ({className, placeholder, objects, value, onChange, onBlur}) => {
    return (
        <select className={className} value={value} onChange={onChange} onBlur={onBlur}>
            <option value="" className="select-placeholder" selected disabled>{ placeholder }</option>
            {Object.entries(objects).map((object, key) => <option key={key} value={object[0]}>{object[1]}</option>)}
        </select>
    );
}


export default Select;