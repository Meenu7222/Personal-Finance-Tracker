import React, { useState, useEffect } from 'react';
import '../styles/addTransaction.css';
import Navbar from '../components/Navbar';
import transactionService from '../services/transactionService';

const AddTransactionPage = () => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('expense');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [customCategory, setCustomCategory] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await transactionService.getCategories();
      setCategories(data);
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const selectedCategory = category === 'custom' ? customCategory : category;

    if (!name || !amount || !selectedCategory) {
      alert('Please fill in all fields');
      return;
    }

    const transaction = {
      name,
      amount: parseFloat(amount),
      type,
      category: selectedCategory,
    };

    await transactionService.addTransaction(transaction);
    alert('Transaction added!');
    setName('');
    setAmount('');
    setType('expense');
    setCategory('');
    setCustomCategory('');
  };

  return (
    <div className="add-transaction-page">
      <Navbar />
      <form className="transaction-form" onSubmit={handleSubmit}>
        <h2>Add Transaction</h2>

        <input
          type="text"
          placeholder="Transaction name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">--Select Category--</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
          <option value="custom">+ Add Custom</option>
        </select>

        {category === 'custom' && (
          <input
            type="text"
            placeholder="Custom category"
            value={customCategory}
            onChange={(e) => setCustomCategory(e.target.value)}
          />
        )}

        <button type="submit">Add Transaction</button>
      </form>
    </div>
  );
};

export default AddTransactionPage;
