import React from 'react';
import { createPortal } from 'react-dom';
import { X, Copy, ExternalLink, LogOut, CheckCircle, Wallet as WalletIcon } from 'lucide-react';
import Button from '../ui/Button';

interface WalletInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  address: string;
  balance: number;
  copySuccess: boolean;
  onCopyAddress: () => void;
  onViewExplorer: () => void;
  onDisconnect: () => void;
}

const WalletInfoModal: React.FC<WalletInfoModalProps> = ({
  isOpen,
  onClose,
  address,
  balance,
  copySuccess,
  onCopyAddress,
  onViewExplorer,
  onDisconnect,
}) => {
  const truncatedAddress = address ? `${address.slice(0, 6)}...${address.slice(-4)}` : '';

  if (!isOpen) return null;

  const modalContent = (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-background border border-border rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary/10 to-solana/10 px-6 py-5 border-b border-border/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-primary/20 rounded-xl">
                <WalletIcon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground">Wallet Details</h2>
                <p className="text-sm text-muted-foreground">Connected wallet information</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="rounded-full hover:bg-gray-200 h-8 w-8 flex items-center justify-center focus:outline-none bg-white/80 border border-gray-300 shadow-sm transition-all duration-200"
              title="Close"
            >
              <X className="h-4 w-4 text-gray-600 hover:text-gray-800" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Balance Card - Featured */}
          <div className="mb-6">
            <div className="bg-gradient-to-br from-solana/10 via-primary/5 to-success/10 border border-solana/20 rounded-xl p-6 text-center">
              <div className="mb-2">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Available Balance</span>
              </div>
              <div className="flex items-center justify-center gap-2 mb-1">
                <span className="text-4xl font-bold bg-gradient-to-r from-solana to-primary bg-clip-text text-transparent">
                  {balance.toFixed(4)}
                </span>
                <span className="text-xl font-semibold text-solana">
                  SOL
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                ≈ ${(balance * 100).toFixed(2)} USD
              </p>
            </div>
          </div>

          {/* Address Section */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-semibold text-foreground">
                Wallet Address
              </label>
              <span className="text-xs text-muted-foreground font-mono bg-muted/50 px-2 py-1 rounded">
                {truncatedAddress}
              </span>
            </div>
            <div className="relative">
              <div className="bg-muted/30 border border-border/50 rounded-xl p-4 pr-12 font-mono text-xs text-foreground break-all leading-relaxed">
                {address}
              </div>
              <button
                onClick={onCopyAddress}
                className="absolute top-2 right-2 h-8 w-8 rounded-lg bg-background/80 hover:bg-primary/10 border border-border/50 hover:border-primary/30 transition-all duration-200 flex items-center justify-center group"
                title="Copy address"
              >
                {copySuccess ? (
                  <CheckCircle className="h-4 w-4 text-success" />
                ) : (
                  <Copy className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
                )}
              </button>
            </div>
            {copySuccess && (
              <p className="text-xs text-success mt-2 animate-in slide-in-from-top-1 flex items-center gap-1">
                <CheckCircle className="h-3 w-3" />
                Address copied to clipboard
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            {/* Copy Address Button */}
            <button
              onClick={onCopyAddress}
              className="w-full flex items-center justify-center gap-3 h-12 bg-primary/5 hover:bg-primary/10 border border-primary/20 hover:border-primary/40 rounded-xl transition-all duration-200 group"
            >
              {copySuccess ? (
                <>
                  <CheckCircle className="h-5 w-5 text-success" />
                  <span className="font-medium text-success">Address Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-5 w-5 text-primary group-hover:text-primary" />
                  <span className="font-medium text-primary group-hover:text-primary">Copy Address</span>
                </>
              )}
            </button>

            {/* View Explorer Button */}
            <button
              onClick={onViewExplorer}
              className="w-full flex items-center justify-center gap-3 h-12 bg-muted/20 hover:bg-muted/40 border border-border/50 hover:border-border rounded-xl transition-all duration-200 group"
            >
              <ExternalLink className="h-5 w-5 text-muted-foreground group-hover:text-foreground" />
              <span className="font-medium text-muted-foreground group-hover:text-foreground">View on Explorer</span>
            </button>
            
            {/* Disconnect Button */}
            <button
              onClick={onDisconnect}
              className="w-full flex items-center justify-center gap-3 h-12 bg-red-50 hover:bg-red-100 border border-red-200 hover:border-red-300 rounded-xl transition-all duration-200 group text-red-600 hover:text-red-700"
            >
              <LogOut className="h-5 w-5" />
              <span className="font-medium">Disconnect Wallet</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Use portal to render in document.body
  if (typeof window === 'undefined') {
    return null; // Don't render during SSR
  }
  
  return createPortal(modalContent, document.body);
};

export default WalletInfoModal;
