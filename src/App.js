import { useState } from 'react';
import './App.css';
import Calander from './components/calander';
import AddTransaction from './components/addTransaction';
import Transaction from './components/transactions';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import TotalSpending from './components/totalSpending';


function App() {
  const [date, setDate] = useState(new Date());
  const [transactions, setTransactions] = useState({});

  ChartJS.register(ArcElement, Tooltip, Legend);

  const addTransaction = (payee, purchaseDate, amount, category) => {
    setTransactions(prevObject => ({
      ...prevObject,
      [date]: [...(prevObject[date] || []), { payee, purchaseDate, amount, category }]
    }));
  };

  const changeDate = (monthChange) => {
    setDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() + monthChange);
      return newDate;
    });
  };

  let total = 0
  let data;

  const categoryTotals = transactions[date]?.reduce((acc, transaction) => {
    const amount = parseFloat(transaction.amount);
    acc[transaction.category] = (acc[transaction.category] || 0) + amount;
    total += amount
    return acc;
  }, {});


  if (transactions[date]) {
    data = {
      labels: Object.keys(categoryTotals),
      datasets: [
        {
          label: 'Spending by Category',
          data: Object.values(categoryTotals),
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)',
            'rgba(255, 159, 64, 0.6)',
            'rgba(199, 199, 199, 0.6)',
            'rgba(83, 102, 255, 0.6)',
            'rgba(255, 90, 132, 0.6)',
            'rgba(60, 179, 113, 0.6)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(199, 199, 199, 1)',
            'rgba(83, 102, 255, 1)',
            'rgba(255, 90, 132, 1)',
            'rgba(60, 179, 113, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };
  }

  const defaultData = {
    labels: ["No Data"],
    datasets: [
      {
        label: "No Data",
        data: [1], // A single placeholder value
        backgroundColor: ["#ccc"], // Gray color for placeholder
        borderColor: ["#999"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className='dashboardContainer'>
      <div className='dateDataContainer'>
        <Calander date={date.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })} changeDate={changeDate} />
        <TotalSpending total={total} />
      </div>
      <div className='ExpensesContainer'>
        <div className='pieContainer'>
          <div style={{ width: '90%', height: '90%', display: 'flex', justifyContent: 'center' }}>
            {data ? <Pie data={data} /> : <Pie data={defaultData} />}
          </div>
        </div>
        <Transaction transactions={transactions} date={date} addTransaction={addTransaction} />
      </div>
    </div>
  );
}

export default App;
