import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Components:
import Header from './components/Header';
import Footer from './components/Footer';
// Pages:
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Bids from './pages/Bids';
import Profile from './pages/Profile';
import Offers from './pages/Offers';
import OfferDetails from './pages/OfferDetails';
import MyOffers from './pages/MyOffers';
import OfferCreate from './pages/OfferCreate';
import Blank from './pages/Blank';

function App() {
  const [user, setUser] = useState({});
  const [userLoaded, setUserLoaded] = useState(false);

  useEffect(() => {
    const temp = JSON.parse(localStorage.getItem('user'));
    if (temp) {
      setUser(temp);
    } else {
      setUser({
        address1: "",
        address2: "",
        city: "",
        email: "",
        id: 0,
        lei: "",
        password: "",
        phone: "",
        role: "",
        username: ""
      });
    }
    setUserLoaded(true);
    console.log("User: ", temp);
  }, []);

  return (
    <div>
      <Router>
        <Header user={user} setUser={setUser} />
        <main style={{ minHeight: '85vh' }}>
          {userLoaded ? (
            <Routes>
              <Route path="/" element={<Login user={user} setUser={setUser} />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/bids" element={<Bids user={user} />} />
              <Route path="/profile" element={<Profile user={user} setUser={setUser} />} />
              <Route path="/offers" element={<Offers user={user} />} />
              <Route path="/offerdetails" element={<OfferDetails user={user} />} />
              <Route path="/myoffers" element={<MyOffers user={user} />} />
              <Route path="/offercreate" element={<OfferCreate user={user} />} />
              <Route path="*" element={<Blank />} />
            </Routes>
          ) : (
            <div className="text-white text-center mt-5">Loading...</div>
          )}
        </main>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
