import React from "react";
import { useDispatch, useSelector } from 'react-redux';



const Week = ({days}) => {
    return (
        <div className='week'>
            {days}
        </div>
    );
}

export default Week;