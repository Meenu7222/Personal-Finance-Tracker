/*const { addTransaction, getTransactionsByUser } = require('../models/transactionModel');

const createTransaction = async (req, res) => {
  const { name, amount, category, type, date } = req.body;
  
  // Add validation
  if (!name || !amount || !category || !type) {
    return res.status(400).json({ 
      message: 'Missing required fields: name, amount, category, type are required' 
    });
  }

  try {
    console.log('Creating transaction for user:', req.user.id);
    console.log('Transaction data:', { name, amount, category, type, date });
    
    const transaction = await addTransaction(
      req.user.id,
      amount,
      category, // This will be converted to category_id in the model
      type,
      date,
      name
    );
    
    res.status(201).json(transaction);
  } catch (err) {
    console.error('Transaction creation error:', err);
    res.status(500).json({ message: err.message });
  }
};

const getUserTransactions = async (req, res) => {
  try {
    console.log('Fetching transactions for user:', req.user.id);
    const transactions = await getTransactionsByUser(req.user.id);
    res.json(transactions);
  } catch (err) {
    console.error('Get transactions error:', err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createTransaction, getUserTransactions };*/
const { addTransaction, getTransactionsByUser } = require('../models/transactionModel');

// Create a new transaction
const createTransaction = async (req, res) => {
  try {
    const user = req.user; // Assuming authentication middleware sets req.user
    const { amount, category, type, date, name } = req.body;

    console.log('Creating transaction for user:', user.id);
    console.log('Transaction data:', req.body);

    const transaction = await addTransaction(
      user.id,
      amount,
      category, // category name from frontend
      type,
      date,
      name
    );

    res.status(201).json({ success: true, transaction });
  } catch (error) {
    console.error('Transaction creation error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all transactions for a user
const getUserTransactions = async (req, res) => {
  try {
    const user = req.user;
    const transactions = await getTransactionsByUser(user.id);
    res.status(200).json({ success: true, transactions });
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { createTransaction, getUserTransactions };
