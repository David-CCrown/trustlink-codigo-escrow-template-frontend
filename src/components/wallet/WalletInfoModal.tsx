import {
  Copy,
  ExternalLink,
  LogOut,
  WalletIcon,
  CheckCircle,
  X,
  Wallet,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { useWalletUtils } from '../../hooks/useWalletUtils';
import { Toast, useToast } from '../ui/Toast';

interface WalletInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WalletInfoModal = ({ isOpen, onClose }: WalletInfoModalProps) => {
  const [balance, setBalance] = useState<number>(0);
  const [copySuccess, setCopySuccess] = useState(false);
  const { toast, success, error, hideToast } = useToast();

  const {
    connected,
    address,
    truncatedAddress,
    copyAddress,
    getBalance,
    getExplorerUrl,
    disconnect,
  } = useWalletUtils();

  // Fetch balance when modal opens and wallet is connected
  useEffect(() => {
    if (isOpen && connected) {
      getBalance().then(setBalance);
    }
  }, [isOpen, connected, getBalance]);

  // Handle copy address
  const handleCopyAddress = async () => {
    const successCopy = await copyAddress();
    if (successCopy) {
      setCopySuccess(true);
      success('Wallet address copied to clipboard!');
      setTimeout(() => setCopySuccess(false), 2000);
    } else {
      error('Failed to copy address. Please try again.');
    }
  };

  // Handle disconnect
  const handleDisconnect = async () => {
    const result = await disconnect();
    if (result) {
      success('Wallet disconnected successfully');
      onClose();
    } else {
      error('Failed to disconnect wallet');
    }
  };

  // Handle click outside modal
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen || !connected) return null;

  return (
    <>
      {/* Modal Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={handleBackdropClick}
      >
        {/* Modal Content */}
        <div className="bg-card border border-border rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in-0 zoom-in-95 duration-200">
          {/* Modal Header */}
          <div className="flex items-center justify-between p-6 border-b border-border/50">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Wallet className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">Wallet Details</h2>
                <p className="text-sm text-muted-foreground">Connected wallet information</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-muted rounded-lg transition-colors group"
            >
              <X className="h-4 w-4 text-muted-foreground group-hover:text-foreground" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6 space-y-6">
            {/* Wallet Address Section */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <WalletIcon className="h-4 w-4 text-muted-foreground" />
                <label className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                  Wallet Address
                </label>
              </div>
              <div className="relative">
                <div className="bg-muted/30 border border-border/50 rounded-lg p-4">
                  <div className="font-mono text-sm break-all text-foreground">
                    {address}
                  </div>
                </div>
                <div className="text-xs text-muted-foreground mt-1 text-center">
                  {truncatedAddress}
                </div>
              </div>
            </div>

            {/* Balance Section */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                Balance
              </label>
              <div className="bg-gradient-to-r from-primary/5 to-success/5 border border-border/50 rounded-lg p-4">
                <div className="text-2xl font-bold text-success">
                  {balance.toFixed(4)} SOL
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  Available balance
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2">
              <button
                onClick={handleCopyAddress}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-muted/30 hover:bg-muted/50 border border-border/50 rounded-lg transition-colors group"
              >
                {copySuccess ? (
                  <CheckCircle className="h-4 w-4 text-success" />
                ) : (
                  <Copy className="h-4 w-4 text-muted-foreground group-hover:text-foreground" />
                )}
                <span className={`font-medium ${copySuccess ? 'text-success' : 'group-hover:text-foreground'}`}>
                  {copySuccess ? 'Address Copied!' : 'Copy Address'}
                </span>
              </button>

              <button
                onClick={() => window.open(getExplorerUrl(), '_blank')}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-muted/30 hover:bg-muted/50 border border-border/50 rounded-lg transition-colors group"
              >
                <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-foreground" />
                <span className="font-medium group-hover:text-foreground">
                  View on Explorer
                </span>
              </button>
            </div>

            {/* Disconnect Section */}
            <div className="pt-4 border-t border-border/50">
              <button
                onClick={handleDisconnect}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-destructive/10 hover:bg-destructive/20 border border-destructive/20 rounded-lg transition-colors group text-destructive"
              >
                <LogOut className="h-4 w-4" />
                <span className="font-medium">
                  Disconnect Wallet
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Notifications */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          isVisible={toast.isVisible}
          onClose={hideToast}
        />
      )}
    </>
  );
};
