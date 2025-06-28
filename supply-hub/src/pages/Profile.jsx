import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Profile({ user }) {
  const [formData, setFormData] = useState({
    username: '',
    lei: '',
    email: '',
    phone: '',
    city: '',
    address1: '',
    address2: '',
    password: ''
  });

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || '',
        lei: user.lei || '',
        email: user.email || '',
        phone: user.phone || '',
        city: user.city || '',
        address1: user.address1 || '',
        address2: user.address2 || '',
        password: user.password || ''
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const BASE_URL = process.env.REACT_APP_SERVER_URL;
      const res = await axios.put(`${BASE_URL}/api/profile`, formData);
      console.log(res);
      
      alert("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile");
    }
  };

  return (
    <div className="container text-white my-5">
      <div
        className="mx-auto p-4"
        style={{
          maxWidth: '700px',
          backgroundColor: '#000',
          borderRadius: '15px'
        }}
      >
        <h2 className="text-center mb-4">Profile</h2>
        <hr style={{ borderColor: 'white' }} />
        <form onSubmit={handleSubmit}>
          <div className="row mb-3">
            <div className="col">
              <label>Username:</label>
              <input
                type="text"
                className="form-control"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
            <div className="col">
              <label>LEGAL ENTITY IDENTIFIER:</label>
              <input
                type="text"
                className="form-control"
                name="lei"
                value={formData.lei}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mb-3">
            <label>Email:</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label>Phone number:</label>
            <input
              type="text"
              className="form-control"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label>City/State</label>
            <input
              type="text"
              className="form-control"
              name="city"
              value={formData.city}
              onChange={handleChange}
            />
          </div>

          <div className="row mb-3">
            <div className="col">
              <label>Address1:</label>
              <input
                type="text"
                className="form-control"
                name="address1"
                value={formData.address1}
                onChange={handleChange}
              />
            </div>
            <div className="col">
              <label>Address2:</label>
              <input
                type="text"
                className="form-control"
                name="address2"
                value={formData.address2}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mb-4">
            <label>Password:</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn btn-success">Submit</button>
        </form>
      </div>
    </div>
  );
}
