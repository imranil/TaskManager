import { useMemo } from 'react';
import { useEffect, useRef, useState } from 'react';
import CleanIndicator from './indicators/CleanIndicator';
import DropdownIndicator from './indicators/DropdownIndicator';
import Option from './option/Option';
import SelectedOption from './option/SelectedOption';
import { arrIsEmpty, strIsEmpty } from '../../../utils/isEmpty';
import './select.scss';

const Select = ({selectedItems, setSelectedItems, options = [], placeholder = '', isMulti = false }) => {
    const [isFocused, setIsFocused] = useState(false)
    const [isOpenMenu, setIsOpenMenu] = useState(false)
    const [searchInput, setSearchInput] = useState('')
    const inputRef = useRef()

    function handleBlurInput() {
        setSearchInput('')
        setIsFocused(false)
    }

    function clearSelectedItems(event) {
        event.stopPropagation()
        if(arrIsEmpty(selectedItems)) {
            setSearchInput('')
        } else {
            setSelectedItems([])
        }
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

    function handleClickOption(event, option) {
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
                    {!arrIsEmpty(selectedItems) && selectedItems.map(option =>
                        <SelectedOption key={option.value} onClick={removeSelectedItem} option={option} isMulti={isMulti} />
                    )}
                    {arrIsEmpty(selectedItems) &&
                        <div className="select__placeholder">
                            {strIsEmpty(searchInput) ? placeholder : searchInput}
                        </div>
                    }
                    <div className="select__input-container">
                        <input
                            className='select__input-search'
                            ref={inputRef}
                            value={searchInput}
                            onChange={e => setSearchInput(e.target.value)}
                            type="text"
                            name="search"
                            onFocus={() => setIsFocused(true)}
                            onBlur={handleBlurInput} />
                    </div>
                </div>
                <div className="select__indicators">
                    {(!arrIsEmpty(selectedItems) || !strIsEmpty(searchInput)) && <CleanIndicator clearSelectedItems={clearSelectedItems} />}
                    <DropdownIndicator isOpenMenu={isOpenMenu} toggleOpenMenu={toggleOpenMenu} />
                </div>
            </div>
            {isOpenMenu &&
                <div className="select__menu">
                    {!arrIsEmpty(displayedOptions) ?
                        displayedOptions.map((option, index) =>
                            <Option key={index} option={option} onClick={handleClickOption} />)
                        :
                        <div className="select__menu__empty">Нет вариантов</div>
                    }
                </div>
            }
        </div>
    );
}


export default Select;