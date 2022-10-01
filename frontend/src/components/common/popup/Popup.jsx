import React from "react";
import './popup.css';


const Popup = ({ active, setActive, children, coords, bcTransparent }) => {
    return (
        <div className={active ? "popup active" : "popup"} 
            onClick={() => setActive(false)} 
            style={bcTransparent && {backgroundColor: "transparent"}}>
            <div className={active ? "popup-content active" : "popup-content"} 
                onClick={event => event.stopPropagation()} 
                style={coords && {top: coords.top, left: coords.left, width: coords.width}}>
                { active && children}
            </div>
        </div>
    );
}


export default Popup;