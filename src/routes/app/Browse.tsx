import { useState, useEffect } from 'react';
import {
  ArrowRight,
  Filter,
  Search,
  SortAsc,
  Clock,
  TrendingUp,
  Users,
  RefreshCw,
} from 'lucide-react';
import Button from '@/components/ui/Button';
import TransactionModal from '@/components/ui/TransactionModal';
import Select from '@/components/ui/Select';
import Input from '@/components/ui/Input';
import { useEscrowProgram, type EscrowData } from '@/hooks/useEscrowProgram';

export default function Browse() {
  const { takeEscrow, transactionState, resetTransactionState, isConnected } =
    useEscrowProgram();

  const [search, setSearch] = useState('');
  const [escrows, setEscrows] = useState<EscrowData[]>([]);
  const [loading, setLoading] = useState(false);
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [selectedEscrow, setSelectedEscrow] = useState<EscrowData | null>(null);
  const [filters, setFilters] = useState({
    token: 'All Tokens',
    amount: 'All Amounts',
    duration: 'All Durations',
  });

  // Simulate loading public escrows (in production, this would fetch from program)
  const loadPublicEscrows = async () => {
    if (!isConnected) return;

    setLoading(true);
    try {
      // In production, this would fetch all public escrows from the program
      // For now, show empty state as a professional placeholder
      setEscrows([]);
    } catch (error) {
      console.error('Failed to load public escrows:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isConnected) {
      loadPublicEscrows();
    } else {
      setEscrows([]);
    }
  }, [isConnected]);

  // Filter escrows based on search and filters
  const filteredEscrows = escrows.filter(escrow => {
    const matchesSearch =
      escrow.makerToken.symbol.toLowerCase().includes(search.toLowerCase()) ||
      escrow.takerToken.symbol.toLowerCase().includes(search.toLowerCase());

    const matchesToken =
      filters.token === 'All Tokens' ||
      escrow.makerToken.symbol === filters.token ||
      escrow.takerToken.symbol === filters.token;

    return matchesSearch && matchesToken;
  });

  // Handle escrow actions
  const handleTakeEscrow = async (escrow: EscrowData) => {
    setSelectedEscrow(escrow);
    setShowTransactionModal(true);

    try {
      const result = await takeEscrow(escrow.address);
      if (result) {
        // Refresh escrows after successful transaction
        await loadPublicEscrows();
      }
    } catch (error) {
      console.error('Failed to take escrow:', error);
    }
  };

  const handleCloseModal = () => {
    setShowTransactionModal(false);
    setSelectedEscrow(null);
    resetTransactionState();
  };

  return (
    <div className="py-4 px-4">
      <div className="relative max-w-[90%] lg:max-w-[70%] mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 gap-4">
          <div className="flex items-center gap-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-semibold text-gradient-muted tracking-normal flex items-center gap-3">
                Browse Escrows
                <div className="relative">
                  <span className="px-2.5 py-1 rounded-lg bg-gradient-subtle text-foreground text-sm font-medium shadow-sm">
                    {filteredEscrows.length}
                  </span>
                  <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-primary rounded-full animate-pulse" />
                </div>
              </h1>
              <p className="text-muted-foreground text-sm mt-2">
                Discover and accept escrow trades from the community
              </p>
            </div>
          </div>

          {/* Action bar */}
          <div className="flex flex-wrap gap-2">
            <Input
              type="text"
              placeholder="Search escrows..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              size="sm"
              variant="search"
              startIcon={<Search className="w-4 h-4" />}
              className="min-w-[220px]"
            />
            <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-border/20 bg-card/60 backdrop-blur-sm hover:bg-card/80 hover:border-primary/20 text-foreground text-sm font-medium transition-all duration-300 shadow-sm hover-lift">
              <Filter className="w-4 h-4" /> Filter
            </button>
            <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-border/20 bg-card/60 backdrop-blur-sm hover:bg-card/80 hover:border-primary/20 text-foreground text-sm font-medium transition-all duration-300 shadow-sm hover-lift">
              <SortAsc className="w-4 h-4" /> Sort
            </button>
            <button
              onClick={loadPublicEscrows}
              disabled={loading}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-border/20 bg-card/60 backdrop-blur-sm hover:bg-card/80 hover:border-success/20 text-foreground text-sm font-medium transition-all duration-300 shadow-sm hover-lift disabled:opacity-50"
            >
              <RefreshCw
                className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`}
              />{' '}
              Refresh
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="mb-6 p-4 bg-card/40 rounded-xl border border-border/30">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground">
                Quick Filters:
              </span>
            </div>
            <Select
              value={filters.token}
              onChange={value => setFilters({ ...filters, token: value })}
              size="sm"
              options={[
                { value: 'All Tokens', label: 'All Tokens' },
                { value: 'SOL', label: 'SOL' },
                { value: 'USDC', label: 'USDC' },
                { value: 'BONK', label: 'BONK' },
              ]}
            />
            <Select
              value={filters.amount}
              onChange={value => setFilters({ ...filters, amount: value })}
              size="sm"
              options={[
                { value: 'All Amounts', label: 'All Amounts' },
                { value: '< 10', label: '< 10' },
                { value: '10-100', label: '10-100' },
                { value: '100-1000', label: '100-1000' },
                { value: '> 1000', label: '> 1000' },
              ]}
            />
            <Select
              value={filters.duration}
              onChange={value => setFilters({ ...filters, duration: value })}
              size="sm"
              options={[
                { value: 'All Durations', label: 'All Durations' },
                { value: '6 hours', label: '6 hours' },
                { value: '6-24 hours', label: '6-24 hours' },
                { value: '1-7 days', label: '1-7 days' },
                { value: '7 days', label: '7 days' },
              ]}
            />
          </div>
        </div>

        {/* Escrow Cards Grid or Empty State */}
        {!isConnected ? (
          <div className="flex flex-col items-center justify-center py-32">
            <div className="relative mb-8">
              <div className="w-32 h-32 bg-gradient-to-br from-warning/10 to-accent/10 rounded-3xl flex items-center justify-center mb-2">
                <div className="w-20 h-20 bg-gradient-to-br from-warning/20 to-accent/20 rounded-2xl flex items-center justify-center">
                  <Users className="w-12 h-12 text-muted-foreground" />
                </div>
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-warning/20 rounded-full animate-pulse" />
            </div>

            <div className="text-center space-y-4 max-w-md">
              <h2 className="text-3xl font-bold text-gradient-solana mb-3">
                Connect Your Wallet
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Connect your wallet to browse and accept escrow trades from
                other users.
              </p>
            </div>
          </div>
        ) : filteredEscrows.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32">
            <div className="relative mb-8">
              <div className="w-32 h-32 bg-gradient-to-br from-primary/10 to-solana/10 rounded-3xl flex items-center justify-center mb-2">
                <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-solana/20 rounded-2xl flex items-center justify-center">
                  <TrendingUp className="w-12 h-12 text-muted-foreground" />
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
                No Escrows Available
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                There are currently no public escrows available. Be the first to
                create one!
              </p>
            </div>

            <div className="mt-8">
              <Button
                variant="escrow"
                size="lg"
                gradient
                className="hover:shadow-solana-lg text-lg px-8"
                rightIcon={<ArrowRight className="w-5 h-5" />}
                onClick={() => (window.location.href = '/app/create')}
              >
                Create First Escrow
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {filteredEscrows.map(escrow => (
              <div
                key={escrow.id}
                className="group relative p-8 rounded-3xl border border-border/30 bg-card/60 backdrop-blur-xl hover:bg-card/90 hover:border-primary/30 transition-all duration-500 hover:shadow-solana-lg hover-lift cursor-pointer"
              >
                {/* Enhanced gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-solana/8 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-accent/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-700" />

                <div className="relative z-10">
                  {/* Status badge */}
                  <div className="absolute -top-2 -right-2 flex items-center gap-2">
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-2xl backdrop-blur-sm border bg-success/10 border-success/20 text-success">
                      <span className="w-2.5 h-2.5 rounded-full animate-pulse bg-success" />
                      <span className="text-xs font-semibold">Available</span>
                    </div>
                  </div>

                  {/* Time remaining badge */}
                  <div className="absolute -top-2 -left-2 px-3 py-1.5 rounded-2xl bg-warning/15 border border-warning/20 text-warning text-xs font-bold backdrop-blur-sm">
                    <Clock className="w-3 h-3 inline mr-1" />
                    {escrow.timeRemaining.formatted}
                  </div>

                  {/* Main content */}
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

                    {/* Metadata */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground font-medium">
                          Maker
                        </span>
                        <span className="text-foreground font-semibold font-mono">
                          {escrow.account.maker.toBase58().slice(0, 8)}...
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

                  {/* Actions */}
                  <div className="flex gap-3">
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
                      className="flex-1 hover:bg-primary/10 hover:border-primary/40 group-hover:scale-[1.02] transition-all duration-300"
                      onClick={() =>
                        (window.location.href = `/app/escrow/${escrow.id}`)
                      }
                    >
                      View Details
                    </Button>
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
        title="Accept Trade"
      />
    </div>
  );
}
