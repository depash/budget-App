import './totalSpending.css';

import React, { useState } from 'react';

function TotalSpending({ total }) {

    return (
        <div className='totalContainer'>
            <p className='totalLabel'>TOTAL SPENT THIS MONTH</p>
            <p className='total'>${total}</p>
        </div>
    );
}

export default TotalSpending;