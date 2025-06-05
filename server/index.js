const express = require('express');
const cors = require('cors');
require('dotenv').config();

const listRoutes = require('./routes/lists');
const cardRoutes = require('./routes/cards');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/lists', listRoutes);
app.use('/api/cards', cardRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Trello Clone API is running' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});