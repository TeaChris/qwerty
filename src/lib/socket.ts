import { io } from 'socket.io-client';

const API_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:8000';

export const socket = io(API_URL, {
      withCredentials: true,
      autoConnect: false // Connect manually when needed
});

export const connectSocket = () => {
      if (!socket.connected) {
            socket.connect();
      }
};

export const disconnectSocket = () => {
      if (socket.connected) {
            socket.disconnect();
      }
};
