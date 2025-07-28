import React from 'react';
import { X, ExternalLink, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { type TransactionState } from '../../hooks/useEscrowProgram';
import { PROGRAM_CONFIG } from '../../config/program';

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  transactionState: TransactionState;
  title?: string;
}

const statusConfig = {
  idle: {
    icon: null,
    color: 'text-muted-foreground',
    bgColor: 'bg-muted/10',
    borderColor: 'border-muted/20'
  },
  preparing: {
    icon: Loader2,
    color: 'text-primary',
    bgColor: 'bg-primary/10',
    borderColor: 'border-primary/20'
  },
  signing: {
    icon: Loader2,
    color: 'text-warning',
    bgColor: 'bg-warning/10',
    borderColor: 'border-warning/20'
  },
  sending: {
    icon: Loader2,
    color: 'text-accent',
    bgColor: 'bg-accent/10',
    borderColor: 'border-accent/20'
  },
  confirming: {
    icon: Loader2,
    color: 'text-solana',
    bgColor: 'bg-solana/10',
    borderColor: 'border-solana/20'
  },
  success: {
    icon: CheckCircle,
    color: 'text-success',
    bgColor: 'bg-success/10',
    borderColor: 'border-success/20'
  },
  error: {
    icon: AlertCircle,
    color: 'text-destructive',
    bgColor: 'bg-destructive/10',
    borderColor: 'border-destructive/20'
  }
};

export default function TransactionModal({
  isOpen,
  onClose,
  transactionState,
  title = 'Transaction Status'
}: TransactionModalProps) {
  if (!isOpen) return null;

  const config = statusConfig[transactionState.status];
  const IconComponent = config.icon;

  const getExplorerUrl = (signature: string) => {
    const cluster = PROGRAM_CONFIG.NETWORK === 'mainnet-beta' ? '' : `?cluster=${PROGRAM_CONFIG.NETWORK}`;
    return `https://explorer.solana.com/tx/${signature}${cluster}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={transactionState.status === 'success' || transactionState.status === 'error' ? onClose : undefined}
      />
      
      {/* Modal */}
      <div className="relative max-w-md w-full mx-4 bg-card/95 backdrop-blur-xl rounded-3xl border border-border/50 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border/30">
          <h2 className="text-xl font-semibold text-foreground">{title}</h2>
          {(transactionState.status === 'success' || transactionState.status === 'error') && (
            <button
              onClick={onClose}
              className="p-2 hover:bg-muted/50 rounded-xl transition-colors"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          )}
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Status Icon & Message */}
          <div className="text-center space-y-4">
            <div className={`w-16 h-16 mx-auto rounded-2xl ${config.bgColor} ${config.borderColor} border-2 flex items-center justify-center`}>
              {IconComponent && (
                <IconComponent 
                  className={`w-8 h-8 ${config.color} ${
                    ['preparing', 'signing', 'sending', 'confirming'].includes(transactionState.status) 
                      ? 'animate-spin' 
                      : ''
                  }`} 
                />
              )}
            </div>
            
            <div className="space-y-2">
              <h3 className={`text-lg font-semibold ${config.color}`}>
                {transactionState.status === 'idle' && 'Ready'}
                {transactionState.status === 'preparing' && 'Preparing...'}
                {transactionState.status === 'signing' && 'Sign Transaction'}
                {transactionState.status === 'sending' && 'Sending...'}
                {transactionState.status === 'confirming' && 'Confirming...'}
                {transactionState.status === 'success' && 'Success!'}
                {transactionState.status === 'error' && 'Error'}
              </h3>
              
              <p className="text-muted-foreground text-sm leading-relaxed">
                {transactionState.message}
              </p>
            </div>
          </div>

          {/* Transaction Steps */}
          {transactionState.status !== 'idle' && transactionState.status !== 'error' && (
            <div className="space-y-3">
              <div className="text-sm font-medium text-muted-foreground mb-3">
                Transaction Progress
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${
                    ['preparing', 'signing', 'sending', 'confirming', 'success'].includes(transactionState.status)
                      ? 'bg-success' 
                      : 'bg-muted/30'
                  }`} />
                  <span className={`text-sm ${
                    transactionState.status === 'preparing' 
                      ? 'text-foreground font-medium' 
                      : 'text-muted-foreground'
                  }`}>
                    Preparing transaction
                  </span>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${
                    ['signing', 'sending', 'confirming', 'success'].includes(transactionState.status)
                      ? 'bg-success' 
                      : transactionState.status === 'preparing'
                        ? 'bg-warning animate-pulse'
                        : 'bg-muted/30'
                  }`} />
                  <span className={`text-sm ${
                    transactionState.status === 'signing' 
                      ? 'text-foreground font-medium' 
                      : 'text-muted-foreground'
                  }`}>
                    Awaiting signature
                  </span>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${
                    ['sending', 'confirming', 'success'].includes(transactionState.status)
                      ? 'bg-success' 
                      : transactionState.status === 'signing'
                        ? 'bg-warning animate-pulse'
                        : 'bg-muted/30'
                  }`} />
                  <span className={`text-sm ${
                    transactionState.status === 'sending' 
                      ? 'text-foreground font-medium' 
                      : 'text-muted-foreground'
                  }`}>
                    Broadcasting to network
                  </span>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${
                    ['confirming', 'success'].includes(transactionState.status)
                      ? 'bg-success' 
                      : transactionState.status === 'sending'
                        ? 'bg-warning animate-pulse'
                        : 'bg-muted/30'
                  }`} />
                  <span className={`text-sm ${
                    transactionState.status === 'confirming' 
                      ? 'text-foreground font-medium' 
                      : 'text-muted-foreground'
                  }`}>
                    Confirming on-chain
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Transaction Signature */}
          {transactionState.signature && (
            <div className="space-y-3">
              <div className="text-sm font-medium text-muted-foreground">
                Transaction Signature
              </div>
              <div className="p-3 bg-muted/20 rounded-xl">
                <div className="font-mono text-xs text-foreground break-all">
                  {transactionState.signature}
                </div>
              </div>
              <a
                href={getExplorerUrl(transactionState.signature)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors text-sm font-medium"
              >
                <ExternalLink className="w-4 h-4" />
                View on Solana Explorer
              </a>
            </div>
          )}

          {/* Error Details */}
          {transactionState.status === 'error' && transactionState.error && (
            <div className="space-y-3">
              <div className="text-sm font-medium text-destructive">
                Error Details
              </div>
              <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-xl">
                <div className="text-sm text-destructive">
                  {transactionState.error}
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            {transactionState.status === 'success' && (
              <button
                onClick={onClose}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-success to-success/80 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                Continue
              </button>
            )}
            
            {transactionState.status === 'error' && (
              <button
                onClick={onClose}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-primary to-solana text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                Try Again
              </button>
            )}
            
            {['preparing', 'signing', 'sending', 'confirming'].includes(transactionState.status) && (
              <div className="flex-1 px-4 py-3 bg-muted/20 text-muted-foreground rounded-xl font-semibold text-center">
                Please wait...
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
