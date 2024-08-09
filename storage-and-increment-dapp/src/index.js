import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
 
import { FuelProvider } from '@fuels/react';
import { defaultConnectors } from '@fuels/connectors';
 
const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <FuelProvider fuelConfig={{ connectors: defaultConnectors({ devMode: true }) }}>
        <App />
      </FuelProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
