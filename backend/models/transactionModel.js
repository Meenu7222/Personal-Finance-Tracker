const pool = require('../config/db');

// Helper function to get or create category
const getCategoryId = async (categoryName) => {
  try {
    // Check if category already exists
    let result = await pool.query(
      'SELECT category_id FROM categories WHERE name = $1',
      [categoryName]
    );
    
    if (result.rows.length > 0) {
      return result.rows[0].category_id;
    }
    
    // If not, create new category
    result = await pool.query(
      'INSERT INTO categories (name) VALUES ($1) RETURNING category_id',
      [categoryName]
    );
    
    return result.rows[0].category_id;
  } catch (error) {
    console.error('Error getting/creating category:', error);
    throw error;
  }
};

// Add a transaction
const addTransaction = async (userId, amount, categoryName, type, date, name) => {
  try {
    console.log('Adding transaction:', { userId, amount, categoryName, type, date, name });

    // Get category ID
    const categoryId = await getCategoryId(categoryName);

    // Insert transaction
    const result = await pool.query(
      'INSERT INTO transactions (user_id, category_id, name, amount, type, date) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [userId, categoryId, name, parseFloat(amount), type, date || new Date()]
    );

    return result.rows[0];
  } catch (error) {
    console.error('Database error in addTransaction:', error);
    throw error;
  }
};

// Get transactions for a user
const getTransactionsByUser = async (userId) => {
  try {
    const result = await pool.query(
      `SELECT t.transaction_id, t.user_id, t.name, t.amount, t.type, t.date, c.name as category
       FROM transactions t
       LEFT JOIN categories c ON t.category_id = c.category_id
       WHERE t.user_id = $1
       ORDER BY t.date DESC`,
      [userId]
    );
    return result.rows;
  } catch (error) {
    console.error('Database error in getTransactionsByUser:', error);
    throw error;
  }
};

module.exports = { addTransaction, getTransactionsByUser };
