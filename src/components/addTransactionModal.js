import './addTransactionModal.css';

import React, { useState } from 'react';

const AddTransactionModal = ({ closeModal, date, addTransaction }) => {
    const [payee, setPayee] = useState('');
    const [purchaseDate, setPurchaseDate] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [errors, setErrors] = useState({});

    const categories = [
        'Health', 'Gifts', 'Groceries', 'Shopping', 'Education',
        'Entertainment', 'Travel', 'Utilities', 'Home', 'Dining'
    ];

    const validateForm = () => {
        let newErrors = {};
        if (!payee) newErrors.payee = 'Payee is required';
        if (!purchaseDate) newErrors.purchaseDate = 'Date is required';
        if (!amount) newErrors.amount = 'Amount is required';
        else if (isNaN(amount) || Number(amount) <= 0) newErrors.amount = 'Enter a valid amount';
        if (!category) newErrors.category = 'Category is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validDate = date instanceof Date && !isNaN(date) ? date : new Date();
    const year = validDate.getFullYear();
    const month = String(validDate.getMonth() + 1).padStart(2, "0");

    const getDaysInMonth = (dateObj) => {
        const year = dateObj.getFullYear();
        const month = dateObj.getMonth();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        return Array.from({ length: daysInMonth }, (_, i) => i + 1);
    };

    const days = getDaysInMonth(validDate);

    const handleDateChange = (day) => {
        const formattedDay = String(day).padStart(2, "0");
        setPurchaseDate(`${year}-${month}-${formattedDay}`);
    };

    const handleAddTransaction = () => {
        if (validateForm()) {
            addTransaction(payee, purchaseDate, Number(amount), category);
            setPayee('');
            setPurchaseDate('');
            setAmount('');
            setCategory('');
            setErrors({});
            closeModal()
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <button className="closeButton" onClick={closeModal}>X</button>

                <div>
                    <input
                        className='transactionInput'
                        value={payee}
                        onChange={(e) => setPayee(e.target.value)}
                        placeholder="Payee"
                    />
                    {errors.payee && <p style={{ color: 'red' }}>{errors.payee}</p>}
                </div>

                <div>
                    <select
                        className='transactionSelect'
                        value={purchaseDate.slice(-2)}
                        onChange={(e) => handleDateChange(e.target.value)}
                    >
                        <option value="">Select a day</option> {/* Placeholder option */}
                        {days.map((day) => (
                            <option key={day} value={day}>
                                {day}
                            </option>
                        ))}
                    </select>
                    {errors.purchaseDate && <p style={{ color: 'red' }}>{errors.purchaseDate}</p>}
                </div>

                <div>
                    <input
                        className='transactionInput'
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Transaction Amount"
                    />
                    {errors.amount && <p style={{ color: 'red' }}>{errors.amount}</p>}
                </div>

                <div>
                    <select
                        className='transactionSelect'
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="" disabled>Select a category</option>
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>
                    {errors.category && <p style={{ color: 'red' }}>{errors.category}</p>}
                </div>

                <button className="addButton" onClick={handleAddTransaction}>Add</button>
            </div>
        </div>
    );
};

export default AddTransactionModal;