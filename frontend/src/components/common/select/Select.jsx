import { useMemo } from 'react';
import { useEffect, useRef, useState } from 'react';
import CleanIndicator from './indicators/CleanIndicator';
import DropdownIndicator from './indicators/DropdownIndicator';
import Option from './option/Option';
import SelectedOption from './option/SelectedOption';
import './select.scss';

const Select = ({selectedItems, setSelectedItems, options = [], placeholder = '', isMulti = false }) => {
    const [isFocused, setIsFocused] = useState(false)
    const [isOpenMenu, setIsOpenMenu] = useState(false)
    const inputRef = useRef()

    function clearSelectedItems(event) {
        event.stopPropagation()
        setSelectedItems([])
    }

    function removeSelectedItem(event, option) {
        event.stopPropagation()
        setSelectedItems(selectedItems.filter(item => item !== option))
    }

    function toggleOpenMenu(event) {
        if (isOpenMenu) {
            event.preventDefault()
            setIsOpenMenu(false)
        } else {
            setIsOpenMenu(true)
        }
    }

    function clickOptionHandler(event, option) {
        event.preventDefault()
        if (isMulti) {
            setSelectedItems(selectedItems.includes(option) ? selectedItems.filter(item => item !== option) : selectedItems.concat([option]))
        } else {
            setSelectedItems([option])
            setIsOpenMenu(false)
        }
    }

    const displayedOptions = useMemo(() => { 
        return options.filter(option => !selectedItems.includes(option)) 
    }, [selectedItems])

    useEffect(() => {
        if (isFocused) {
            setIsOpenMenu(true)
        } else {
            inputRef.current.value = ''
            setIsOpenMenu(false)
        }
    }, [isFocused])

    return (
        <div className="select">
            <div onClick={() => inputRef.current.focus()} onMouseDown={e => e.preventDefault()} className={isFocused ? `select__control active` : "select__control"}>
                <div className="select__container">
                    {selectedItems.length !== 0 && selectedItems.map(option =>
                        <SelectedOption key={option.value} onClick={removeSelectedItem} option={option} isMulti={isMulti} />
                    )}
                    {selectedItems.length === 0 &&
                        <div className="select__placeholder">
                            {placeholder}
                        </div>
                    }
                    <div className="select__input-container">
                        <input
                            className='select__input-search'
                            ref={inputRef}
                            type="text"
                            name="searchInput"
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)} />
                    </div>
                </div>
                <div className="select__indicators">
                    {selectedItems.length !== 0 && <CleanIndicator clearSelectedItems={clearSelectedItems} />}
                    <DropdownIndicator isOpenMenu={isOpenMenu} toggleOpenMenu={toggleOpenMenu} />
                </div>
            </div>
            {isOpenMenu &&
                <div className="select__menu">
                    {displayedOptions.length !== 0 ?
                        displayedOptions.map((option, index) =>
                            <Option key={index} option={option} onClick={clickOptionHandler} />)
                        :
                        <div className="select__menu__empty">Нет вариантов</div>
                    }
                </div>
            }
        </div>
    );
}


export default Select;