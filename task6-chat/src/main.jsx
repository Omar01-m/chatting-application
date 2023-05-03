import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import ChatProvider from './context/chatprovider';

createRoot(document.getElementById('root')).render(
  // Whatever state we create inside of the context API is going to be accessible to the whole app
  <BrowserRouter>
    <ChatProvider>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </ChatProvider>
  </BrowserRouter>
);
