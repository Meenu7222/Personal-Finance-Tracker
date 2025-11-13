import React from 'react';

const TransactionList = ({ transactions }) => {
  // Debug log to see what we're receiving
  console.log("TransactionList received:", transactions, typeof transactions);

  // Ensure transactions is always an array
  const safeTransactions = Array.isArray(transactions) ? transactions : [];

  return (
    <div className="transaction-list">
      <h3>Recent Transactions</h3>
      
      {safeTransactions.length === 0 ? (
        <div className="no-transactions">
          <p>No transactions found</p>
        </div>
      ) : (
        <div className="transactions">
          {safeTransactions.map((transaction, index) => (
            <div 
              key={transaction?.transaction_id || transaction?.id || index} 
              className="transaction-item"
            >
              <div className="transaction-name">
                {transaction?.name || 'Unknown'}
              </div>
              <div className="transaction-category">
                {transaction?.category || 'No Category'}
              </div>
              <div className={`transaction-amount ${transaction?.type === 'expense' ? 'expense' : 'income'}`}>
                {transaction?.type === 'expense' ? '-' : '+'}₹{transaction?.amount || 0}
              </div>
              <div className="transaction-date">
                {transaction?.date ? new Date(transaction.date).toLocaleDateString() : 'No Date'}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TransactionList;