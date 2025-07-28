/**
 * Escrow Program Hook for Codigo Escrow Template
 * 
 * @author David James
 * @email ccrowndavid@gmail.com
 * @github https://www.github.com/David-CCrown
 * @description React hook for interacting with the Solana escrow program - create, take, cancel, and update escrows
 */

import { useCallback, useMemo, useState, useEffect } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { BN, web3 } from '@coral-xyz/anchor';
import { 
  PublicKey, 
  Transaction, 
  SystemProgram, 
  SYSVAR_RENT_PUBKEY,
  sendAndConfirmTransaction
} from '@solana/web3.js';
import { 
  TOKEN_PROGRAM_ID, 
  ASSOCIATED_TOKEN_PROGRAM_ID,
  getAssociatedTokenAddress,
  createAssociatedTokenAccountInstruction,
  getAccount
} from '@solana/spl-token';

import {
  getEscrowProgram,
  deriveEscrowAddress,
  deriveVaultAddress,
  KNOWN_TOKENS,
  getTokenInfo,
  formatTokenAmount,
  parseTokenAmount,
  isEscrowExpired,
  getTimeRemaining,
  calculateExchangeRate,
  type EscrowAccount
} from '../lib/program';

export interface EscrowData {
  address: PublicKey;
  account: EscrowAccount;
  vault: PublicKey;
  id: string;
  status: 'Active' | 'Expired' | 'Cancelled';
  makerToken: {
    mint: PublicKey;
    amount: string;
    symbol: string;
    decimals: number;
  };
  takerToken: {
    mint: PublicKey;
    amount: string;
    symbol: string;
    decimals: number;
  };
  exchangeRate: number;
  timeRemaining: {
    expired: boolean;
    formatted: string;
    totalSeconds: number;
  };
  isMaker: boolean;
  canUpdate: boolean;
  canCancel: boolean;
  canTake: boolean;
}

export interface CreateEscrowParams {
  makerTokenMint: PublicKey;
  makerTokenAmount: string;
  takerTokenMint: PublicKey;
  takerTokenAmount: string;
  durationHours: number;
  isMutable: boolean;
}

export interface UpdateEscrowParams {
  escrowAddress: PublicKey;
  takerTokenMint?: PublicKey;
  takerTokenAmount?: string;
  durationHours?: number;
}

export interface TransactionState {
  status: 'idle' | 'preparing' | 'signing' | 'sending' | 'confirming' | 'success' | 'error';
  message: string;
  signature?: string;
  error?: string;
}

