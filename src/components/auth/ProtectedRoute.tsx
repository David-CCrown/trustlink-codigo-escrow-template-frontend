/**
 * Protected Route Component for Codigo Escrow Template
 * 
 * @author David James
 * @email ccrowndavid@gmail.com
 * @github https://www.github.com/David-CCrown
 * @description Protects routes that require wallet connection, redirects to auth page if not connected
 */

import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router';
import { useWallet } from '@solana/wallet-adapter-react';
import { Loader2, WalletIcon, Shield, ArrowRight } from 'lucide-react';
import Button from '../ui/Button';
import { WalletModal } from '../wallet/WalletModal';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

/**
 * ProtectedRoute component that requires wallet connection
 * 
 * Handles three states:
 * 1. Loading - While wallet adapter is initializing
 * 2. Not connected - Shows wallet connection prompt
 * 3. Connected - Renders the protected content
 */
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { connected, connecting, publicKey, signTransaction } = useWallet();
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const location = useLocation();

  // More strict wallet connection check - same as useEscrowProgram
  const isFullyConnected = connected && publicKey && signTransaction;

  // Handle wallet adapter initialization
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitializing(false);
    }, 1000); // Give wallet adapters time to initialize

    return () => clearTimeout(timer);
  }, []);

  // Auto-redirect to home if we're on a protected route and not connected
  // This prevents users from bookmarking protected URLs
  useEffect(() => {
    if (!isInitializing && !isFullyConnected && !connecting) {
      // Store the attempted route for redirect after connection
      sessionStorage.setItem('redirectAfterAuth', location.pathname);
    }
  }, [isFullyConnected, connecting, isInitializing, location.pathname]);

  // Show loading screen during initialization or connection
  if (isInitializing || connecting) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
          </div>
          <h2 className="text-xl font-semibold text-foreground">
            Initializing Wallet Connection
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Please wait while we check your wallet connection...
          </p>
        </div>
      </div>
    );
  }

  // Show loading screen if partially connected (wallet adapter says connected but missing key components)
  if (connected && (!publicKey || !signTransaction)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Loader2 className="w-8 h-8 text-warning animate-spin" />
          </div>
          <h2 className="text-xl font-semibold text-foreground">
            Finalizing Wallet Connection
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Your wallet is connected but we're waiting for full access. Please ensure your wallet is unlocked...
          </p>
        </div>
      </div>
    );
  }

  // Show wallet connection prompt if not fully connected
  if (!isFullyConnected) {
    return (
      <>
        <div className="min-h-screen flex items-center justify-center bg-background px-4">
          <div className="max-w-md w-full text-center space-y-8">
            {/* Security Icon with Animation */}
            <div className="relative mx-auto w-24 h-24">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full animate-pulse" />
              <div className="relative w-full h-full bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                <Shield className="w-12 h-12 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-warning rounded-full flex items-center justify-center">
                <WalletIcon className="w-3 h-3 text-white" />
              </div>
            </div>

            {/* Title and Description */}
            <div className="space-y-4">
              <h1 className="text-3xl font-bold text-foreground">
                Wallet Required
              </h1>
              <p className="text-muted-foreground leading-relaxed">
                To access the escrow application, you need to connect your Solana wallet. 
                This ensures secure transactions and protects your funds.
              </p>
            </div>

            {/* Features List */}
            <div className="bg-card/50 rounded-xl p-6 border border-border/50 space-y-3">
              <h3 className="font-semibold text-foreground mb-4">
                Why connect your wallet?
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3 text-left">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                  <span className="text-muted-foreground">
                    Secure escrow transactions
                  </span>
                </div>
                <div className="flex items-center gap-3 text-left">
                  <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0" />
                  <span className="text-muted-foreground">
                    Control your own funds
                  </span>
                </div>
                <div className="flex items-center gap-3 text-left">
                  <div className="w-2 h-2 bg-solana rounded-full flex-shrink-0" />
                  <span className="text-muted-foreground">
                    Lightning-fast transactions
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <Button
                onClick={() => setIsWalletModalOpen(true)}
                size="lg"
                className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                rightIcon={<ArrowRight className="w-5 h-5" />}
              >
                Connect Wallet
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                onClick={() => window.location.href = '/'}
                className="w-full border-border/50 hover:border-border text-muted-foreground hover:text-foreground"
              >
                Back to Home
              </Button>
            </div>

            {/* Security Notice */}
            <div className="text-xs text-muted-foreground bg-muted/30 rounded-lg p-3 border border-border/30">
              <p>
                <strong>Secure:</strong> We never store your private keys. 
                Your wallet remains in your control at all times.
              </p>
            </div>
          </div>
        </div>

        {/* Wallet Selection Modal */}
        <WalletModal 
          isOpen={isWalletModalOpen} 
          onClose={() => setIsWalletModalOpen(false)} 
        />
      </>
    );
  }

  // Render protected content if wallet is connected
  return <>{children}</>;
};

export default ProtectedRoute;
