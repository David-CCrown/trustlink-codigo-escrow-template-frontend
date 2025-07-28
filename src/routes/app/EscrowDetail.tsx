import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Calendar,
  CheckCircle,
  Clock,
  Copy,
  Link2,
  Lock,
  Share2,
  User,
  XCircle,
} from 'lucide-react';

const escrow = {
  id: 'AB7x9K2m',
  status: 'Active',
  statusColor: 'bg-green-500',
  offer: { amount: 100, token: 'USDC' },
  request: { amount: 5.25, token: 'SOL' },
  rate: '1 USDC = 0.0525 SOL',
  created: 'March 15, 2024 at 2:30 PM',
  expires: 'March 16, 2024 at 2:30 PM (22h remaining)',
  maker: '7x8kJ2...Pm9mP2 (You)',
  statusText: 'Awaiting counterparty',
  mutable: true,
  private: false,
  terms: [
    'Counterparty must provide exactly 5.25 SOL',
    'Trade will auto-execute upon acceptance',
    'Escrow can be cancelled before acceptance',
    'Network fees: ~0.001 SOL',
  ],
  timeline: [
    { label: 'Created', icon: CheckCircle, time: '2:30 PM', done: true },
    {
      label: 'Awaiting counterparty',
      icon: Clock,
      time: 'Current',
      done: false,
    },
    {
      label: 'Auto-execute',
      icon: BadgeCheck,
      time: 'When accepted',
      done: false,
    },
    { label: 'Settlement', icon: Lock, time: 'After execution', done: false },
  ],
};

export default function EscrowDetail() {
  return (
    <div className="py-12 px-4">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-2">
          <a
            href="/app"
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Active
          </a>
          <span className="ml-auto flex items-center gap-2">
            <span className="text-lg font-bold text-foreground">
              Escrow #{escrow.id}
            </span>
            <span
              className={`flex items-center gap-1 px-3 py-1 rounded-full ${escrow.statusColor} bg-opacity-10 text-sm font-semibold text-foreground`}
            >
              <span
                className={`w-2 h-2 rounded-full ${escrow.statusColor} animate-pulse`}
              />
              {escrow.status}
            </span>
          </span>
        </div>
        {/* Main Card: Escrow Overview */}
        <section className="bg-card/60 rounded-2xl shadow-lg p-8 border border-border/50 space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl font-bold text-foreground">
              {escrow.offer.amount} {escrow.offer.token}
            </span>
            <ArrowRight className="w-6 h-6 text-primary" />
            <span className="text-2xl font-bold text-foreground">
              {escrow.request.amount} {escrow.request.token}
            </span>
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-2">
            <span>
              <b>Exchange Rate:</b> {escrow.rate}
            </span>
            <span>
              <b>Created:</b> {escrow.created}
            </span>
            <span>
              <b>Expires:</b> {escrow.expires}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <User className="w-4 h-4" />
            <span>
              <b>Maker:</b> {escrow.maker}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <span>
              <b>Status:</b> {escrow.statusText}
            </span>
          </div>
          <div className="flex gap-2 mt-2">
            {escrow.mutable && (
              <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold">
                Mutable
              </span>
            )}
            {escrow.private && (
              <span className="px-3 py-1 rounded-full bg-muted/10 text-muted-foreground text-xs font-semibold">
                Private
              </span>
            )}
          </div>
        </section>
        {/* Terms & Conditions */}
        <section className="bg-card/40 rounded-2xl shadow-md p-6 border border-border/30">
          <h3 className="text-lg font-semibold text-foreground mb-3">
            Terms & Conditions
          </h3>
          <ul className="list-disc pl-6 text-sm text-muted-foreground space-y-1">
            {escrow.terms.map((term, i) => (
              <li key={i}>{term}</li>
            ))}
          </ul>
        </section>
        {/* Actions */}
        <div className="flex flex-wrap gap-3">
          <button className="px-4 py-2 rounded-lg border border-primary text-primary font-medium hover:bg-primary/10 transition-all text-sm flex items-center gap-2">
            Update Terms
          </button>
          <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-primary to-solana text-white font-medium hover:shadow-lg transition-all text-sm flex items-center gap-2">
            Cancel Escrow
          </button>
          <button className="px-4 py-2 rounded-lg border border-border text-muted-foreground font-medium hover:bg-muted/10 transition-all text-sm flex items-center gap-2">
            <Share2 className="w-4 h-4" /> Share Link
          </button>
          <button className="px-4 py-2 rounded-lg border border-border text-muted-foreground font-medium hover:bg-muted/10 transition-all text-sm flex items-center gap-2">
            <Copy className="w-4 h-4" /> Copy ID
          </button>
        </div>
        {/* Timeline Section */}
        <section className="bg-card/30 rounded-2xl shadow p-6 border border-border/20">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Transaction Timeline
          </h3>
          <div className="flex flex-col md:flex-row gap-6 md:gap-0 md:items-center md:justify-between">
            {escrow.timeline.map((step, i) => (
              <div key={i} className="flex flex-col items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${step.done ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'}`}
                >
                  <step.icon className="w-6 h-6" />
                </div>
                <span
                  className={`text-sm font-medium ${step.done ? 'text-primary' : 'text-muted-foreground'}`}
                >
                  {step.label}
                </span>
                <span className="text-xs text-muted-foreground">
                  {step.time}
                </span>
                {i < escrow.timeline.length - 1 && (
                  <div className="hidden md:block h-1 w-full bg-gradient-to-r from-primary/20 via-accent/20 to-solana/20 my-2" />
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
