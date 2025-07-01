const Transaction = require('../models/Transaction');

// @desc   Get all transactions
exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find(); //finds all transactions
    res.json(transactions); //sends result back to client as json
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc   Add a new transaction
exports.addTransaction = async (req, res) => {
  try {
    const newTxn = new Transaction(req.body); //creates a new transaction
    const savedTxn = await newTxn.save(); //save it in collection 
    res.status(201).json(savedTxn);
  } catch (err) {
    res.status(400).json({ error: 'Invalid data' });
  }
};
