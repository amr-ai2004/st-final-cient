import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

export default function OfferDetails({user}) {
  const [offer, setOffer] = useState(null);
  const [error, setError] = useState('');
  const [bidPrice, setBidPrice] = useState('');
  const [role, setRole] = useState('');
  const [userId, setUserId] = useState(null);
  const [bids, setBids] = useState([]);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const offerId = queryParams.get('id');

  useEffect(() => {
    const fetchOfferDetails = async () => {
      try {
        const BASE_URL = process.env.REACT_APP_SERVER_URL;
        const credentials = {username:user.username, password:user.password};
        setRole(credentials.role);
        // console.log(credentials);

        const res = await axios.post(`${BASE_URL}/api/offers/offerdetails/${offerId}`, credentials);
        setOffer(res.data);

        const authRes = await axios.post(`${BASE_URL}/api/auth/login`, credentials);
        setUserId(authRes.data.user.id);
        console.log("User:",res.data.offerer_name === credentials.username && user.role === 'supplier');

        if (res.data.offerer_name === credentials.username && user.role === 'supplier') {
          // This is the offerer's own offer
          const bidsRes = await axios.post(`${BASE_URL}/api/offers/offerbid/${offerId}`, credentials);
          console.log("Offer:",bidsRes.data.offerId);
          
          
          setBids(bidsRes.data.bids);
        }
      } catch (err) {
        console.error(err);
        setError('Failed to load offer details.');
      }
    };

    if (offerId) {
      fetchOfferDetails();
    } else {
      setError('No offer ID provided.');
    }
  }, [offerId]);

  const handleBidSubmit = async (e) => {
    e.preventDefault();
    try {
      const BASE_URL = process.env.REACT_APP_SERVER_URL;
      const credentials = {username:user.username, password:user.password};;
      const res = await axios.post(`${BASE_URL}/api/offers/offerbid`, {
        ...credentials,
        offerId,
        bidPrice,
      });
      alert(res.data.message);
      setBidPrice('');
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || 'Failed to submit bid.');
    }
  };

  if (error) {
    return <div className="container mt-4 text-danger">{error}</div>;
  }

  if (!offer) {
    return <div className="container mt-4 text-white">Loading offer details...</div>;
  }

  return (
    <div className="container mt-4 text-white">
      <h2>Offer Details</h2>
      <div
        className="card bg-success text-white p-4 mt-3"
        style={{ borderRadius: '15px', border: '2px solid black' }}
      >
        <h3>{offer.product}</h3>
        <p><strong>Quantity:</strong> {offer.quantity}</p>
        <p><strong>Price:</strong> {offer.price} JD</p>
        <p><strong>Batches:</strong> {offer.batches}</p>
        <p><strong>Start Date:</strong> {new Date(offer.start_date).toLocaleDateString()}</p>
        <p><strong>End Date:</strong> {new Date(offer.end_date).toLocaleDateString()}</p>
        <p><strong>Offerer:</strong> {offer.offerer_name} ({offer.offerer_role})</p>
      </div>

      {user.role == 'buyer' && (
        <div className="container mt-4 text-white bg-dark">
          <h4>Place a Bid</h4>
          <form onSubmit={handleBidSubmit}>
            <div className="mb-3">
              <label className="form-label">Bid Price (JD):</label>
              <input
                type="number"
                className="form-control"
                value={bidPrice}
                onChange={(e) => setBidPrice(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-light">Submit Bid</button>
          </form>
        </div>
      )}

      {user.role === 'supplier' && offer.offerer_name === user.username && (
        <div className="mt-5 bg-dark">
          <h4>Bids on This Offer</h4>
          {bids.length === 0 ? (
            <p>No bids yet.</p>
          ) : (
            <ul className="list-group">
              {bids.map((bid) => (
                <li key={bid.id} className="list-group-item d-flex justify-content-between align-items-center">
                  {bid.bidder_name} - {bid.price} JD
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
