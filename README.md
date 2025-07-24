##1. Prerequisites

- A Linux VM or server (e.g., Ubuntu 22.04+)
- Node.js and npm installed
- MySQL server running and accessible
- Git installed
- curl or wget installed

##2. Backend Setup

i. Create a new directory for the backend:
```
   mkdir -p ~/app-react-ecommerce/backend
   cd ~/app-react-ecommerce/backend
```

ii. Initialize a new Node.js project:
```
   npm init -y
```

iii. Install necessary packages:
```
   npm install express mysql2 cors dotenv
```

iv. Create required files:
   - app.js (main server file)
   - db.js (database connection)

v. Sample app.js:
```
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
    console.error(err);
    res.status(500).send('Server error');
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, '0.0.0.0', () => console.log(`Server running at http://0.0.0.0:${PORT}`));

```

vi. Sample db.js:
```
const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
});

module.exports = pool;
```

vii. .env File

Create a `.env` file in the backend directory:
```
DB_HOST=localhost
DB_USER=root
DB_PASS=yourpassword
DB_NAME=ecommerce
```
##3. Frontend Setup

i. Create a new React app:
```
   cd ~/app-react-ecommerce
   npx create-react-app frontend
   cd frontend
```

ii. Install Axios:
```
   npm install axios
```

iii. Create `.env` file in the frontend directory:
```
REACT_APP_API_BASE_URL=http://<VM-IP>:4000
REACT_APP_IMAGE_BASE_URL=http://<VM-IP>:4000/images
```

iv. Update `src/App.js`:
```
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    console.log('API URL:', process.env.REACT_APP_API_BASE_URL);
    console.log('Image URL:', process.env.REACT_APP_IMAGE_BASE_URL);
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/products`)
      .then(res => {
        console.log('Products:', res.data);
        setProducts(res.data);
      })
      .catch(err => console.error('Fetch error:', err));
  }, []);

  return (
    <div>
      <h1>Product List</h1>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            <img src={`${process.env.REACT_APP_IMAGE_BASE_URL}/${product.image}`} alt={product.name} width="100" />
            <p>{product.name} - ${product.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default App;
```

##4. MySQL Setup

i. Create database and table:
```
CREATE DATABASE ecommerce;
USE ecommerce;

CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  description TEXT,
  price DECIMAL(10,2),
  image VARCHAR(255)
);
```

ii. Insert sample data:
```
INSERT INTO products (id, name, price, description, image_url) VALUES
(1, 'iPhone 15', 79999.00, 'Latest Apple phone', 'iphone15.jpg'),
(2, 'Samsung Galaxy S23', 69999.00, 'High-end Android phone', 'galaxyS23.jpg'),
(3, 'Nothing Phone 2', 45999.00, 'Flagship killer', 'nothing2.jpg'),
(4, 'Laptop', 99999.00, 'A fast laptop', 'laptop.jpg'),
(5, 'Phone', 4999.00, 'A smart phone', 'phone.jpg'),
(6, 'Mouse', 999.00, 'Wireless mouse', 'mouse.jpg'),
(7, 'Keyboard', 1599.00, 'Mechanical keyboard', 'keyboard.jpg'),
(8, 'Running Shoes', 1999.00, 'Comfortable and lightweight', 'shoes.jpg'),
(9, 'Smartphone Case', 499.00, 'Shockproof and stylish', 'case.jpg'),
(10, 'Bluetooth Headphones', 1299.00, 'Noise-cancelling with long battery life', 'headphones.jpg');
```

##5. Running the App

i. Start backend:
```
   cd ~/app-react-ecommerce/backend
   node app.js
```
ii. Start frontend:
```
   cd ~/app-react-ecommerce/frontend
   npm start
```

iii. Open the browser:
```
   http://localhost:3000
```


