/**
 * Main application entry point for the Codigo Escrow Template
 * 
 * This file initializes the React application with:
 * - Solana wallet integration
 * - React Router for navigation
 * - Global styles and polyfills
 * 
 * @author David James
 * @email ccrowndavid@gmail.com
 * @github https://www.github.com/David-CCrown
 */

// Load polyfills required for Solana web3.js in browser environment
import './polyfills';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';
import { router } from './config/router.tsx';
import { WalletContextProvider } from './contexts/WalletContext.tsx';

// Application-wide CSS including fonts and Tailwind utilities
import './globals.css';
// Solana wallet adapter default styles for connection UI
import '@solana/wallet-adapter-react-ui/styles.css';

/**
 * Application entry point
 * 
 * Initializes the React app with:
 * - React.StrictMode for development checks
 * - WalletContextProvider for Solana wallet connection management
 * - RouterProvider for client-side routing
 */
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found. Make sure index.html contains a div with id="root"');
}

createRoot(rootElement).render(
  <StrictMode>
    <WalletContextProvider>
      <RouterProvider router={router} />
    </WalletContextProvider>
  </StrictMode>
);
