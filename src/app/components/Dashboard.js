import React, { useState, useEffect } from 'react';
import { getMessages, sendMessage } from '../services/api';
import MessageList from './MessageList';
import MessageForm from './MessageForm';

const Dashboard = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      const data = await getMessages();
      setMessages(data);
    };

    fetchMessages();
  }, []);

  const handleSendMessage = async (message) => {
    const newMessage = await sendMessage(message);
    setMessages([...messages, newMessage]);
  };

  return (
    <div>
      <h1>Business Dashboard</h1>
      <MessageList messages={messages} />
      <MessageForm onSendMessage={handleSendMessage} />
    </div>
  );
};

export default Dashboard;
