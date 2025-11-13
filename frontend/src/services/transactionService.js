const BASE_URL = 'http://localhost:5000/api';

const getTokenHeader = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
});

const getTransactions = async () => {
  const res = await fetch(`${BASE_URL}/transactions`, getTokenHeader());
  return res.json();
};

const addTransaction = async (transaction) => {
  const res = await fetch(`${BASE_URL}/transactions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(transaction),
  });
  return res.json();
};

const getCategories = async () => {
  const res = await fetch(`${BASE_URL}/categories`, getTokenHeader());
  return res.json();
};

const getAnalysis = async (view) => {
  const res = await fetch(`${BASE_URL}/analytics?period=${view}`, getTokenHeader());
  return res.json();
};

export default {
  getAll: getTransactions,   // 👈 alias
  getTransactions,
  addTransaction,
  getCategories,
  getAnalysis,
};