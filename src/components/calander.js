import './calander.css';

import React from 'react';

function Calander({ date, changeDate }) {

    return (
        <div className='calander'>
            <button className='dateButton' onClick={() => { changeDate(-1) }}>{'<<'}</button>
            <p className='date'>{date}</p>
            <button className='dateButton' onClick={() => { changeDate(1) }}>{'>>'}</button>
        </div>
    );
}

export default Calander;