export function useEscrowProgram() {
  const { connection } = useConnection();
  const wallet = useWallet();
  const [transactionState, setTransactionState] = useState<TransactionState>({
    status: 'idle',
    message: ''
  });

  const program = useMemo(() => {
    if (!wallet.publicKey || !wallet.signTransaction) return null;
    return getEscrowProgram(connection, wallet);
  }, [connection, wallet]);

  // Reset transaction state
  const resetTransactionState = useCallback(() => {
    setTransactionState({ status: 'idle', message: '' });
  }, []);

  // Handle transaction errors
  const handleTransactionError = useCallback((error: any) => {
    console.error('Transaction error:', error);
    let errorMessage = 'Transaction failed';
    
    if (error.message) {
      if (error.message.includes('User rejected')) {
        errorMessage = 'Transaction was cancelled';
      } else if (error.message.includes('Insufficient funds')) {
        errorMessage = 'Insufficient funds for transaction';
      } else if (error.message.includes('expired')) {
        errorMessage = 'Escrow has expired';
      } else if (error.message.includes('already taken')) {
        errorMessage = 'Escrow has already been taken';
      } else {
        errorMessage = error.message;
      }
    }
    
    setTransactionState({
      status: 'error',
      message: errorMessage,
      error: errorMessage
    });
  }, []);

  // Create escrow
  const createEscrow = useCallback(async (params: CreateEscrowParams): Promise<string | null> => {
    if (!program || !wallet.publicKey || !wallet.signTransaction) {
      throw new Error('Wallet not connected');
    }

    try {
      setTransactionState({ status: 'preparing', message: 'Preparing escrow creation...' });

      const seed = new BN(Date.now()); // Use timestamp as seed
      const [escrowAddress, escrowBump] = deriveEscrowAddress(wallet.publicKey, seed);
      const [vaultAddress, vaultBump] = deriveVaultAddress(escrowAddress);

      // Get maker's token account
      const makerTokenAccount = await getAssociatedTokenAddress(
        params.makerTokenMint,
        wallet.publicKey
      );

      // Convert amounts to program format
      const makerTokenInfo = getTokenInfo(params.makerTokenMint);
      const takerTokenInfo = getTokenInfo(params.takerTokenMint);
      
      if (!makerTokenInfo || !takerTokenInfo) {
        throw new Error('Token information not found');
      }

      const makerTokenAmount = parseTokenAmount(params.makerTokenAmount, makerTokenInfo.decimals);
      const takerTokenAmount = parseTokenAmount(params.takerTokenAmount, takerTokenInfo.decimals);
      
      // Calculate expiry timestamp
      const expiry = new BN(Math.floor(Date.now() / 1000) + (params.durationHours * 3600));

      setTransactionState({ status: 'signing', message: 'Awaiting wallet approval...' });

      // Create the instruction
      const instruction = await program.methods
        .make(
          seed,
          makerTokenAmount,
          params.takerTokenMint,
          takerTokenAmount,
          expiry,
          params.isMutable
        )
        .accounts({
          maker: wallet.publicKey,
          escrow: escrowAddress,
          vault: vaultAddress,
          makerTokenMint: params.makerTokenMint,
          makerTokenAccount,
          tokenProgram: TOKEN_PROGRAM_ID,
          associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
          systemProgram: SystemProgram.programId,
          rent: SYSVAR_RENT_PUBKEY,
        })
        .instruction();

      const transaction = new Transaction().add(instruction);
      const { blockhash } = await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = wallet.publicKey;

      const signedTransaction = await wallet.signTransaction(transaction);

      setTransactionState({ status: 'sending', message: 'Sending transaction to network...' });

      const signature = await connection.sendRawTransaction(signedTransaction.serialize());

      setTransactionState({ 
        status: 'confirming', 
        message: 'Confirming transaction...',
        signature 
      });

      await connection.confirmTransaction(signature, 'confirmed');

      setTransactionState({ 
        status: 'success', 
        message: 'Escrow created successfully!',
        signature 
      });

      return signature;
    } catch (error) {
      handleTransactionError(error);
      return null;
    }
  }, [program, wallet, connection, handleTransactionError]);

  // Take escrow
  const takeEscrow = useCallback(async (escrowAddress: PublicKey): Promise<string | null> => {
    if (!program || !wallet.publicKey || !wallet.signTransaction) {
      throw new Error('Wallet not connected');
    }

    try {
      setTransactionState({ status: 'preparing', message: 'Preparing to accept escrow...' });

      // Get escrow account data
      const escrowAccount = await program.account.escrow.fetch(escrowAddress);
      const [vaultAddress] = deriveVaultAddress(escrowAddress);

      // Get token accounts
      const makerReceiveTokenAccount = await getAssociatedTokenAddress(
        escrowAccount.takerTokenMint,
        escrowAccount.maker
      );
      
      const takerReceiveTokenAccount = await getAssociatedTokenAddress(
        escrowAccount.makerTokenMint,
        wallet.publicKey
      );
      
      const takerSendTokenAccount = await getAssociatedTokenAddress(
        escrowAccount.takerTokenMint,
        wallet.publicKey
      );

      // Check if taker needs ATA for receiving tokens
      const transaction = new Transaction();
      
      try {
        await getAccount(connection, takerReceiveTokenAccount);
      } catch (error) {
        // Account doesn't exist, create it
        const createATAInstruction = createAssociatedTokenAccountInstruction(
          wallet.publicKey,
          takerReceiveTokenAccount,
          wallet.publicKey,
          escrowAccount.makerTokenMint
        );
        transaction.add(createATAInstruction);
      }

      setTransactionState({ status: 'signing', message: 'Awaiting wallet approval...' });

      // Create the take instruction
      const instruction = await program.methods
        .take()
        .accounts({
          taker: wallet.publicKey,
          maker: escrowAccount.maker,
          escrow: escrowAddress,
          vault: vaultAddress,
          makerTokenMint: escrowAccount.makerTokenMint,
          takerTokenMint: escrowAccount.takerTokenMint,
          makerReceiveTokenAccount,
          takerReceiveTokenAccount,
          takerSendTokenAccount,
          tokenProgram: TOKEN_PROGRAM_ID,
          associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
          systemProgram: SystemProgram.programId,
        })
        .instruction();

      transaction.add(instruction);

      const { blockhash } = await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = wallet.publicKey;

      const signedTransaction = await wallet.signTransaction(transaction);

      setTransactionState({ status: 'sending', message: 'Executing trade...' });

      const signature = await connection.sendRawTransaction(signedTransaction.serialize());

      setTransactionState({ 
        status: 'confirming', 
        message: 'Confirming trade...',
        signature 
      });

      await connection.confirmTransaction(signature, 'confirmed');

      setTransactionState({ 
        status: 'success', 
        message: 'Trade completed successfully!',
        signature 
      });

      return signature;
    } catch (error) {
      handleTransactionError(error);
      return null;
    }
  }, [program, wallet, connection, handleTransactionError]);

  // Cancel escrow
  const cancelEscrow = useCallback(async (escrowAddress: PublicKey): Promise<string | null> => {
    if (!program || !wallet.publicKey || !wallet.signTransaction) {
      throw new Error('Wallet not connected');
    }

    try {
      setTransactionState({ status: 'preparing', message: 'Preparing to cancel escrow...' });

      // Get escrow account data
      const escrowAccount = await program.account.escrow.fetch(escrowAddress);
      const [vaultAddress] = deriveVaultAddress(escrowAddress);

      // Get maker's token account
      const makerTokenAccount = await getAssociatedTokenAddress(
        escrowAccount.makerTokenMint,
        wallet.publicKey
      );

      setTransactionState({ status: 'signing', message: 'Awaiting wallet approval...' });

      // Create the cancel instruction
      const instruction = await program.methods
        .cancel()
        .accounts({
          maker: wallet.publicKey,
          escrow: escrowAddress,
          vault: vaultAddress,
          makerTokenAccount,
          tokenProgram: TOKEN_PROGRAM_ID,
        })
        .instruction();

      const transaction = new Transaction().add(instruction);
      const { blockhash } = await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = wallet.publicKey;

      const signedTransaction = await wallet.signTransaction(transaction);

      setTransactionState({ status: 'sending', message: 'Cancelling escrow...' });

      const signature = await connection.sendRawTransaction(signedTransaction.serialize());

      setTransactionState({ 
        status: 'confirming', 
        message: 'Confirming cancellation...',
        signature 
      });

      await connection.confirmTransaction(signature, 'confirmed');

      setTransactionState({ 
        status: 'success', 
        message: 'Escrow cancelled successfully!',
        signature 
      });

      return signature;
    } catch (error) {
      handleTransactionError(error);
      return null;
    }
  }, [program, wallet, connection, handleTransactionError]);

  // Update escrow
  const updateEscrow = useCallback(async (params: UpdateEscrowParams): Promise<string | null> => {
    if (!program || !wallet.publicKey || !wallet.signTransaction) {
      throw new Error('Wallet not connected');
    }

    try {
      setTransactionState({ status: 'preparing', message: 'Preparing to update escrow...' });

      // Prepare update parameters
      const takerTokenAmount = params.takerTokenAmount ? 
        parseTokenAmount(params.takerTokenAmount, 6) : // Assuming USDC decimals, should be dynamic
        null;
      
      const expiry = params.durationHours ?
        new BN(Math.floor(Date.now() / 1000) + (params.durationHours * 3600)) :
        null;

      setTransactionState({ status: 'signing', message: 'Awaiting wallet approval...' });

      // Create the update instruction
      const instruction = await program.methods
        .update(
          params.takerTokenMint || null,
          takerTokenAmount,
          expiry
        )
        .accounts({
          maker: wallet.publicKey,
          escrow: params.escrowAddress,
        })
        .instruction();

      const transaction = new Transaction().add(instruction);
      const { blockhash } = await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = wallet.publicKey;

      const signedTransaction = await wallet.signTransaction(transaction);

      setTransactionState({ status: 'sending', message: 'Updating escrow...' });

      const signature = await connection.sendRawTransaction(signedTransaction.serialize());

      setTransactionState({ 
        status: 'confirming', 
        message: 'Confirming update...',
        signature 
      });

      await connection.confirmTransaction(signature, 'confirmed');

      setTransactionState({ 
        status: 'success', 
        message: 'Escrow updated successfully!',
        signature 
      });

      return signature;
    } catch (error) {
      handleTransactionError(error);
      return null;
    }
  }, [program, wallet, connection, handleTransactionError]);

  // Fetch user's escrows
  const fetchUserEscrows = useCallback(async (): Promise<EscrowData[]> => {
    if (!program || !wallet.publicKey) return [];

    try {
      // Get all escrow accounts where user is the maker
      const escrows = await program.account.escrow.all([
        {
          memcmp: {
            offset: 8, // Skip discriminator
            bytes: wallet.publicKey.toBase58(),
          },
        },
      ]);

      const escrowData: EscrowData[] = [];

      for (const escrow of escrows) {
        const account = escrow.account as EscrowAccount;
        const [vaultAddress] = deriveVaultAddress(escrow.publicKey);
        
        const makerTokenInfo = getTokenInfo(account.makerTokenMint);
        const takerTokenInfo = getTokenInfo(account.takerTokenMint);
        
        if (!makerTokenInfo || !takerTokenInfo) continue;

        const timeRemaining = getTimeRemaining(account.expiry);
        const isMaker = account.maker.equals(wallet.publicKey);
        
        let status: 'Active' | 'Expired' | 'Cancelled' = 'Active';
        if (timeRemaining.expired) status = 'Expired';

        const escrowData_item: EscrowData = {
          address: escrow.publicKey,
          account,
          vault: vaultAddress,
          id: escrow.publicKey.toBase58().slice(0, 8),
          status,
          makerToken: {
            mint: account.makerTokenMint,
            amount: formatTokenAmount(account.makerTokenAmount, makerTokenInfo.decimals),
            symbol: makerTokenInfo.symbol,
            decimals: makerTokenInfo.decimals,
          },
          takerToken: {
            mint: account.takerTokenMint,
            amount: formatTokenAmount(account.takerTokenAmount, takerTokenInfo.decimals),
            symbol: takerTokenInfo.symbol,
            decimals: takerTokenInfo.decimals,
          },
          exchangeRate: calculateExchangeRate(
            account.makerTokenAmount,
            makerTokenInfo.decimals,
            account.takerTokenAmount,
            takerTokenInfo.decimals
          ),
          timeRemaining,
          isMaker,
          canUpdate: isMaker && account.isMutable && !timeRemaining.expired,
          canCancel: isMaker && !timeRemaining.expired,
          canTake: !isMaker && !timeRemaining.expired,
        };

        escrowData.push(escrowData_item);
      }

      return escrowData;
    } catch (error) {
      console.error('Failed to fetch escrows:', error);
      return [];
    }
  }, [program, wallet.publicKey]);

  // Get available tokens
  const getAvailableTokens = useCallback(() => {
    return Object.values(KNOWN_TOKENS);
  }, []);

  return {
    // Actions
    createEscrow,
    takeEscrow,
    cancelEscrow,
    updateEscrow,
    fetchUserEscrows,
    
    // Utilities
    getAvailableTokens,
    resetTransactionState,
    
    // State
    transactionState,
    isConnected: !!wallet.publicKey,
    program,
  };
}
