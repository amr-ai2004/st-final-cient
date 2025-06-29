import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    LEI: '',
    email: '',
    phone: '',
    role: '',
    city: '',
    address1: '',
    address2: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const dataToSend = { ...formData };
      delete dataToSend.confirmPassword;

      const BASE_URL = process.env.REACT_APP_SERVER_URL;
      const res = await axios.post(`${BASE_URL}/api/auth/signup`, dataToSend);
      alert(res.data.message || 'Signup successful!');
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.error || 'Signup failed');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      <form onSubmit={handleSubmit} style={{ width: '600px', background: 'black', color: 'white', padding: '2rem', borderRadius: '10px' }}>
        <h3 className="text-center mb-4">Sign Up</h3>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label>Username:</label>
            <input type="text" className="form-control" name="username" value={formData.username} onChange={handleChange} required />
          </div>
          <div className="col-md-6 mb-3">
            <label>LEGAL ENTITY IDENTIFIER:</label>
            <input type="text" className="form-control" name="LEI" value={formData.LEI} onChange={handleChange} required />
          </div>
          <div className="col-md-6 mb-3">
            <label>Email:</label>
            <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="col-md-6 mb-3">
            <label>Phone number:</label>
            <input type="text" className="form-control" name="phone" value={formData.phone} onChange={handleChange} required />
          </div>
          <div className="col-md-6 mb-3">
            <label>Role:</label>
            <select className="form-control" name="role" value={formData.role} onChange={handleChange} required>
              <option value="">Select Role</option>
              <option value="supplier">Supplier</option>
              <option value="buyer">Buyer</option>
            </select>
          </div>
          <div className="col-md-6 mb-3">
            <label>City/State:</label>
            <input type="text" className="form-control" name="city" value={formData.city} onChange={handleChange} required />
          </div>
          <div className="col-md-6 mb-3">
            <label>Address1:</label>
            <input type="text" className="form-control" name="address1" value={formData.address1} onChange={handleChange} required />
          </div>
          <div className="col-md-6 mb-3">
            <label>Address2:</label>
            <input type="text" className="form-control" name="address2" value={formData.address2} onChange={handleChange} />
          </div>
          <div className="col-md-6 mb-3">
            <label>Password:</label>
            <input type="password" className="form-control" name="password" value={formData.password} onChange={handleChange} required />
          </div>
          <div className="col-md-6 mb-3">
            <label>Repeat Password:</label>
            <input type="password" className="form-control" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
          </div>
        </div>
        <button className="btn btn-success w-100">Register</button>
        <center><span onClick={()=>navigate('/')} style={{color:'white', textDecoration:"underline"}}>Or you can Login here</span></center>
      </form>
    </div>
  );
}
