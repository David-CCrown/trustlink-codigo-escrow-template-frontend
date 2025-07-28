import {
  ChevronDown,
  WalletIcon,
  Loader2,
} from 'lucide-react';
import Button from '../ui/Button';
import { useRef, useState, useEffect } from 'react';
import { WalletModal } from '../wallet/WalletModal';
import WalletInfoModal from './WalletInfoModal';
import { useWalletUtils } from '../../hooks/useWalletUtils';
import { Toast, useToast } from '../ui/Toast';

const WalletConnectButton = () => {
  const [isWalletInfoModalOpen, setIsWalletInfoModalOpen] = useState(false);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [balance, setBalance] = useState<number>(0);
  const [copySuccess, setCopySuccess] = useState(false);
  const walletButton = useRef<HTMLButtonElement>(null);
  const { toast, success, error, hideToast } = useToast();

  const {
    connected,
    connecting,
    address,
    truncatedAddress,
    copyAddress,
    getBalance,
    getExplorerUrl,
    disconnect,
  } = useWalletUtils();

  // Wallet state management
  useEffect(() => {
    // Handle wallet state changes
  }, [connected, connecting, address, truncatedAddress]);

  // Fetch balance when connected
  useEffect(() => {
    if (connected) {
      getBalance().then(setBalance);
    } else {
      setBalance(0);
    }
  }, [connected, getBalance]);

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
    } else {
      error('Failed to disconnect wallet');
    }
    setIsWalletInfoModalOpen(false);
  };

  const handleConnect = () => {
    setIsWalletModalOpen(true);
  };

  return (
    <>
      {connected ? (
        <Button
          className="relative min-w-0 max-w-[200px] sm:max-w-none"
          ref={walletButton}
          variant="outline"
          size="sm"
          onClick={() => setIsWalletInfoModalOpen(true)}
          disabled={connecting}
        >
          <span className="flex items-center gap-1 sm:gap-2 min-w-0">
            {connecting ? (
              <Loader2 size={16} className="animate-spin sm:w-5 sm:h-5 flex-shrink-0" />
            ) : (
              <WalletIcon size={16} className="sm:w-5 sm:h-5 flex-shrink-0" />
            )}
            <span className="truncate text-xs sm:text-sm font-mono">
              {truncatedAddress}
            </span>
          </span>

          <ChevronDown
            className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4 transition-transform flex-shrink-0"
          />
        </Button>
      ) : (
        <Button
          className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm px-3 sm:px-4"
          ref={walletButton}
          size="sm"
          variant="outline"
          onClick={handleConnect}
          disabled={connecting}
        >
          {connecting ? (
            <Loader2 size={16} className="animate-spin sm:w-5 sm:h-5" />
          ) : (
            <WalletIcon size={16} className="sm:w-5 sm:h-5" />
          )}
          <span className="hidden xs:inline">
            {connecting ? 'Connecting...' : 'Connect Wallet'}
          </span>
          <span className="xs:hidden">
            {connecting ? 'Connecting' : 'Connect'}
          </span>
        </Button>
      )}
      
      {/* Wallet Info Modal */}
      <WalletInfoModal
        isOpen={isWalletInfoModalOpen && connected}
        onClose={() => setIsWalletInfoModalOpen(false)}
        address={address || ''}
        balance={balance}
        copySuccess={copySuccess}
        onCopyAddress={handleCopyAddress}
        onViewExplorer={() => window.open(getExplorerUrl(), '_blank')}
        onDisconnect={handleDisconnect}
      />
      
      {/* Wallet Selection Modal */}
      <WalletModal 
        isOpen={isWalletModalOpen} 
        onClose={() => setIsWalletModalOpen(false)} 
      />
      
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

export default WalletConnectButton;
