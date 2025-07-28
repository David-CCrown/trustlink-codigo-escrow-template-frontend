import React from 'react';
import { useWalletUtils } from '../../hooks/useWalletUtils';
import { WalletIcon, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

interface WalletStatusProps {
  showBalance?: boolean;
  compact?: boolean;
  className?: string;
}

export const WalletStatus: React.FC<WalletStatusProps> = ({
  showBalance = false,
  compact = false,
  className = '',
}) => {
  const { connected, connecting, truncatedAddress, getBalance } = useWalletUtils();
  const [balance, setBalance] = React.useState<number>(0);

  React.useEffect(() => {
    if (connected && showBalance) {
      getBalance().then(setBalance);
    }
  }, [connected, showBalance, getBalance]);

  if (connecting) {
    return (
      <div className={`flex items-center gap-2 text-warning ${className}`}>
        <Loader2 size={16} className="animate-spin" />
        {!compact && <span className="text-sm">Connecting...</span>}
      </div>
    );
  }

  if (connected) {
    return (
      <div className={`flex items-center gap-2 text-success ${className}`}>
        <CheckCircle2 size={16} />
        {!compact && (
          <div className="text-sm">
            <span className="font-medium">Connected</span>
            {showBalance && (
              <span className="ml-2 text-muted-foreground">
                {balance.toFixed(4)} SOL
              </span>
            )}
            <div className="text-xs text-muted-foreground font-mono">
              {truncatedAddress}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-2 text-muted-foreground ${className}`}>
      <AlertCircle size={16} />
      {!compact && <span className="text-sm">Not connected</span>}
    </div>
  );
};
