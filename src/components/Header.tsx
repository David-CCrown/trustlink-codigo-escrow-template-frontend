import WalletConnectButton from './reusables/WalletConnectButton';
import Button from './ui/Button';
import { useWallet } from '@solana/wallet-adapter-react';
import { useState } from 'react';
import { WalletModal } from './wallet/WalletModal';

const Header = () => {
  const { connected } = useWallet();
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);

  const handleLaunchApp = () => {
    if (connected) {
      // Redirect to app if connected
      window.location.href = '/app';
    } else {
      // Store intended destination and show wallet modal
      sessionStorage.setItem('redirectAfterAuth', '/app');
      setIsWalletModalOpen(true);
    }
  };

  return (
    <>
      <header
        className="p-3 bg-background/80 backdrop-blur-sm sticky top-0 z-50"
        role="banner"
        aria-label="Site Header"
      >
        <div className="max-w-[90%] lg:max-w-[70%] mx-auto flex justify-between items-center">
          <nav className="w-full flex items-center justify-between pb-2 border-secondary/30">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                {/* <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-primary-foreground text-sm font-medium">
                    S
                  </span>
                </div> */}
                <span className="text-lg font-medium text-foreground">
                  Trustlink
                </span>
              </div>

              <div className="hidden md:flex items-center space-x-6">
                <a
                  href="#features"
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                >
                  Features
                </a>
                <a
                  href="#how-it-works"
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                >
                  How it works
                </a>
                <a
                  href="#security"
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                >
                  Security
                </a>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <WalletConnectButton />
              <Button
                size="md"
                onClick={handleLaunchApp}
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-6"
              >
                {connected ? 'Launch App' : 'Connect & Launch'}
              </Button>
            </div>
          </nav>
        </div>
      </header>

      {/* Wallet Modal */}
      <WalletModal 
        isOpen={isWalletModalOpen} 
        onClose={() => setIsWalletModalOpen(false)} 
      />
    </>
  );
};

export default Header;
