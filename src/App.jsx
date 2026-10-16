import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Read the environment variable target URL
  const API_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    // Fetch products from the Node.js/PostgreSQL backend
    axios.get(`${API_URL}/api/product`)
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data: ", err);
        setError("Failed to fetch products from backend server.");
        setLoading(false);
      });
  }, [API_URL]);

  if (loading) return <div style={{ padding: '20px', textAlign: 'center' }}>Loading Admin Panel Data...</div>;
  if (error) return <div style={{ padding: '20px', color: 'red', textAlign: 'center' }}>{error}</div>;

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: '#008080', borderBottom: '2px solid #008080', paddingBottom: '10px' }}>
        ZindaShop Admin Dashboard
      </h1>
      
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr style={{ backgroundColor: '#008080', color: 'white', textAlign: 'left' }}>
            <th style={{ padding: '12px', border: '1px solid #ddd' }}>ID</th>
            <th style={{ padding: '12px', border: '1px solid #ddd' }}>Product Name</th>
            <th style={{ padding: '12px', border: '1px solid #ddd' }}>Price</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '12px', border: '1px solid #ddd' }}>{product.id}</td>
              <td style={{ padding: '12px', border: '1px solid #ddd', fontWeight: 'bold' }}>
                {product.productName}
              </td>
              <td style={{ padding: '12px', border: '1px solid #ddd', color: 'green', fontWeight: 'bold' }}>
                {product.price} AFN
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
