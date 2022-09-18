

const Option = ({ value, title, className, disabled, selected }) => {
    return (
        <option className={className} value={value} disabled={disabled} selected={selected} >{title}</option>
    );
}


export default Option;