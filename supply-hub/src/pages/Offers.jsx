import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Offers({user}) {
  const a=user;
  const [offers, setOffers] = useState([]);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const BASE_URL = process.env.REACT_APP_SERVER_URL;
        const body = {username:user.username, password:user.password};
        console.log(a);
        

        const res = await axios.post(`${BASE_URL}/api/offers`, body);
        setOffers(res.data);
      } catch (err) {
        setError("Failed to load offers.");
        console.error(err);
      }
    };

    fetchOffers();
  }, []);

  const filteredOffers = offers.filter(offer =>
    offer.product.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCardClick = (id) => {
    navigate(`/offerdetails?id=${id}`);
  };

  return (
    <div className="container my-4">
      <h2 className="text-center text-white mb-4">Offers</h2>

      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Enter Name here..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {filteredOffers.length === 0 ? (
        <p className="text-white">No offers available.</p>
      ) : (
        <div className="d-flex flex-column gap-4">
          {filteredOffers.map((offer) => (
            <div
              key={offer.id}
              className="card bg-success text-white p-3 rounded"
              style={{ borderRadius: '15px', border: "2px solid #2B3035", cursor: "pointer" }}
              onClick={() => handleCardClick(offer.id)}
            >
              <h4>{offer.product}</h4>
              <br />
              <p>
                <strong>Partner:</strong> {offer.offerer_name}<br />
                <strong>Quantity:</strong> {offer.quantity}<br />
                <strong>Starting From:</strong> {new Date(offer.start_date).toLocaleDateString()}<br />
                <strong>Number of Batches:</strong> {offer.batches}<br />
                <strong>Complete by:</strong> {new Date(offer.end_date).toLocaleDateString()}<br />
                <strong>Price:</strong> {offer.price} JD
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
