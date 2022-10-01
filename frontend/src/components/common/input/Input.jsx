import "./input.scss";


const Input = ({
    ref,
    type,
    name,
    className,
    placeholder,
    value,
    onChange,
    onClick,
    onBlur,
    onFocus }) => {
        
    return (
        <div className="input">
            <input
                className={className ? `input__field ${className}` : 'input__field'}
                ref={ref}
                type={type}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                onClick={onClick}
                onBlur={onBlur}
                onFocus={onFocus}
            />
        </div>
    );
}


export default Input;