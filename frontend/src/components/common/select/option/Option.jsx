

const Option = ({ option, onClick }) => {

    return (
        <div onClick={(e) => onClick(e, option)} onMouseDown={e => e.preventDefault()} className="select__menu__item">
            <div className="select__menu__item-label">
                {option.label}
            </div>
        </div>
    );
}


export default Option;