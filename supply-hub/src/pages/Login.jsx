import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login({user, setUser}) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleChange = e => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const BASE_URL = process.env.REACT_APP_SERVER_URL;
      const res = await axios.post(`${BASE_URL}/api/auth/login`, formData);
      alert(res.data.message);
      // console.log({...res.data.user, ...formData});
      localStorage.setItem('user', JSON.stringify({...res.data.user, ...formData}));
      setUser(prev => ({...res.data.user, ...formData}));
      console.log({...res.data.user, ...formData})
      navigate('/offers'); // Redirect after login
    } catch (err) {
      alert(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '70vh' }}>
      <form onSubmit={handleSubmit} style={{ width: '400px', background: 'black', color: 'white', padding: '2rem', borderRadius: '10px' }}>
        <h3 className="text-center mb-4">Login</h3>
        <div className="mb-3">
          <label>Username:</label>
          <input type="text" className="form-control" name="username" value={formData.username} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Password:</label>
          <input type="password" className="form-control" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <button className="btn btn-success w-100">Login</button>
        <center><a onClick={()=>navigate('/signup')} style={{color:'white', textDecoration:"underline"}}>Or you can Signup here</a></center>
      </form>
    </div>
  );
}
