/**
 * Application Layout Component for Codigo Escrow Template
 * 
 * @author David James
 * @email ccrowndavid@gmail.com
 * @github https://www.github.com/David-CCrown
 * @description Main layout for application pages, includes navigation and wallet connection
 */

import { Link, Outlet, useLocation } from 'react-router';
import { Settings, Plus, Activity, History, BarChart3 } from 'lucide-react';
import Button from '../ui/Button';
import WalletConnectButton from '../reusables/WalletConnectButton';
import ProgramNotDeployed from '../ProgramNotDeployed';
import { ESCROW_PROGRAM_ID } from '../../config/program';

const AppLayout = () => {
  const location = useLocation();

  // Check if program is deployed
  const isProgramDeployed = ESCROW_PROGRAM_ID.toBase58() !== '11111111111111111111111111111111';

  // Show program not deployed screen if program is not ready
  if (!isProgramDeployed) {
    return <ProgramNotDeployed />;
  }

  const navigation = [
    { name: 'Active', href: '/app', icon: Activity },
    { name: 'History', href: '/app/history', icon: History },
    { name: 'Analytics', href: '/app/analytics', icon: BarChart3 },
    { name: 'Settings', href: '/app/settings', icon: Settings },
  ];

  return (
    <>
      <div className="relative min-h-screen">
        {/* Fixed Header */}
        <header className="sticky top-0 z-50 px-6 py-3 bg-background/80 backdrop-blur-sm border-b border-border/50">
          <div className="max-w-6xl mx-auto">
            <nav className="flex items-center justify-between">
              {/* Logo/Brand */}
              <Link to="/app" className="text-lg font-medium text-foreground">
                Trustlink
              </Link>

              {/* Navigation Links */}
              <div className="hidden md:flex items-center gap-8">
                {navigation.map(item => {
                  const isActive =
                    location.pathname === item.href ||
                    (item.href === '/app' &&
                      location.pathname.startsWith('/app') &&
                      location.pathname !== '/app/history' &&
                      location.pathname !== '/app/analytics' &&
                      location.pathname !== '/app/settings');

                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`text-sm font-medium transition-colors ${
                        isActive
                          ? 'text-foreground'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </div>

              {/* Right Section with Create Button and Wallet */}
              <div className="flex items-center gap-4">
                {/* Create Button */}
                <Link to="/app/create">
                  <Button
                    variant="escrow"
                    size="sm"
                    className="flex items-center gap-2 px-4 py-2 h-9 font-medium transition-all duration-200 hover:scale-105 bg-gradient-to-r from-primary to-solana hover:from-primary/90 hover:to-solana/90 text-white shadow-md hover:shadow-lg"
                  >
                    Create
                    <Plus className="w-4 h-4" />
                  </Button>
                </Link>

                <WalletConnectButton />
              </div>
            </nav>
          </div>
        </header>

        {/* Mobile Navigation - Simple design */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border">
          <div className="flex items-center justify-around py-2">
            {navigation.map(item => {
              const isActive =
                location.pathname === item.href ||
                (item.href === '/app' &&
                  location.pathname.startsWith('/app') &&
                  location.pathname !== '/app/create' &&
                  location.pathname !== '/app/history' &&
                  location.pathname !== '/app/analytics' &&
                  location.pathname !== '/app/settings');

              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex flex-col items-center gap-1 px-3 py-2 text-xs ${
                    isActive ? 'text-foreground' : 'text-muted-foreground'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Main Content */}
        <main className="pb-16 md:pb-0">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default AppLayout;
