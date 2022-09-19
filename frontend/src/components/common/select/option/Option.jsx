

const Option = ({ onClick, value, label, className, disabled, selected }) => {
    return (
        <option onClick={onClick} className={className} value={value} disabled={disabled} selected={selected} >{label}</option>
    );
}


export default Option;