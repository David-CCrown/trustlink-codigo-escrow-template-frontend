/**
 * Global Type Declarations for Codigo Escrow Template
 * 
 * @author David James
 * @email ccrowndavid@gmail.com
 * @github https://www.github.com/David-CCrown
 * @description TypeScript global declarations for Node.js polyfills and Solana wallet types
 */

// Global type declarations for Node.js polyfills
import { Buffer } from 'buffer';
import { EventEmitter } from 'events';

declare global {
  var Buffer: typeof Buffer;
  var process: NodeJS.Process;
  var EventEmitter: typeof EventEmitter;
  
  namespace globalThis {
    var Buffer: typeof Buffer;
    var process: NodeJS.Process;
    var EventEmitter: typeof EventEmitter;
  }
  
  interface Window {
    solana?: {
      isPhantom?: boolean;
      isConnected: boolean;
      publicKey?: { toString(): string };
      connect(): Promise<{ publicKey: { toString(): string } }>;
      disconnect(): Promise<void>;
      signTransaction(transaction: any): Promise<any>;
      signAllTransactions(transactions: any[]): Promise<any[]>;
      version?: string;
    };
  }
}

export {};
