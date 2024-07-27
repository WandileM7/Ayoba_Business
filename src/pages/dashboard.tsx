import React, { useState, useEffect } from 'react';
import { getMessages, sendMessage, getOrders, sendPromotion, getProfile, updateProfile } from '../services/api';
import MessageList from '../components/MessageList';
import MessageForm from '../components/MessageForm';
import OrderList from '../components/OrderList';
import PromotionForm from '../components/PromotionForm';
import ProfileManagement from '../components/ProfileManagement';

const Dashboard = () => {
  const [messages, setMessages] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      const data = await getMessages();
      setMessages(data);
    };

    const fetchOrders = async () => {
      const data = await getOrders();
      setOrders(data);
    };

    fetchMessages();
    fetchOrders();
  }, []);

  const handleSendMessage = async (message) => {
    const newMessage = await sendMessage(message);
    setMessages([...messages, newMessage]);
  };

  return (
    <div>
      <h1>Kota Shop Dashboard</h1>
      <ProfileManagement />
      <OrderList orders={orders} />
      <MessageList messages={messages} />
      <MessageForm onSendMessage={handleSendMessage} />
      <PromotionForm />
    </div>
  );
};

export default Dashboard;