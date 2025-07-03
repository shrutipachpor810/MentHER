import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'mentee' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const res = await axios.post('http://localhost:5000/api/auth/signup', form);
      localStorage.setItem('token', res.data.token);
      setSuccess('Signup successful! Redirecting...');
      // Wait 1.5 sec then redirect
      setTimeout(() => navigate('/dashboard'), 1500);
    } catch (err) {
      console.error(err.response?.data || err);
      setError(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Signup</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input
          placeholder="Name"
          type="text"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
          required
        />
        <select
          value={form.role}
          onChange={e => setForm({ ...form, role: e.target.value })}
          required
        >
          <option value="mentee">Mentee</option>
          <option value="mentor">Mentor</option>
        </select>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}
