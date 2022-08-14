import React, {useState, useRef, useEffect} from "react";

function TransactionTable({txns}) {
  const [transactions, setTransactions] = useState(txns);
  const [filterDate, setFilterDate] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);
  const inputDate = useRef(null);
  // sort by amount
  const sortHandler = () => {
    if(sortOrder === 'asc'){
      setSortOrder('desc')
    } else {
      setSortOrder('asc')
    }
  };

  const filterDateHandler = () => {
    setFilterDate(inputDate.current.value);
  }

  const clearDateHandler = () => {
    setFilterDate(null);
  }

  useEffect(() => {
    if(!filterDate) {
      setTransactions(txns);
    } else {
      setTransactions(txns.filter(item => {
        return item.date === filterDate
      }));
    };
  } , [filterDate, txns]);

  useEffect(() => {
    setTransactions(transactions.sort((a, b) => {
      return sortOrder === 'asc' ?  a.amount - b.amount : b.amount - a.amount;
    }));
  } , [sortOrder, transactions]);

  return (
    <div className="layout-column align-items-center mt-50">
      <section className="layout-row align-items-center justify-content-center">
        <label className="mr-10">Transaction Date</label>
        <input ref={inputDate} id="date" type="date"/>
        <button className="small" onClick={filterDateHandler}>Filter</button>
        <button className="small" onClick={clearDateHandler} style={{ margin: '0px'}}>All</button>
      </section>

      <div className="card mt-50">
          <table className="table">
              <thead>
              <tr className="table">
                  <th className="table-header">Date</th>
                  <th className="table-header">Description</th>
                  <th className="table-header">Type</th>
                  <th className="table-header">
                      <span id="amount" onClick={sortHandler} style={{cursor: 'pointer'}}>Amount ($) </span>
                  </th>
                  <th className="table-header">Available Balance</th>
              </tr>
              </thead>
              <tbody>
                {transactions.map((el, index) => {
                  return (
                    <tr key={index} className="table">
                      <td className="table-data">{el.date}</td>
                      <td className="table-data">{el.description}</td>
                      <td className="table-data">{el.type}</td>
                      <td className="table-data">{el.amount}</td>
                      <td className="table-data">{el.balance}</td>
                    </tr>
                  );
                })}
              </tbody>
          </table>
      </div>
    </div>
  );
}

export default TransactionTable;
