/**
 * Wallet Connection Modal for Codigo Escrow Template
 * 
 * @author David James
 * @email ccrowndavid@gmail.com
 * @github https://www.github.com/David-CCrown
 * @description Professional wallet selection modal with error handling, loading states, and installation guidance
 */

import React, { useCallback, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { useWallet } from '@solana/wallet-adapter-react';
import { useNavigate } from 'react-router';
import { X, ChevronRight, AlertCircle, Loader2, ExternalLink } from 'lucide-react';
import Button from '../ui/Button';

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WalletModal: React.FC<WalletModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { wallets, select, connect, connecting, connected } = useWallet();
  const [error, setError] = useState<string | null>(null);
  const [connectingWallet, setConnectingWallet] = useState<string | null>(null);
  const navigate = useNavigate();

  const [listedWallets, collapsedWallets] = useMemo(() => {
    const installed = wallets.filter(
      wallet => wallet.readyState === 'Installed'
    );
    const notDetected = wallets.filter(
      wallet => wallet.readyState === 'NotDetected'
    );

    return [installed, notDetected];
  }, [wallets]);

  const handleWalletClick = useCallback(
    async (wallet: any) => {
      // Clear any previous errors
      setError(null);
      setConnectingWallet(wallet.adapter.name);
      
      try {
        // Handle "Not Detected" wallets - redirect to install page
        if (wallet.readyState === 'NotDetected') {
          const installUrl = getWalletInstallUrl(wallet.adapter.name);
          if (installUrl) {
            window.open(installUrl, '_blank');
            setError(`Please install ${wallet.adapter.name} wallet and refresh the page.`);
            setConnectingWallet(null);
            return;
          }
        }
        
        // Check wallet readyState before attempting connection
        if (wallet.readyState === 'Unsupported') {
          throw new Error(`${wallet.adapter.name} wallet is not supported on this platform`);
        }
        
        if (wallet.readyState !== 'Installed') {
          throw new Error(`${wallet.adapter.name} wallet is not installed or not ready`);
        }
        
        console.log(`Attempting to connect to ${wallet.adapter.name}...`);
        
        // First select the wallet
        await select(wallet.adapter.name);
        console.log(`Selected ${wallet.adapter.name} wallet`);
        
        // Small delay to ensure wallet is properly selected
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // Then connect
        console.log('Initiating connection...');
        await connect();
        console.log('Connection successful!');
        
        // Close modal on successful connection
        onClose();
      } catch (error: any) {
        setConnectingWallet(null);
        console.error('Wallet connection error:', error);
        
        // Handle specific error types
        let errorMessage = 'Failed to connect wallet';
        
        if (error?.message?.includes('User rejected') || error?.code === 4001) {
          errorMessage = 'Connection cancelled by user';
        } else if (error?.message?.includes('WalletNotReadyError')) {
          errorMessage = `${wallet.adapter.name} wallet is not ready. Please make sure it's unlocked.`;
        } else if (error?.message?.includes('WalletConnectionError')) {
          errorMessage = `Failed to connect to ${wallet.adapter.name}. Please try again.`;
        } else if (error?.message?.includes('not installed')) {
          errorMessage = `${wallet.adapter.name} wallet is not installed. Please install it first.`;
        } else if (error?.message) {
          errorMessage = error.message;
        }
        
        setError(errorMessage);
        
        // Don't close modal on error so user can try again
      }
    },
    [select, connect, onClose]
  );

  const getWalletIcon = (walletName: string) => {
    // You can add more wallet icons here
    const icons: Record<string, string> = {
      Phantom: '👻',
      Solflare: '🔥',
      Torus: '🟦',
      Ledger: '📊',
    };
    return icons[walletName] || '💼';
  };

  const getWalletInstallUrl = (walletName: string): string | null => {
    const installUrls: Record<string, string> = {
      Phantom: 'https://phantom.app/',
      Solflare: 'https://solflare.com/',
      Torus: 'https://app.tor.us/',
      Ledger: 'https://www.ledger.com/ledger-live',
    };
    return installUrls[walletName] || null;
  };

  // Clear error when modal closes
  React.useEffect(() => {
    if (!isOpen) {
      setError(null);
      setConnectingWallet(null);
    }
  }, [isOpen]);

  // Auto-close modal when successfully connected
  React.useEffect(() => {
    if (connected && isOpen) {
      onClose();
    }
  }, [connected, isOpen, onClose]);

  if (!isOpen) return null;

  const modalContent = (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-card border border-border rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto overflow-hidden">
        <div className="max-h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div>
              <h2 className="text-xl font-semibold text-foreground">
                Connect Wallet
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Choose your preferred Solana wallet
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
              aria-label="Close modal"
            >
              <X size={20} className="text-muted-foreground" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Error Display */}
            {error && (
              <div className="mb-4 p-4 bg-destructive/10 border border-destructive/20 rounded-xl">
                <div className="flex items-start space-x-3">
                  <AlertCircle size={16} className="text-destructive mt-0.5 flex-shrink-0" />
                  <div className="text-sm">
                    <p className="text-destructive font-medium mb-1">
                      Connection Failed
                    </p>
                    <p className="text-destructive/80">
                      {error}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Installed Wallets */}
            {listedWallets.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-foreground mb-3">
                  Detected Wallets
                </h3>
                {listedWallets.map(wallet => (
                  <button
                    key={wallet.adapter.name}
                    onClick={() => handleWalletClick(wallet)}
                    disabled={connecting || connectingWallet === wallet.adapter.name}
                    className="w-full flex items-center justify-between p-4 bg-muted/50 hover:bg-muted border border-border/50 hover:border-border rounded-xl transition-all duration-200 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed group"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-background rounded-lg flex items-center justify-center text-lg border border-border/50 group-hover:border-border transition-colors">
                        {wallet.adapter.icon ? (
                          <img
                            src={wallet.adapter.icon}
                            alt={wallet.adapter.name}
                            className="w-6 h-6"
                          />
                        ) : (
                          <span>{getWalletIcon(wallet.adapter.name)}</span>
                        )}
                      </div>
                      <div className="text-left">
                        <div className="font-medium text-foreground">
                          {wallet.adapter.name}
                        </div>
                        <div className="text-sm text-success">
                          {connectingWallet === wallet.adapter.name ? 'Connecting...' : 'Ready to connect'}
                        </div>
                      </div>
                    </div>
                    {connectingWallet === wallet.adapter.name ? (
                      <Loader2
                        size={16}
                        className="animate-spin text-muted-foreground"
                      />
                    ) : (
                      <ChevronRight
                        size={16}
                        className="text-muted-foreground group-hover:text-foreground transition-colors"
                      />
                    )}
                  </button>
                ))}
              </div>
            )}

            {/* Not Detected Wallets */}
            {collapsedWallets.length > 0 && (
              <div className="space-y-3 mt-6">
                <h3 className="text-sm font-medium text-foreground mb-3">
                  More Wallets
                </h3>
                {collapsedWallets.map(wallet => (
                  <button
                    key={wallet.adapter.name}
                    onClick={() => handleWalletClick(wallet)}
                    disabled={connecting || connectingWallet === wallet.adapter.name}
                    className="w-full flex items-center justify-between p-4 bg-muted/30 hover:bg-muted/50 border border-border/30 hover:border-border/50 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-background/50 rounded-lg flex items-center justify-center text-lg border border-border/30 group-hover:border-border/50 transition-colors">
                        {wallet.adapter.icon ? (
                          <img
                            src={wallet.adapter.icon}
                            alt={wallet.adapter.name}
                            className="w-6 h-6 opacity-70"
                          />
                        ) : (
                          <span className="opacity-70">
                            {getWalletIcon(wallet.adapter.name)}
                          </span>
                        )}
                      </div>
                      <div className="text-left">
                        <div className="font-medium text-foreground">
                          {wallet.adapter.name}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {connectingWallet === wallet.adapter.name ? 'Opening installer...' : 'Not detected'}
                        </div>
                      </div>
                    </div>
                    {connectingWallet === wallet.adapter.name ? (
                      <ExternalLink
                        size={16}
                        className="text-muted-foreground"
                      />
                    ) : (
                      <ChevronRight
                        size={16}
                        className="text-muted-foreground group-hover:text-foreground transition-colors"
                      />
                    )}
                  </button>
                ))}
              </div>
            )}

            {/* Info Section */}
            <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-xl">
              <div className="flex items-start space-x-3">
                <AlertCircle size={16} className="text-primary mt-0.5" />
                <div className="text-sm">
                  <p className="text-foreground font-medium mb-1">
                    New to Solana wallets?
                  </p>
                  <p className="text-muted-foreground">
                    We recommend starting with{' '}
                    <a
                      href="https://phantom.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Phantom
                    </a>{' '}
                    for beginners.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-muted/30 border-t border-border">
            <p className="text-xs text-muted-foreground text-center">
              By connecting, you agree to our terms of service and privacy
              policy.
            </p>
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
