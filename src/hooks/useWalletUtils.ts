/**
 * Wallet Utilities Hook for Codigo Escrow Template
 * 
 * @author David James
 * @email ccrowndavid@gmail.com
 * @github https://www.github.com/David-CCrown
 * @description React hook providing wallet utility functions for address formatting, balance checking, and validation
 */

import { useCallback, useMemo, useEffect } from 'react';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';

export const useWalletUtils = () => {
  const { publicKey, connected, disconnect, connecting } = useWallet();
  const { connection } = useConnection();

  // Wallet state effect for cleanup
  useEffect(() => {
    // Reserved for wallet state management
  }, [connected, connecting, publicKey, connection]);

  // Helper function to truncate wallet address
  const truncateAddress = useCallback((address: string, chars = 4) => {
    if (address.length <= chars * 2) return address;
    return `${address.slice(0, chars)}...${address.slice(-chars)}`;
  }, []);

  // Get truncated wallet address
  const truncatedAddress = useMemo(() => {
    if (!publicKey) return '';
    return truncateAddress(publicKey.toBase58());
  }, [publicKey, truncateAddress]);

  // Copy address to clipboard
  const copyAddress = useCallback(async () => {
    if (!publicKey) return false;
    
    try {
      await navigator.clipboard.writeText(publicKey.toBase58());
      return true;
    } catch (error) {
      console.error('Failed to copy address:', error);
      return false;
    }
  }, [publicKey]);

  // Get wallet balance
  const getBalance = useCallback(async () => {
    if (!publicKey || !connection) return 0;
    
    try {
      const balance = await connection.getBalance(publicKey);
      return balance / LAMPORTS_PER_SOL;
    } catch (error) {
      console.error('Failed to fetch balance:', error);
      return 0;
    }
  }, [publicKey, connection]);

  // Get Solana explorer URL
  const getExplorerUrl = useCallback((address?: string) => {
    const addr = address || publicKey?.toBase58();
    if (!addr) return '';
    
    // Use devnet for development, change to mainnet-beta for production
    return `https://explorer.solana.com/address/${addr}?cluster=devnet`;
  }, [publicKey]);

  // Disconnect wallet
  const handleDisconnect = useCallback(async () => {
    try {
      await disconnect();
      return true;
    } catch (error) {
      console.error('Failed to disconnect wallet:', error);
      return false;
    }
  }, [disconnect]);

  // Validate if string is valid Solana address
  const isValidSolanaAddress = useCallback((address: string): boolean => {
    try {
      new PublicKey(address);
      return true;
    } catch {
      return false;
    }
  }, []);

  return {
    // Wallet state
    publicKey,
    connected,
    connecting,
    
    // Address utilities
    address: publicKey?.toBase58() || '',
    truncatedAddress,
    truncateAddress,
    copyAddress,
    
    // Balance
    getBalance,
    
    // Explorer
    getExplorerUrl,
    
    // Actions
    disconnect: handleDisconnect,
    
    // Validators
    isValidSolanaAddress,
  };
};
