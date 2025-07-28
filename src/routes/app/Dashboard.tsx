import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import {
  ArrowRight,
  Filter,
  Search,
  SortAsc,
  XCircle,
  RefreshCw,
} from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import TransactionModal from '@/components/ui/TransactionModal';
import { useEscrowProgram, type EscrowData } from '@/hooks/useEscrowProgram';
import { useWalletUtils } from '@/hooks/useWalletUtils';

export default function Dashboard() {
  const navigate = useNavigate();
  const { connected } = useWalletUtils();
  const {
    fetchUserEscrows,
    takeEscrow,
    cancelEscrow,
    transactionState,
    resetTransactionState,
    isConnected,
  } = useEscrowProgram();

  const [search, setSearch] = useState('');
  const [escrows, setEscrows] = useState<EscrowData[]>([]);
  const [loading, setLoading] = useState(false);
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [selectedEscrow, setSelectedEscrow] = useState<EscrowData | null>(null);

  // Load escrows on component mount and when wallet connects
  useEffect(() => {
    if (isConnected) {
      loadEscrows();
    } else {
      setEscrows([]);
    }
  }, [isConnected]);

  const loadEscrows = async () => {
    if (!isConnected) return;

    setLoading(true);
    try {
      const userEscrows = await fetchUserEscrows();
      setEscrows(userEscrows);
    } catch (error) {
      console.error('Failed to load escrows:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filter escrows based on search
  const filteredEscrows = escrows.filter(
    e =>
      e.makerToken.symbol.toLowerCase().includes(search.toLowerCase()) ||
      e.takerToken.symbol.toLowerCase().includes(search.toLowerCase())
  );

  // Handle escrow actions
  const handleTakeEscrow = async (escrow: EscrowData) => {
    setSelectedEscrow(escrow);
    setShowTransactionModal(true);

    try {
      const result = await takeEscrow(escrow.address);
      if (result) {
        // Refresh escrows after successful transaction
        await loadEscrows();
      }
    } catch (error) {
      console.error('Failed to take escrow:', error);
    }
  };

  const handleCancelEscrow = async (escrow: EscrowData) => {
    setSelectedEscrow(escrow);
    setShowTransactionModal(true);

    try {
      const result = await cancelEscrow(escrow.address);
      if (result) {
        // Refresh escrows after successful transaction
        await loadEscrows();
      }
    } catch (error) {
      console.error('Failed to cancel escrow:', error);
    }
  };

  const handleCloseModal = () => {
    setShowTransactionModal(false);
    setSelectedEscrow(null);
    resetTransactionState();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-success';
      case 'Expired':
        return 'bg-warning';
      case 'Cancelled':
        return 'bg-muted-foreground';
      default:
        return 'bg-primary';
    }
  };

  return (
    <div className="py-4 px-4">
      <div className="relative max-w-[90%] lg:max-w-[70%] mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-6">
            Dashboard
          </h1>

          {/* Professional Search and Filter Bar */}
          <div className="bg-card/60 rounded-2xl border border-border/30 p-6 backdrop-blur-sm">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Enhanced Search */}
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Search escrows by token, ID, or status..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  variant="search"
                  startIcon={<Search className="w-5 h-5" />}
                />
              </div>

              {/* Filter and Action Controls */}
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 px-4 py-3 rounded-xl border border-border/20 bg-background/60 backdrop-blur-sm hover:bg-background hover:border-primary/30 text-foreground font-medium transition-all duration-300 shadow-sm hover:shadow-md hover:scale-[1.02]">
                  <Filter className="w-4 h-4" />
                  <span>Filter</span>
                </button>

                <button className="flex items-center gap-2 px-4 py-3 rounded-xl border border-border/20 bg-background/60 backdrop-blur-sm hover:bg-background hover:border-primary/30 text-foreground font-medium transition-all duration-300 shadow-sm hover:shadow-md hover:scale-[1.02]">
                  <SortAsc className="w-4 h-4" />
                  <span>Sort</span>
                </button>

                <button
                  onClick={loadEscrows}
                  disabled={loading}
                  className="flex items-center gap-2 px-4 py-3 rounded-xl border border-success/20 bg-success/5 backdrop-blur-sm hover:bg-success/10 hover:border-success/30 text-success font-medium transition-all duration-300 shadow-sm hover:shadow-md hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  <RefreshCw
                    className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`}
                  />
                  <span>Refresh</span>
                </button>
              </div>
            </div>

            {/* Stats Summary Row */}
            <div className="mt-4 pt-4 border-t border-border/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                    <span className="text-muted-foreground">
                      Active Escrows:
                    </span>
                    <span className="font-semibold text-foreground">
                      {escrows.length}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span className="text-muted-foreground">Total Value:</span>
                    <span className="font-semibold text-foreground">$0.00</span>
                  </div>
                </div>

                {filteredEscrows.length !== escrows.length && (
                  <div className="text-sm text-muted-foreground">
                    Showing {filteredEscrows.length} of {escrows.length} escrows
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Escrow Cards Grid */}
        {escrows.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24">
            {/* Beautiful empty state */}
            <div className="relative mb-8">
              <div className="w-32 h-32 bg-gradient-to-br from-primary/10 to-solana/10 rounded-3xl flex items-center justify-center mb-2">
                <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-solana/20 rounded-2xl flex items-center justify-center">
                  <XCircle className="w-12 h-12 text-muted-foreground" />
                </div>
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary/20 rounded-full animate-pulse" />
              <div
                className="absolute -bottom-2 -left-2 w-4 h-4 bg-accent/30 rounded-full animate-bounce"
                style={{ animationDelay: '0.5s' }}
              />
            </div>

            <div className="text-center space-y-4 max-w-md">
              <h2 className="text-3xl font-bold text-gradient-solana mb-3">
                No Active Escrows
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Create your first escrow to start trading tokens securely with
                the community.
              </p>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button
                variant="escrow"
                size="lg"
                gradient
                className="hover:shadow-solana-lg text-lg px-8"
                rightIcon={<ArrowRight className="w-5 h-5" />}
                onClick={() => navigate('/app/create')}
              >
                Create Escrow
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="hover:bg-primary/5 text-lg px-8"
                onClick={() => navigate('/app/browse')}
              >
                Browse Escrows
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {escrows.map(escrow => (
              <div
                key={escrow.id}
                className="group relative p-8 rounded-3xl border border-border/30 bg-card/60 backdrop-blur-xl hover:bg-card/90 hover:border-primary/30 transition-all duration-500 hover:shadow-solana-lg hover-lift cursor-pointer"
              >
                {/* Enhanced gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-solana/8 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-accent/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-700" />

                <div className="relative z-10">
                  {/* Enhanced status badge */}
                  <div className="absolute -top-2 -right-2 flex items-center gap-2">
                    <div
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-2xl backdrop-blur-sm border ${
                        escrow.status === 'Active'
                          ? 'bg-success/10 border-success/20 text-success'
                          : 'bg-warning/10 border-warning/20 text-warning'
                      }`}
                    >
                      <span
                        className={`w-2.5 h-2.5 rounded-full animate-pulse ${
                          escrow.status === 'Active'
                            ? 'bg-success'
                            : 'bg-warning'
                        }`}
                      />
                      <span className="text-xs font-semibold">
                        {escrow.status}
                      </span>
                    </div>
                  </div>

                  {/* Enhanced mutable badge */}
                  {escrow.account.isMutable && (
                    <div className="absolute -top-2 -left-2 px-3 py-1.5 rounded-2xl bg-accent/15 border border-accent/20 text-accent text-xs font-bold backdrop-blur-sm">
                      ✦ Mutable
                    </div>
                  )}

                  {/* Enhanced main content */}
                  <div className="mb-8 mt-10">
                    {/* Token exchange display */}
                    <div className="flex items-center justify-center gap-4 mb-6 p-4 bg-muted/10 rounded-2xl">
                      <div className="text-center">
                        <span className="text-2xl font-bold text-gradient-solana block">
                          {escrow.makerToken.amount}
                        </span>
                        <span className="text-sm font-semibold text-muted-foreground">
                          {escrow.makerToken.symbol}
                        </span>
                      </div>

                      <div className="flex flex-col items-center">
                        <ArrowRight className="w-6 h-6 text-primary group-hover:scale-110 transition-transform duration-300" />
                        <span className="text-xs text-muted-foreground mt-1">
                          Exchange
                        </span>
                      </div>

                      <div className="text-center">
                        <span className="text-2xl font-bold text-gradient-solana block">
                          {escrow.takerToken.amount}
                        </span>
                        <span className="text-sm font-semibold text-muted-foreground">
                          {escrow.takerToken.symbol}
                        </span>
                      </div>
                    </div>

                    {/* Enhanced metadata */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground font-medium">
                          Escrow ID
                        </span>
                        <span className="text-foreground font-semibold font-mono">
                          #{escrow.id}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground font-medium">
                          Expiry
                        </span>
                        <span className="text-foreground font-semibold">
                          {escrow.timeRemaining.formatted}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground font-medium">
                          Exchange Rate
                        </span>
                        <span className="text-foreground font-semibold">
                          {escrow.exchangeRate.toFixed(6)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced actions */}
                  <div className="flex gap-3">
                    {escrow.isMaker ? (
                      <>
                        <Button
                          onClick={() => handleCancelEscrow(escrow)}
                          variant="escrow"
                          size="md"
                          gradient
                          disabled={!escrow.canCancel}
                          className="flex-1 hover:shadow-solana-lg group-hover:scale-[1.02] transition-transform duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Cancel Escrow
                        </Button>
                        <Button
                          variant="outline"
                          size="md"
                          disabled={!escrow.canUpdate}
                          className="flex-1 hover:bg-primary/10 hover:border-primary/40 group-hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Update Terms
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          onClick={() => handleTakeEscrow(escrow)}
                          variant="escrow"
                          size="md"
                          gradient
                          disabled={!escrow.canTake}
                          className="flex-1 hover:shadow-solana-lg group-hover:scale-[1.02] transition-transform duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Accept Trade
                        </Button>
                        <Button
                          variant="outline"
                          size="md"
                          className="flex-1 hover:bg-destructive/10 hover:border-destructive/40 hover:text-destructive group-hover:scale-[1.02] transition-all duration-300"
                        >
                          Decline
                        </Button>
                      </>
                    )}
                  </div>

                  {/* Decorative elements */}
                  <div className="absolute top-4 right-4 w-2 h-2 bg-primary/20 rounded-full animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div
                    className="absolute bottom-4 left-4 w-1.5 h-1.5 bg-accent/30 rounded-full animate-bounce opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                    style={{ animationDelay: '0.2s' }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Transaction Modal */}
      <TransactionModal
        isOpen={showTransactionModal}
        onClose={handleCloseModal}
        transactionState={transactionState}
        title={selectedEscrow?.isMaker ? 'Cancel Escrow' : 'Accept Trade'}
      />
    </div>
  );
}
