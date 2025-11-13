const pool = require('../config/db');

const getAnalytics = async (req, res) => {
  try {
    const incomeRes = await pool.query(
      'SELECT SUM(amount) as total_income FROM transactions WHERE user_id = $1 AND type = $2',
      [req.user.id, 'income']
    );

    const expenseRes = await pool.query(
      'SELECT SUM(amount) as total_expense FROM transactions WHERE user_id = $1 AND type = $2',
      [req.user.id, 'expense']
    );

    res.json({
      totalIncome: incomeRes.rows[0].total_income || 0,
      totalExpense: expenseRes.rows[0].total_expense || 0,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAnalytics };
