/**
 * Solana Escrow Program Library for Codigo Escrow Template
 * 
 * @author David James
 * @email ccrowndavid@gmail.com
 * @github https://www.github.com/David-CCrown
 * @description Core library for interacting with the Solana escrow program including IDL, types, and utility functions
 */

import { Program, AnchorProvider, BN, web3, type Idl } from '@coral-xyz/anchor';
import { PublicKey, Connection } from '@solana/web3.js';
import {
  getAssociatedTokenAddress,
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
} from '@solana/spl-token';
import { ESCROW_PROGRAM_ID, getTokenAddresses } from '../config/program';

/**
 * Anchor IDL (Interface Definition Language) for the escrow program
 * 
 * Defines the program's instruction schemas, account structures, and types.
 * This should match the deployed program's interface exactly.
 */
export const ESCROW_IDL = {
  version: '0.1.0',
  name: 'escrow',
  instructions: [
    {
      /** Create a new escrow - deposits maker tokens into vault */
      name: 'make',
      accounts: [
        { name: 'maker', isMut: true, isSigner: true },
        { name: 'escrow', isMut: true, isSigner: false },
        { name: 'vault', isMut: true, isSigner: false },
        { name: 'makerTokenMint', isMut: false, isSigner: false },
        { name: 'makerTokenAccount', isMut: true, isSigner: false },
        { name: 'tokenProgram', isMut: false, isSigner: false },
        { name: 'associatedTokenProgram', isMut: false, isSigner: false },
        { name: 'systemProgram', isMut: false, isSigner: false },
        { name: 'rent', isMut: false, isSigner: false },
      ],
      args: [
        { name: 'seed', type: 'u64' },
        { name: 'makerTokenAmount', type: 'u64' },
        { name: 'takerTokenMint', type: 'publicKey' },
        { name: 'takerTokenAmount', type: 'u64' },
        { name: 'expiry', type: 'i64' },
        { name: 'isMutable', type: 'bool' },
      ],
    },
    {
      /** Execute the escrow trade - swaps tokens between maker and taker */
      name: 'take',
      accounts: [
        { name: 'taker', isMut: true, isSigner: true },
        { name: 'maker', isMut: false, isSigner: false },
        { name: 'escrow', isMut: true, isSigner: false },
        { name: 'vault', isMut: true, isSigner: false },
        { name: 'makerTokenMint', isMut: false, isSigner: false },
        { name: 'takerTokenMint', isMut: false, isSigner: false },
        { name: 'makerReceiveTokenAccount', isMut: true, isSigner: false },
        { name: 'takerReceiveTokenAccount', isMut: true, isSigner: false },
        { name: 'takerSendTokenAccount', isMut: true, isSigner: false },
        { name: 'tokenProgram', isMut: false, isSigner: false },
        { name: 'associatedTokenProgram', isMut: false, isSigner: false },
        { name: 'systemProgram', isMut: false, isSigner: false },
      ],
      args: [],
    },
    {
      /** Cancel escrow and return deposited tokens to maker */
      name: 'cancel',
      accounts: [
        { name: 'maker', isMut: true, isSigner: true },
        { name: 'escrow', isMut: true, isSigner: false },
        { name: 'vault', isMut: true, isSigner: false },
        { name: 'makerTokenAccount', isMut: true, isSigner: false },
        { name: 'tokenProgram', isMut: false, isSigner: false },
      ],
      args: [],
    },
    {
      /** Update escrow parameters (only if mutable) */
      name: 'update',
      accounts: [
        { name: 'maker', isMut: true, isSigner: true },
        { name: 'escrow', isMut: true, isSigner: false },
      ],
      args: [
        { name: 'takerTokenMint', type: { option: 'publicKey' } },
        { name: 'takerTokenAmount', type: { option: 'u64' } },
        { name: 'expiry', type: { option: 'i64' } },
      ],
    },
  ],
  accounts: [
    {
      name: 'Escrow',
      type: {
        kind: 'struct',
        fields: [
          { name: 'maker', type: 'publicKey' },
          { name: 'seed', type: 'u64' },
          { name: 'makerTokenMint', type: 'publicKey' },
          { name: 'takerTokenMint', type: 'publicKey' },
          { name: 'makerTokenAmount', type: 'u64' },
          { name: 'takerTokenAmount', type: 'u64' },
          { name: 'expiry', type: 'i64' },
          { name: 'isMutable', type: 'bool' },
          { name: 'bump', type: 'u8' },
          { name: 'vaultBump', type: 'u8' },
        ],
      },
    },
  ],
};

/**
 * TypeScript interface for escrow account data structure
 * 
 * Represents the on-chain escrow account state with properly typed fields.
 * Amounts are BN (BigNumber) to handle large token values safely.
 */
export interface EscrowAccount {
  /** Public key of the escrow creator */
  maker: PublicKey;
  /** Unique seed used for PDA derivation */
  seed: BN;
  /** SPL token mint that maker is offering */
  makerTokenMint: PublicKey;
  /** SPL token mint that maker wants in exchange */
  takerTokenMint: PublicKey;
  /** Amount of maker tokens deposited (in token's base units) */
  makerTokenAmount: BN;
  /** Amount of taker tokens required for trade */
  takerTokenAmount: BN;
  /** Unix timestamp when escrow expires */
  expiry: BN;
  /** Whether escrow parameters can be updated after creation */
  isMutable: boolean;
  /** PDA bump seed for escrow account */
  bump: number;
  /** PDA bump seed for vault account */
  vaultBump: number;
}

/**
 * Derive the Program Derived Address (PDA) for an escrow account
 * 
 * Uses the maker's public key and a unique seed to generate a deterministic
 * address that the program can control.
 * 
 * @param maker - Public key of the escrow creator
 * @param seed - Unique identifier for this escrow (typically timestamp)
 * @param programId - Escrow program ID (defaults to configured program)
 * @returns Tuple of [address, bump_seed]
 */
export function deriveEscrowAddress(
  maker: PublicKey,
  seed: BN,
  programId: PublicKey = ESCROW_PROGRAM_ID
): [PublicKey, number] {
  return PublicKey.findProgramAddressSync(
    [
      Buffer.from('escrow'),
      maker.toBuffer(),
      seed.toArrayLike(Buffer, 'le', 8),
    ],
    programId
  );
}

/**
 * Derive the PDA for the token vault account
 * 
 * The vault holds the maker's deposited tokens until the escrow is
 * completed or cancelled.
 * 
 * @param escrow - Public key of the escrow account
 * @param programId - Escrow program ID (defaults to configured program)
 * @returns Tuple of [address, bump_seed]
 */
export function deriveVaultAddress(
  escrow: PublicKey,
  programId: PublicKey = ESCROW_PROGRAM_ID
): [PublicKey, number] {
  return PublicKey.findProgramAddressSync(
    [Buffer.from('vault'), escrow.toBuffer()],
    programId
  );
}

/**
 * Interface for token metadata and configuration
 */
export interface TokenInfo {
  /** SPL token mint address */
  mint: PublicKey;
  /** Token symbol (e.g., 'USDC', 'SOL') */
  symbol: string;
  /** Full token name */
  name: string;
  /** Number of decimal places for token amounts */
  decimals: number;
  /** Optional token logo URI */
  logoURI?: string;
}

/**
 * Get token information for all supported tokens on current network
 * 
 * @returns Object mapping token symbols to their metadata
 */
export function getKnownTokens(): Record<string, TokenInfo> {
  const tokenAddresses = getTokenAddresses();

  return {
    USDC: {
      mint: tokenAddresses.USDC,
      symbol: 'USDC',
      name: 'USD Coin',
      decimals: 6,
    },
    SOL: {
      mint: tokenAddresses.SOL,
      symbol: 'SOL',
      name: 'Wrapped Solana',
      decimals: 9,
    },
    BONK: {
      mint: tokenAddresses.BONK,
      symbol: 'BONK',
      name: 'Bonk',
      decimals: 5,
    },
  };
}

/** Pre-computed known tokens for the current network */
export const KNOWN_TOKENS = getKnownTokens();

/**
 * Look up token information by mint address
 * 
 * First checks known tokens, then returns generic info for unknown tokens.
 * 
 * @param mint - SPL token mint public key
 * @returns Token information or null if completely invalid
 */
export function getTokenInfo(mint: PublicKey): TokenInfo | null {
  const mintStr = mint.toBase58();

  // Search through known tokens for exact match
  for (const token of Object.values(KNOWN_TOKENS)) {
    if (token.mint.equals(mint)) {
      return token;
    }
  }

  // Fallback for unknown tokens with abbreviated symbol
  return {
    mint,
    symbol: `${mintStr.slice(0, 4)}...${mintStr.slice(-4)}`,
    name: 'Unknown Token',
    decimals: 9, // Safe default for most SPL tokens
  };
}

// Get program instance
export function getEscrowProgram(
  connection: Connection,
  wallet: any,
  commitment?: 'processed' | 'confirmed' | 'finalized'
): Program<any> | null {
  // Check if we have a valid program ID (not placeholder)
  if (ESCROW_PROGRAM_ID.toBase58() === '11111111111111111111111111111111') {
    console.warn('Escrow program not deployed yet. Using placeholder program ID.');
    return null;
  }

  try {
    const provider = new AnchorProvider(connection, wallet, {
      commitment: commitment || 'confirmed',
    });

    return new Program(ESCROW_IDL as unknown as Idl, ESCROW_PROGRAM_ID, provider);
  } catch (error) {
    console.error('Failed to initialize escrow program:', error);
    return null;
  }
}

// Helper to get associated token address
export async function getOrCreateAssociatedTokenAccount(
  connection: Connection,
  payer: PublicKey,
  mint: PublicKey,
  owner: PublicKey
): Promise<PublicKey> {
  return await getAssociatedTokenAddress(mint, owner);
}

// Format token amount with proper decimals
export function formatTokenAmount(
  amount: BN | number,
  decimals: number
): string {
  const amountNum = typeof amount === 'number' ? amount : amount.toNumber();
  const divisor = Math.pow(10, decimals);
  return (amountNum / divisor).toFixed(decimals <= 6 ? decimals : 6);
}

// Parse token amount to program format
export function parseTokenAmount(
  amount: string | number,
  decimals: number
): BN {
  const amountNum = typeof amount === 'string' ? parseFloat(amount) : amount;
  const multiplier = Math.pow(10, decimals);
  return new BN(Math.floor(amountNum * multiplier));
}

// Calculate exchange rate
export function calculateExchangeRate(
  fromAmount: BN,
  fromDecimals: number,
  toAmount: BN,
  toDecimals: number
): number {
  const fromFormatted = parseFloat(formatTokenAmount(fromAmount, fromDecimals));
  const toFormatted = parseFloat(formatTokenAmount(toAmount, toDecimals));

  if (fromFormatted === 0) return 0;
  return toFormatted / fromFormatted;
}

// Check if escrow has expired
export function isEscrowExpired(expiry: BN): boolean {
  const now = Math.floor(Date.now() / 1000);
  return expiry.toNumber() <= now;
}

// Get time remaining until expiry
export function getTimeRemaining(expiry: BN): {
  expired: boolean;
  totalSeconds: number;
  hours: number;
  minutes: number;
  formatted: string;
} {
  const now = Math.floor(Date.now() / 1000);
  const expiryTime = expiry.toNumber();
  const totalSeconds = Math.max(0, expiryTime - now);

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);

  let formatted = '';
  if (totalSeconds <= 0) {
    formatted = 'Expired';
  } else if (hours > 0) {
    formatted = `${hours}h ${minutes}m remaining`;
  } else {
    formatted = `${minutes}m remaining`;
  }

  return {
    expired: totalSeconds <= 0,
    totalSeconds,
    hours,
    minutes,
    formatted,
  };
}

// Explicit exports for better module resolution
export type { EscrowAccount, TokenInfo };
