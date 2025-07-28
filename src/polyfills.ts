/**
 * Browser Polyfills for Codigo Escrow Template
 * 
 * @author David James
 * @email ccrowndavid@gmail.com
 * @github https://www.github.com/David-CCrown
 * @description Provides Node.js polyfills for browser environment (Buffer, process, etc.) required for Solana libraries
 */

// Polyfills for Node.js globals in browser environment
import { Buffer } from 'buffer';
import { EventEmitter } from 'events';
import process from 'process';

// Make Node.js globals available
if (typeof globalThis !== 'undefined') {
  globalThis.Buffer = Buffer;
  globalThis.process = process;
  globalThis.EventEmitter = EventEmitter;
} else if (typeof window !== 'undefined') {
  (window as any).Buffer = Buffer;
  (window as any).process = process;
  (window as any).EventEmitter = EventEmitter;
} else if (typeof global !== 'undefined') {
  (global as any).Buffer = Buffer;
  (global as any).process = process;
  (global as any).EventEmitter = EventEmitter;
}

// Ensure process.env exists
if (typeof process !== 'undefined' && !process.env) {
  process.env = {};
}

// Export for explicit imports
export { Buffer, process, EventEmitter };
