


const DropdownIndicator = ({ toggleOpenMenu, isOpenMenu }) => {
    return (
        <>
            <span className='select__indicators__separator'></span>
            <div onMouseUp={e => toggleOpenMenu(e)} onMouseDown={e => e.preventDefault()} className="select__dropdown">
                <svg style={isOpenMenu ? { transform: 'rotate(-180deg)' } : { transform: 'rotate(0deg)' }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 29 29" >
                    <path fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2" d="m20.5 11.5-6 6-6-6" />
                </svg>
            </div>
        </>
    );
}

export default DropdownIndicator;