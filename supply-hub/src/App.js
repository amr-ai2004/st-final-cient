import { Profiler, useEffect, useState } from 'react'
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom"
import axios from 'axios';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Components:
import Header from './components/Header';
import Footer from './components/Footer';
// Pages:
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import User from './pages/User';
import Profile from './pages/Profile';
import Offers from './pages/Offers';
import OfferDetails from './pages/OfferDetails';
import MyOffers from './pages/MyOffers';
import OfferCreate from './pages/OfferCreate';
import Blank from './pages/Blank';

function App() {
  return (
    <div>
      <Router>
        <Header/>
        <main>
          <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/signup" element={<SignUp/>}/>
            <Route path="/user" element={<User/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/offers" element={<Offers/>}/>
            <Route path="/offerdetails" element={<OfferDetails/>}/>
            <Route path="/myoffers" element={<MyOffers/>}/>
            <Route path="/offercreate" element={<OfferCreate/>}/>
            <Route path="*" element={<Blank/>}/>
          </Routes>
        </main>
      </Router>
      <Footer/>
    </div>
  );
}

export default App;
