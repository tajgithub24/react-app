const express = require('express');
const cors = require('cors');
const db = require('./db');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'images')));

app.get('/api/products', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM products');
    res.json(rows);
  } catch (err) {
    console.error('DB Error:', err);
    res.status(500).send('Error fetching products');
  }
});

app.listen(process.env.PORT, '0.0.0.0',  () => {
  console.log(`Server running on http://0.0.0.0:${process.env.PORT}`);
});

