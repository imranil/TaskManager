import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setTheme } from '../../reducers/themeSlice'
import './theme.css'
import sunSvg from "../../assets/img/sun.svg"
import moonSvg from "../../assets/img/moon.svg"


const Theme = ({ className }) => {
    const theme = useSelector((state) => state.theme.theme)
    const dispatch = useDispatch()

    useEffect(() => {
        document.documentElement.dataset.theme = theme
        localStorage.setItem('theme', theme)
    }, [theme])

    const handleChange = () => {
        const next = theme === 'dark' ? 'light' : 'dark'
        dispatch(setTheme(next))
    }

    return (
        <a className={className} onClick={handleChange}>
            Тема
            <img className={theme === 'dark' ? 'dark' : 'light'} 
                src={theme === 'dark' ? moonSvg : sunSvg} alt="theme" />
        </a>
    )
}

export default Theme