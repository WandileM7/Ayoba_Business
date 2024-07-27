import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const clientId = process.env.REACT_APP_AYOBA_CLIENT_ID;
const clientSecret = process.env.REACT_APP_AYOBA_CLIENT_SECRET;
const tokenUrl = process.env.REACT_APP_AYOBA_TOKEN_URL;
const apiUrl = process.env.REACT_APP_AYOBA_API_URL;

let accessToken = '';

const getAccessToken = async () => {
  if (accessToken) return accessToken;

  const response = await axios.post(tokenUrl, null, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    auth: {
      username: clientId,
      password: clientSecret,
    },
  });

  accessToken = response.data.access_token;
  return accessToken;
};

const api = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(async (config) => {
  const token = await getAccessToken();
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

const sendMessage = async (message, msisdns) => {
  const response = await api.post('/messages', { message, msisdns });
  return response.data;
};

const getOrders = async () => {
  const response = await api.get('/orders');
  return response.data;
};

const sendPromotion = async (promotion) => {
  const response = await api.post('/promotions', promotion);
  return response.data;
};

const getProfile = async () => {
  const response = await api.get('/profile');
  return response.data;
};

const updateProfile = async (profile) => {
  const response = await api.put('/profile', profile);
  return response.data;
};

function App() {
  const [orders, setOrders] = useState([]);
  const [profile, setProfile] = useState({});
  const [message, setMessage] = useState('');
  const [msisdns, setMsisdns] = useState('');
  const [promotion, setPromotion] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersData = await getOrders();
        setOrders(ordersData);
      } catch (error) {
        console.error('Error fetching orders', error);
      }
    };

    const fetchProfile = async () => {
      try {
        const profileData = await getProfile();
        setProfile(profileData);
      } catch (error) {
        console.error('Error fetching profile', error);
      }
    };

    fetchOrders();
    fetchProfile();
  }, []);

  const handleSendMessage = async () => {
    try {
      await sendMessage(message, msisdns.split(','));
      alert('Message sent successfully!');
    } catch (error) {
      console.error('Error sending message', error);
    }
  };

  const handleSendPromotion = async () => {
    try {
      await sendPromotion({ promotion });
      alert('Promotion sent successfully!');
    } catch (error) {
      console.error('Error sending promotion', error);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      await updateProfile(profile);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile', error);
    }
  };

  return (
    <div className="App">
      <h1>Ayoba Client Interface</h1>

      <section>
        <h2>Send Message</h2>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Message"
        />
        <input
          type="text"
          value={msisdns}
          onChange={(e) => setMsisdns(e.target.value)}
          placeholder="MSISDNs (comma separated)"
        />
        <button onClick={handleSendMessage}>Send Message</button>
      </section>

      <section>
        <h2>Orders</h2>
        <ul>
          {orders.map((order, index) => (
            <li key={index}>{order}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Send Promotion</h2>
        <textarea
          value={promotion}
          onChange={(e) => setPromotion(e.target.value)}
          placeholder="Promotion"
        />
        <button onClick={handleSendPromotion}>Send Promotion</button>
      </section>

      <section>
        <h2>Profile</h2>
        <textarea
          value={JSON.stringify(profile, null, 2)}
          onChange={(e) => setProfile(JSON.parse(e.target.value))}
        />
        <button onClick={handleUpdateProfile}>Update Profile</button>
      </section>
    </div>
  );
}

export default App;
