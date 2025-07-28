import { useState, useEffect } from 'react';
import {
  ArrowRight,
  CheckCircle,
  Download,
  ExternalLink,
  Filter,
  XCircle,
  Clock,
  TrendingUp,
} from 'lucide-react';
import { useEscrowProgram } from '../../hooks/useEscrowProgram';
import Select from '../../components/ui/Select';

interface TransactionHistory {
  id: string;
  date: string;
  type: 'Created' | 'Completed' | 'Cancelled' | 'Accepted';
  offer: { amount: string; token: string };
  request: { amount: string; token: string };
  counterparty: string;
  status: 'Active' | 'Success' | 'Cancelled' | 'Expired';
  statusIcon: 'pending' | 'success' | 'cancelled';
  txId: string;
  block: string;
  gasFee: string;
}

const statusColors = {
  pending: 'text-yellow-500',
  success: 'text-success',
  cancelled: 'text-muted-foreground',
};

const statusIcons = {
  pending: () => (
    <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
  ),
  success: () => <CheckCircle className="w-4 h-4 text-success" />,
  cancelled: () => <XCircle className="w-4 h-4 text-muted-foreground" />,
};

export default function History() {
  const { isConnected } = useEscrowProgram();

  const [selectedFilters, setSelectedFilters] = useState({
    status: 'All Status',
    token: 'All Tokens',
    period: 'Last 30 days',
  });
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [transactions, setTransactions] = useState<TransactionHistory[]>([]);

  // Load transaction history (in production, this would fetch from blockchain/program)
  const loadTransactionHistory = async () => {
    if (!isConnected) return;

    try {
      // In production, this would:
      // 1. Fetch all user's historical escrow transactions
      // 2. Parse transaction logs from blockchain
      // 3. Combine with program account history
      // For now, show empty state as professional placeholder
      setTransactions([]);
    } catch (error) {
      console.error('Failed to load transaction history:', error);
    }
  };

  useEffect(() => {
    if (isConnected) {
      loadTransactionHistory();
    } else {
      setTransactions([]);
    }
  }, [isConnected]);

  const toggleRowExpansion = (id: string) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  return (
    <div className="py-12 px-4">
      <div className="relative max-w-[90%] lg:max-w-[70%] mx-auto">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
              Transaction History
            </h1>
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border bg-card/50 hover:bg-card/80 text-foreground font-medium transition-all text-sm">
              <Download className="w-4 h-4" />
              Export CSV
            </button>
          </div>

          {/* Filter Bar */}
          <div className="flex flex-wrap gap-4 mb-8 p-4 bg-card/40 rounded-xl border border-border/30">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground">
                Filters:
              </span>
            </div>
            <Select
              value={selectedFilters.status}
              onChange={value =>
                setSelectedFilters({
                  ...selectedFilters,
                  status: value,
                })
              }
              size="sm"
              options={[
                { value: 'All Status', label: 'All Status' },
                { value: 'Active', label: 'Active' },
                { value: 'Completed', label: 'Completed' },
                { value: 'Cancelled', label: 'Cancelled' },
              ]}
            />
            <Select
              value={selectedFilters.token}
              onChange={value =>
                setSelectedFilters({
                  ...selectedFilters,
                  token: value,
                })
              }
              size="sm"
              options={[
                { value: 'All Tokens', label: 'All Tokens' },
                { value: 'SOL', label: 'SOL' },
                { value: 'USDC', label: 'USDC' },
                { value: 'BONK', label: 'BONK' },
                { value: 'ETH', label: 'ETH' },
              ]}
            />
            <Select
              value={selectedFilters.period}
              onChange={value =>
                setSelectedFilters({
                  ...selectedFilters,
                  period: value,
                })
              }
              size="sm"
              options={[
                { value: 'Last 30 days', label: 'Last 30 days' },
                { value: 'Last 7 days', label: 'Last 7 days' },
                { value: 'Last 90 days', label: 'Last 90 days' },
                { value: 'All time', label: 'All time' },
              ]}
            />
          </div>

          {/* History Table */}
          <div className="bg-card/60 rounded-2xl shadow-lg border border-border/50 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/20 border-b border-border">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">
                      Date
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">
                      Type
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">
                      Tokens
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">
                      Counterparty
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">
                      Status
                    </th>
                    <th className="px-6 py-4 w-12"></th>
                  </tr>
                </thead>
                <tbody>
                  {!isConnected ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-16 text-center">
                        <div className="flex flex-col items-center justify-center">
                          <Clock className="w-12 h-12 text-muted-foreground mb-4" />
                          <h3 className="text-lg font-semibold text-foreground mb-2">
                            Connect Your Wallet
                          </h3>
                          <p className="text-muted-foreground">
                            Connect your wallet to view your transaction
                            history.
                          </p>
                        </div>
                      </td>
                    </tr>
                  ) : transactions.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-16 text-center">
                        <div className="flex flex-col items-center justify-center">
                          <TrendingUp className="w-12 h-12 text-muted-foreground mb-4" />
                          <h3 className="text-lg font-semibold text-foreground mb-2">
                            No Transaction History
                          </h3>
                          <p className="text-muted-foreground">
                            Your completed trades will appear here once you
                            start trading.
                          </p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    transactions.map((transaction, index) => (
                      <>
                        <tr
                          key={transaction.id}
                          className={`border-b border-border/30 hover:bg-muted/10 transition-colors cursor-pointer ${
                            index % 2 === 0 ? 'bg-background/50' : 'bg-muted/5'
                          }`}
                          onClick={() => toggleRowExpansion(transaction.id)}
                        >
                          <td className="px-6 py-4 text-sm text-foreground">
                            {transaction.date}
                          </td>
                          <td className="px-6 py-4 text-sm text-foreground font-medium">
                            {transaction.type}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2 text-sm">
                              <span className="font-medium text-foreground">
                                {transaction.offer.amount}{' '}
                                {transaction.offer.token}
                              </span>
                              <ArrowRight className="w-3 h-3 text-primary" />
                              <span className="font-medium text-foreground">
                                {transaction.request.amount}{' '}
                                {transaction.request.token}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-muted-foreground font-mono">
                            {transaction.counterparty}
                          </td>
                          <td className="px-6 py-4">
                            <div
                              className={`flex items-center gap-2 text-sm font-medium ${statusColors[transaction.statusIcon as keyof typeof statusColors]}`}
                            >
                              {statusIcons[
                                transaction.statusIcon as keyof typeof statusIcons
                              ]()}
                              {transaction.status}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div
                              className={`transform transition-transform ${expandedRow === transaction.id ? 'rotate-180' : ''}`}
                            >
                              <svg
                                className="w-4 h-4 text-muted-foreground"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 9l-7 7-7-7"
                                />
                              </svg>
                            </div>
                          </td>
                        </tr>
                        {/* Expandable Row Details */}
                        {expandedRow === transaction.id && (
                          <tr>
                            <td
                              colSpan={6}
                              className="px-6 py-4 bg-muted/5 border-b border-border/30"
                            >
                              <div className="bg-card/40 rounded-xl p-4 space-y-3">
                                <h4 className="text-sm font-semibold text-foreground mb-3">
                                  Transaction Details
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                  <div>
                                    <span className="text-muted-foreground">
                                      Transaction ID:
                                    </span>
                                    <div className="font-mono text-foreground mt-1">
                                      {transaction.txId}
                                    </div>
                                  </div>
                                  <div>
                                    <span className="text-muted-foreground">
                                      Block:
                                    </span>
                                    <div className="font-mono text-foreground mt-1">
                                      {transaction.block}
                                    </div>
                                  </div>
                                  <div>
                                    <span className="text-muted-foreground">
                                      Gas Fee:
                                    </span>
                                    <div className="font-mono text-foreground mt-1">
                                      {transaction.gasFee} SOL
                                    </div>
                                  </div>
                                </div>
                                <div className="flex gap-3 mt-4">
                                  <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-primary text-primary font-medium hover:bg-primary/10 transition-all text-sm">
                                    <ExternalLink className="w-4 h-4" />
                                    View on Solscan
                                  </button>
                                  <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-muted-foreground font-medium hover:bg-muted/10 transition-all text-sm">
                                    Share Link
                                  </button>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
