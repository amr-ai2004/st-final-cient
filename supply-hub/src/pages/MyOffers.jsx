import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function MyOffers({user}) {
  const [offers, setOffers] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchMyOffers = async () => {
    try {
      const BASE_URL = process.env.REACT_APP_SERVER_URL;
      const body = {username:user.username, password:user.password};
      console.log({username:user.username, password:user.password});
      
      const res = await axios.post(`${BASE_URL}/api/offers/myoffers`, body);
      setOffers(res.data);
    } catch (err) {
      setError('Failed to load your offers.');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMyOffers();
  }, []);

  const handleDelete = async (offerId) => {
    try {
      const BASE_URL = process.env.REACT_APP_SERVER_URL;
      const credentials = {username:user.username, password:user.password};

      const res = await axios.delete(`${BASE_URL}/api/offers/${offerId}`, {
        data: credentials // sent in request body for basicAuth
      });

      setSuccess(res.data.message);
      // Refresh list after deletion
      setOffers(offers.filter((offer) => offer.id !== offerId));
    } catch (err) {
      console.error('Delete error:', err);
      setError('Failed to delete offer.');
    }
  };

  return (
    <div className="container my-4">
      <h2 className="text-center text-white mb-4">My Offers</h2>

      <div className="d-flex justify-content-end mb-3">
        <a href="/offercreate" className="btn btn-success">Add Offer</a>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      {offers.length === 0 ? (
        <p className="text-white">You haven’t created any offers yet.</p>
      ) : (
        <div className="d-flex flex-column gap-4">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className="card bg-success text-white p-3 rounded"
              style={{ borderRadius: '15px' }}
            >
              <h4>{offer.product}</h4>
              <p>
                <strong>Quantity:</strong> {offer.quantity}<br />
                <strong>Starting From:</strong> {new Date(offer.start_date).toLocaleDateString()}<br />
                <strong>Number of Batches:</strong> {offer.batches}<br />
                <strong>Complete by:</strong> {new Date(offer.end_date).toLocaleDateString()}<br />
                <strong>Set Price:</strong> {offer.price} JD
              </p>
              <button
                onClick={() => handleDelete(offer.id)}
                className="btn btn-danger"
              >
                Delete Offer
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
