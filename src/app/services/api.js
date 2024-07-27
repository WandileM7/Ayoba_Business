import axios from 'axios';

// Set up the base URL and headers
const api = axios.create({
  baseURL: 'https://api.ayoba.me/v1',
  headers: {
    Authorization: `Bearer YOUR_JWT_TOKEN`,
    'Content-Type': 'application/json',
  },
});

// Example API calls
export const getMessages = async () => {
  try {
    const response = await api.get('/messages');
    return response.data;
  } catch (error) {
    console.error('Error fetching messages', error);
    throw error;
  }
};

export const sendMessage = async (message) => {
  try {
    const response = await api.post('/messages', message);
    return response.data;
  } catch (error) {
    console.error('Error sending message', error);
    throw error;
  }
};

// Add more API calls as needed
