import { useState, useEffect } from 'react';
import {
  ArrowUp,
  ArrowDown,
  TrendingUp,
  DollarSign,
  Activity,
  Clock,
  Target,
  BarChart3,
  Users,
} from 'lucide-react';
import { useEscrowProgram } from '@/hooks/useEscrowProgram';
import { useWalletUtils } from '@/hooks/useWalletUtils';

interface AnalyticsData {
  totalTrades: number;
  successRate: number;
  totalVolume: number;
  activeEscrows: number;
  avgDuration: number;
  bestRate: number;
}

interface ChartData {
  month: string;
  volume: number;
  trades: number;
}

interface TopToken {
  token: string;
  volume: number;
  percentage: number;
  change: number;
}

interface RecentActivity {
  action: string;
  token: string;
  amount: number;
  time: string;
}

export default function Analytics() {
  const { isConnected } = useEscrowProgram();
  const { connected } = useWalletUtils();

  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    totalTrades: 0,
    successRate: 0,
    totalVolume: 0,
    activeEscrows: 0,
    avgDuration: 0,
    bestRate: 0,
  });
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [topTokens, setTopTokens] = useState<TopToken[]>([]);
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState(false);

  // Load analytics data (in production, this would fetch from blockchain/program)
  const loadAnalyticsData = async () => {
    if (!isConnected) return;

    setLoading(true);
    try {
      // In production, this would:
      // 1. Fetch user's trading statistics from program accounts
      // 2. Calculate success rates, volumes, and performance metrics
      // 3. Aggregate historical data for charts
      // For now, show empty state as professional placeholder
      setAnalyticsData({
        totalTrades: 0,
        successRate: 0,
        totalVolume: 0,
        activeEscrows: 0,
        avgDuration: 0,
        bestRate: 0,
      });
      setChartData([]);
      setTopTokens([]);
      setRecentActivity([]);
    } catch (error) {
      console.error('Failed to load analytics data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isConnected) {
      loadAnalyticsData();
    } else {
      // Reset data when wallet disconnects
      setAnalyticsData({
        totalTrades: 0,
        successRate: 0,
        totalVolume: 0,
        activeEscrows: 0,
        avgDuration: 0,
        bestRate: 0,
      });
      setChartData([]);
      setTopTokens([]);
      setRecentActivity([]);
    }
  }, [isConnected]);

  // Only show chart if there is data
  const maxVolume =
    chartData.length > 0 ? Math.max(...chartData.map(d => d.volume)) : 1;

  return (
    <div className="py-8 px-4">
      <div className="relative max-w-[90%] lg:max-w-[70%] mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
            Analytics
          </h1>
        </div>

        {/* Stats Grid - Enhanced with beautiful design */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {/* Total Trades */}
          <div className="group relative p-8 rounded-3xl border border-border/30 bg-card/60 backdrop-blur-xl hover:bg-card/90 hover:border-primary/30 transition-all duration-500 hover:shadow-solana-lg hover-lift">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-primary/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500" />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className="p-3 bg-primary/15 rounded-2xl shadow-lg">
                  <Activity className="w-7 h-7 text-primary" />
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-success/10 border border-success/20 text-success">
                  <ArrowUp className="w-3.5 h-3.5" />
                  <span className="text-sm font-semibold">+12%</span>
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-3xl font-bold text-gradient-solana">
                  {analyticsData.totalTrades}
                </h3>
                <p className="text-muted-foreground font-medium">
                  Total Trades
                </p>
              </div>
            </div>
          </div>

          {/* Success Rate */}
          <div className="group relative p-8 rounded-3xl border border-border/30 bg-card/60 backdrop-blur-xl hover:bg-card/90 hover:border-success/30 transition-all duration-500 hover:shadow-solana-lg hover-lift">
            <div className="absolute inset-0 bg-gradient-to-br from-success/8 via-transparent to-success/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500" />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className="p-3 bg-success/15 rounded-2xl shadow-lg">
                  <Target className="w-7 h-7 text-success" />
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-success/10 border border-success/20 text-success">
                  <ArrowUp className="w-3.5 h-3.5" />
                  <span className="text-sm font-semibold">+2%</span>
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-3xl font-bold text-gradient-solana">
                  {analyticsData.successRate}%
                </h3>
                <p className="text-muted-foreground font-medium">
                  Success Rate
                </p>
              </div>
            </div>
          </div>

          {/* Total Volume */}
          <div className="group relative p-8 rounded-3xl border border-border/30 bg-card/60 backdrop-blur-xl hover:bg-card/90 hover:border-accent/30 transition-all duration-500 hover:shadow-solana-lg hover-lift">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/8 via-transparent to-accent/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500" />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className="p-3 bg-accent/15 rounded-2xl shadow-lg">
                  <DollarSign className="w-7 h-7 text-accent" />
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-success/10 border border-success/20 text-success">
                  <ArrowUp className="w-3.5 h-3.5" />
                  <span className="text-sm font-semibold">+18%</span>
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-3xl font-bold text-gradient-solana">
                  {analyticsData.totalVolume.toLocaleString()} USDC
                </h3>
                <p className="text-muted-foreground font-medium">
                  Total Volume
                </p>
              </div>
            </div>
          </div>

          {/* Active Escrows */}
          <div className="group relative p-8 rounded-3xl border border-border/30 bg-card/60 backdrop-blur-xl hover:bg-card/90 hover:border-warning/30 transition-all duration-500 hover:shadow-solana-lg hover-lift">
            <div className="absolute inset-0 bg-gradient-to-br from-warning/8 via-transparent to-warning/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500" />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className="p-3 bg-warning/15 rounded-2xl shadow-lg">
                  <Clock className="w-7 h-7 text-warning" />
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-muted/10 border border-muted/20 text-muted-foreground">
                  <span className="text-sm font-semibold">Current</span>
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-3xl font-bold text-gradient-solana">
                  {analyticsData.activeEscrows}
                </h3>
                <p className="text-muted-foreground font-medium">
                  Active Escrows
                </p>
              </div>
            </div>
          </div>

          {/* Average Duration */}
          <div className="group relative p-8 rounded-3xl border border-border/30 bg-card/60 backdrop-blur-xl hover:bg-card/90 hover:border-solana/30 transition-all duration-500 hover:shadow-solana-lg hover-lift">
            <div className="absolute inset-0 bg-gradient-to-br from-solana/8 via-transparent to-solana/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500" />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className="p-3 bg-solana/15 rounded-2xl shadow-lg">
                  <Clock className="w-7 h-7 text-solana" />
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-destructive/10 border border-destructive/20 text-destructive">
                  <ArrowDown className="w-3.5 h-3.5" />
                  <span className="text-sm font-semibold">-5%</span>
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-3xl font-bold text-gradient-solana">
                  {analyticsData.avgDuration}h
                </h3>
                <p className="text-muted-foreground font-medium">
                  Avg. Duration
                </p>
              </div>
            </div>
          </div>

          {/* Best Rate */}
          <div className="group relative p-8 rounded-3xl border border-border/30 bg-card/60 backdrop-blur-xl hover:bg-card/90 hover:border-primary/30 transition-all duration-500 hover:shadow-solana-lg hover-lift">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-primary/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500" />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className="p-3 bg-primary/15 rounded-2xl shadow-lg">
                  <TrendingUp className="w-7 h-7 text-primary" />
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-success/10 border border-success/20 text-success">
                  <ArrowUp className="w-3.5 h-3.5" />
                  <span className="text-sm font-semibold">+8%</span>
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-3xl font-bold text-gradient-solana">
                  {analyticsData.bestRate} SOL/USDC
                </h3>
                <p className="text-muted-foreground font-medium">Best Rate</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Volume Chart */}
          <div className="lg:col-span-2 bg-card/60 rounded-2xl shadow-lg border border-border/50 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-foreground">
                Trading Volume
              </h3>
              <div className="flex items-center gap-2 text-sm text-success">
                <TrendingUp className="w-4 h-4" />
                <span>+24% this month</span>
              </div>
            </div>

            {/* Chart */}
            <div className="relative h-64">
              {chartData.length === 0 ? (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  <div className="text-center">
                    <BarChart3 className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p className="text-sm">
                      {!isConnected
                        ? 'Connect wallet to view chart'
                        : 'No chart data available'}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="absolute inset-0 flex items-end justify-between gap-4 px-2">
                  {chartData.map((data, index) => (
                    <div
                      key={data.month}
                      className="flex flex-col items-center flex-1"
                    >
                      <div className="w-full flex flex-col items-center mb-2">
                        <div
                          className="w-full bg-gradient-to-t from-primary/20 to-primary/40 rounded-t-lg relative group cursor-pointer transition-all hover:from-primary/30 hover:to-primary/60"
                          style={{
                            height: `${(data.volume / maxVolume) * 200}px`,
                            minHeight: '20px',
                          }}
                        >
                          {/* Tooltip */}
                          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-foreground text-background text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            {data.volume.toLocaleString()} USDC
                            <br />
                            {data.trades} trades
                          </div>
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground font-medium">
                        {data.month}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Chart Labels */}
            <div className="flex items-center justify-between text-xs text-muted-foreground mt-4 px-2">
              <span>Volume (USDC)</span>
              <span>Last 6 months</span>
            </div>
          </div>

          {/* Top Tokens */}
          <div className="bg-card/60 rounded-2xl shadow-lg border border-border/50 p-6">
            <h3 className="text-lg font-semibold text-foreground mb-6">
              Top Tokens
            </h3>
            <div className="space-y-4">
              {topTokens.length === 0 ? (
                <div className="flex items-center justify-center py-8 text-muted-foreground">
                  <div className="text-center">
                    <Users className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p className="text-sm">
                      {!isConnected
                        ? 'Connect wallet to view tokens'
                        : 'No token data available'}
                    </p>
                  </div>
                </div>
              ) : (
                topTokens.map((token, index) => (
                  <div
                    key={token.token}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-solana rounded-full flex items-center justify-center text-white text-xs font-bold">
                        {token.token.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium text-foreground">
                          {token.token}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {token.volume.toLocaleString()} USDC
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-foreground">
                        {token.percentage}%
                      </div>
                      <div
                        className={`text-xs flex items-center gap-1 ${
                          token.change > 0 ? 'text-success' : 'text-destructive'
                        }`}
                      >
                        {token.change > 0 ? (
                          <ArrowUp className="w-3 h-3" />
                        ) : (
                          <ArrowDown className="w-3 h-3" />
                        )}
                        {Math.abs(token.change)}%
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-8 bg-card/60 rounded-2xl shadow-lg border border-border/50 p-6">
          <h3 className="text-lg font-semibold text-foreground mb-6">
            Recent Activity
          </h3>
          <div className="space-y-4">
            {recentActivity.length === 0 ? (
              <div className="flex items-center justify-center py-8 text-muted-foreground">
                <div className="text-center">
                  <Activity className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p className="text-sm">
                    {!isConnected
                      ? 'Connect wallet to view activity'
                      : 'No recent activity'}
                  </p>
                </div>
              </div>
            ) : (
              recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-3 border-b border-border/30 last:border-b-0"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                      <Activity className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium text-foreground">
                        {activity.action}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {activity.token}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-foreground">
                      {activity.amount}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {activity.time}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
