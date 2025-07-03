import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
export default function Dashboard() {
  const [data, setData] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProtected = async () => {
      const token = localStorage.getItem('token'); // get JWT
      if (!token) {
        setError('No token found. Please login first.');
        return;
      }

      try {
        const res = await axios.get('http://localhost:5000/api/protected', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(JSON.stringify(res.data, null, 2));
      } catch (err) {
        console.error(err.response?.data || err);
        setError(err.response?.data?.message || 'Failed to fetch protected data');
      }
    };

    fetchProtected();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Dashboard</h2>
      <Link to="/logout">
  <button>Logout</button>
</Link>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {data && <pre>{data}</pre>}
    </div>
  );
}
