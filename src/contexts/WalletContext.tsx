/**
 * Wallet Context Provider for Codigo Escrow Template
 * 
 * @author David James
 * @email ccrowndavid@gmail.com
 * @github https://www.github.com/David-CCrown
 * @description Provides Solana wallet connection context with support for multiple wallet adapters
 */

import React, { useMemo } from 'react';
import {
  ConnectionProvider,
  WalletProvider,
} from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { clusterApiUrl } from '@solana/web3.js';
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  TorusWalletAdapter,
  LedgerWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import { PROGRAM_CONFIG } from '../config/program';

/** Props for the WalletContextProvider component */
interface WalletContextProviderProps {
  children: React.ReactNode;
}

/**
 * Provides Solana wallet connection and RPC connection context to child components
 * 
 * Configures supported wallet adapters and network connection based on PROGRAM_CONFIG.
 * Enables auto-connection to previously connected wallets on app load.
 */
export const WalletContextProvider: React.FC<WalletContextProviderProps> = ({
  children,
}) => {
  /** Convert program config network to wallet adapter network enum */
  const network = PROGRAM_CONFIG.NETWORK === 'devnet' 
    ? WalletAdapterNetwork.Devnet 
    : PROGRAM_CONFIG.NETWORK === 'testnet'
    ? WalletAdapterNetwork.Testnet
    : WalletAdapterNetwork.Mainnet;
  
  /** RPC endpoint URL for Solana connection - memoized to prevent reconnections */
  const endpoint = useMemo(() => PROGRAM_CONFIG.getRpcEndpoint(), []);
  
  /** 
   * Array of supported wallet adapters
   * Includes major Solana wallets: Phantom, Solflare, Torus, Ledger
   */
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
      new TorusWalletAdapter(),
      new LedgerWalletAdapter(),
    ],
    []
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        {children}
      </WalletProvider>
    </ConnectionProvider>
  );
};

/**
 * Re-export wallet hooks for convenient access throughout the app
 * - useWallet: Access wallet connection state and methods
 * - useConnection: Access Solana RPC connection
 */
export { useWallet, useConnection } from '@solana/wallet-adapter-react';
