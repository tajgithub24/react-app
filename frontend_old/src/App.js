import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

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
    <div className="App">
      <h1>Product List</h1>
      <div className="product-grid">
        {products.map(product => (
          <div className="product-card" key={product.id}>
            <img
              src={`${process.env.REACT_APP_IMAGE_BASE_URL}/${product.image}`}
              alt={product.name}
              width="150"
            />
            <h2>{product.name}</h2>
            <p>₹{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;


