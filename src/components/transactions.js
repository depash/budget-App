import AddTransaction from './addTransaction';
import './transaction.css';

import React, { useState } from 'react';

function Transaction({ transactions, date, addTransaction }) {

    const transactionsPerPage = 6;
    const [currentPage, setCurrentPage] = useState(1);

    const allTransactions = transactions[date] || [];
    const totalPages = Math.ceil(allTransactions.length / transactionsPerPage);

    const indexOfLastTransaction = currentPage * transactionsPerPage;
    const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
    const currentTransactions = allTransactions.slice(indexOfFirstTransaction, indexOfLastTransaction);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="transactionContainer">
            <h2>Transactions This Month</h2>
            <table className="transactionTable">
                <thead>
                    <tr>
                        <th>Payee</th>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Category</th>
                    </tr>
                </thead>
                <tbody>
                    {currentTransactions.map((transaction, index) => (
                        <tr key={index} className="transaction">
                            <td>{transaction.payee}</td>
                            <td>{transaction.purchaseDate}</td>
                            <td>${transaction.amount}</td>
                            <td>{transaction.category}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="pagination">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        className={currentPage === index + 1 ? 'active' : ''}
                        onClick={() => handlePageChange(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>

            <AddTransaction addTransaction={addTransaction} date={date} />
        </div>
    );
}

export default Transaction;