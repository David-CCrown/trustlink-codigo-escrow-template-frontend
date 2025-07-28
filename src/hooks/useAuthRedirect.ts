/**
 * Authentication Redirect Hook for Codigo Escrow Template
 * 
 * @author David James
 * @email ccrowndavid@gmail.com
 * @github https://www.github.com/David-CCrown
 * @description Handles redirecting users to intended routes after wallet connection
 */

import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useWallet } from '@solana/wallet-adapter-react';

/**
 * Hook to handle redirects after successful wallet connection
 * 
 * Checks sessionStorage for a stored redirect path and navigates there
 * when the wallet connects successfully.
 */
export const useAuthRedirect = () => {
  const { connected } = useWallet();
  const navigate = useNavigate();

  useEffect(() => {
    if (connected) {
      // Check if there's a stored redirect path
      const redirectPath = sessionStorage.getItem('redirectAfterAuth');
      
      if (redirectPath && redirectPath !== '/') {
        // Clear the stored path
        sessionStorage.removeItem('redirectAfterAuth');
        
        // Redirect to the intended route
        navigate(redirectPath, { replace: true });
      }
    }
  }, [connected, navigate]);
};

export default useAuthRedirect;
