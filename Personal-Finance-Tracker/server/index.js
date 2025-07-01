const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config({ path: './.env' });
const transactionRoutes = require('./routes/transactionRoutes');
const app = express();transactionRoutes
app.use(cors());
app.use(express.json());

const transactionRoutes = require('./routes/transactions');
app.get('/', (req, res) => {
  res.send('Finance Tracker API is running ');
});

app.use('/api/transactions', transactionRoutes);

const PORT=process.env.PORT||5000;
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log("Server running on port ${PORT}")))
  .catch(err => console.log(err));
