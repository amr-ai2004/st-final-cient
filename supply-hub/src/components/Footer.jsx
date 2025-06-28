import React, { useEffect, useState } from 'react';
import axios from 'axios';


export default function Footer() {
const [quote, setQuote] = useState('Loading Qoute of the day... :)');
  
useEffect(() => {
    const BASE_URL = process.env.REACT_APP_SERVER_URL;
    axios.get(`${BASE_URL}/qoute`)
      .then(response => {
        const {qoute:data} = response.data;
        setQuote(data);
      })
      .catch(error => {
        console.error('Error fetching the quote:', error);
      });
  }, []);

  return (
    <footer style={{backgroundColor:"#2B3035", color:"white", textAlign:"center"}}>
      <p>@ 2025 Supply HUB by Amr Mahadeen. All rights reserved.</p>
      <span>{quote}</span>
    </footer>
  )
}
