"use client";
import { useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import axios from 'axios';

export default function Home() {
  const [message, setMessage] = useState('');
  const [msisdns, setMsisdns] = useState('');
  const [promotion, setPromotion] = useState('');
  const [orders, setOrders] = useState<any[]>([]);
  const [profile, setProfile] = useState<any>({});

  const sendMessage = async () => {
    try {
      const response = await axios.post('/api/messages', { message, msisdns });
      console.log('Message sent:', response.data);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await axios.get('/api/orders');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const sendPromotion = async () => {
    try {
      const response = await axios.post('/api/promotions', { promotion });
      console.log('Promotion sent:', response.data);
    } catch (error) {
      console.error('Error sending promotion:', error);
    }
  };

  const fetchProfile = async () => {
    try {
      const response = await axios.get('/api/profile');
      setProfile(response.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          Manage your application features from here.
        </p>
        <div>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{" "}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className={styles.vercelLogo}
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>

      <div className={styles.center}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>

      <div className={styles.grid}>
        <section className={styles.card}>
          <h2>Send Message</h2>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Message"
            rows={4}
            style={{ width: '100%', marginBottom: '10px' }}
          />
          <input
            type="text"
            value={msisdns}
            onChange={(e) => setMsisdns(e.target.value)}
            placeholder="MSISDNs (comma separated)"
            style={{ width: '100%', marginBottom: '10px' }}
          />
          <button onClick={sendMessage}>Send Message</button>
        </section>

        <section className={styles.card}>
          <h2>Fetch Orders</h2>
          <button onClick={fetchOrders}>Fetch Orders</button>
          <ul>
            {orders.map((order, index) => (
              <li key={index}>{JSON.stringify(order)}</li>
            ))}
          </ul>
        </section>

        <section className={styles.card}>
          <h2>Send Promotion</h2>
          <textarea
            value={promotion}
            onChange={(e) => setPromotion(e.target.value)}
            placeholder="Promotion"
            rows={4}
            style={{ width: '100%', marginBottom: '10px' }}
          />
          <button onClick={sendPromotion}>Send Promotion</button>
        </section>

        <section className={styles.card}>
          <h2>Profile</h2>
          <button onClick={fetchProfile}>Fetch Profile</button>
          <pre>{JSON.stringify(profile, null, 2)}</pre>
        </section>
      </div>
    </main>
  );
}
