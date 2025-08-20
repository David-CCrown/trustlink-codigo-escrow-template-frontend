/**
 * Solana Program Configuration for Codigo Escrow Template
 *
 * @author David James
 * @email ccrowndavid@gmail.com
 * @github https://www.github.com/David-CCrown
 * @description Configuration for Solana program IDs, RPC endpoints, and token addresses across networks
 */

import { PublicKey } from '@solana/web3.js';

/**
 * Network environment type definition
 */
type SolanaNetwork = 'devnet' | 'testnet' | 'mainnet-beta';

/**
 * Centralized configuration for Solana program deployment across networks
 *
 * Contains program IDs, RPC endpoints, and network-specific settings.
 * Update PROGRAM_IDS with actual deployed program addresses.
 */
export const PROGRAM_CONFIG = {
  /** Current network environment - change this to switch networks */
  NETWORK: 'devnet' as SolanaNetwork,

  /**
   * Program IDs for each network environment
   * TODO: Replace placeholder addresses with actual deployed program IDs
   */
  PROGRAM_IDS: {
    devnet: new PublicKey('11111111111111111111111111111112'),
    testnet: new PublicKey('11111111111111111111111111111111'),
    'mainnet-beta': new PublicKey('11111111111111111111111111111111'),
  },

  /**
   * Get the program ID for the currently configured network
   * @returns PublicKey of the escrow program for current network
   */
  getProgramId(): PublicKey {
    return this.PROGRAM_IDS[this.NETWORK];
  },

  /** RPC endpoint URLs for each Solana network */
  RPC_ENDPOINTS: {
    devnet: 'https://api.devnet.solana.com',
    testnet: 'https://api.testnet.solana.com',
    'mainnet-beta': 'https://api.mainnet-beta.solana.com',
  },

  /**
   * Get the RPC endpoint URL for the currently configured network
   * @returns RPC endpoint URL string
   */
  getRpcEndpoint(): string {
    return this.RPC_ENDPOINTS[this.NETWORK];
  },
};

/**
 * Token mint addresses organized by network
 * Contains commonly used SPL tokens for escrow trading
 */
export const TOKEN_ADDRESSES = {
  devnet: {
    /** USDC dev token mint */
    USDC: new PublicKey('4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU'),
    /** Wrapped SOL (same address across all networks) */
    SOL: new PublicKey('So11111111111111111111111111111111111111112'),
    /** BONK dev token mint */
    BONK: new PublicKey('DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263'),
  },
  testnet: {
    // TODO: Update with actual testnet token addresses when available
    USDC: new PublicKey('4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU'),
    SOL: new PublicKey('So11111111111111111111111111111111111111112'),
    BONK: new PublicKey('DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263'),
  },
  'mainnet-beta': {
    /** Production USDC mint address */
    USDC: new PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'),
    /** Wrapped SOL */
    SOL: new PublicKey('So11111111111111111111111111111111111111112'),
    /** Production BONK mint address */
    BONK: new PublicKey('DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263'),
  },
};

/**
 * Get token addresses for the currently configured network
 * @returns Object containing token mint PublicKeys for current network
 */
export function getTokenAddresses() {
  return TOKEN_ADDRESSES[PROGRAM_CONFIG.NETWORK];
}

/**
 * Update the active network configuration
 * Useful for testing or runtime network switching
 * @param network - Target Solana network
 */
export function setNetwork(network: SolanaNetwork) {
  PROGRAM_CONFIG.NETWORK = network;
}

/**
 * Current escrow program ID based on active network
 * Exported for convenient access throughout the application
 */
export const ESCROW_PROGRAM_ID = PROGRAM_CONFIG.getProgramId();
