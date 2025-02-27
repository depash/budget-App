import './addTransaction.css';
import AddTransactionModal from './addTransactionModal';

import React, { useState } from 'react';

function AddTransaction({ addTransaction, date }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className='addTransactionContainer'>
            {isModalOpen ? <AddTransactionModal closeModal={closeModal} date={date} addTransaction={addTransaction} /> : null}
            <button className='addTransactionButton' onClick={openModal}></button>
        </div>
    );
}

export default AddTransaction;