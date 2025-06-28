import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function OfferCreate({user}) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    product: '',
    quantity: '',
    start_date: '',
    end_date: '',
    batches: '',
    price: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const BASE_URL = process.env.REACT_APP_SERVER_URL;
    // const user = {username:user.username, password:user.password};
    const payload = {
      ...formData,
      username: user.username,
      password: user.password
    };

    try {
      const res = await axios.post(`${BASE_URL}/api/offers/offercreate`, payload);
      setMessage(res.data.message || "Offer created successfully!");
      // Redirect to /myoffers after success
      navigate('/myoffers');
    } catch (err) {
      setMessage(err.response?.data?.error || "Failed to create offer.");
      console.error(err);
    }
  };

  return (
    <div className="container mt-4 text-white">
      <h2 className="text-center mb-4">Offer Create</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-success p-4 rounded"
        style={{ maxWidth: '600px', margin: '0 auto' }}
      >
        <h4 className="mb-3">Product Profile:</h4>

        <div className="mb-3">
          <label>Product Name:</label>
          <input type="text" name="product" className="form-control" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Quantity:</label>
          <input type="number" name="quantity" className="form-control" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Starting From:</label>
          <input type="date" name="start_date" className="form-control" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Number of Batches:</label>
          <input type="number" name="batches" className="form-control" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Complete by:</label>
          <input type="date" name="end_date" className="form-control" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Set Price:</label>
          <input type="number" name="price" className="form-control" step="0.01" onChange={handleChange} required />
        </div>

        <button className="btn btn-dark w-100">Submit</button>
      </form>

      {message && <div className="text-center mt-3 alert alert-info">{message}</div>}
    </div>
  );
}
