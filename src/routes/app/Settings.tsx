import { useState } from 'react';
import {
  Bell,
  Copy,
  ExternalLink,
  LogOut,
  Save,
  Shield,
  User,
  Wallet,
  Sun,
} from 'lucide-react';
import Select from '../../components/ui/Select';
import Input from '../../components/ui/Input';

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    escrowAccepted: true,
    escrowExpires: true,
    newOpportunities: false,
    transactionConfirmations: true,
  });

  const [preferences, setPreferences] = useState({
    defaultDuration: '24 hours',
    autoAcceptSimilarRates: false,
    minimumTradeValue: '1',
    darkMode: false,
  });

  const [isSaving, setIsSaving] = useState(false);

  // Mock wallet data
  const walletInfo = {
    address: '7x8kJ2mLpQn9xK2vR8sPm9mP2',
    fullAddress: '7x8kJ2mLpQn9xK2vR8sPm9mP2kL3nM4oP5qR',
    provider: 'Phantom Wallet',
    balance: '12.45',
  };

  const handleSaveSettings = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    // In a real app, show success notification
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(walletInfo.fullAddress);
    // In a real app, show success toast
  };

  return (
    <div className="py-8 px-4">
      <div className="relative max-w-[90%] lg:max-w-[70%] mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
            Settings
          </h1>
        </div>

        <div className="space-y-8">
          {/* Wallet Profile */}
          <section className="bg-card/60 rounded-2xl shadow-lg border border-border/50 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-primary/10 rounded-xl">
                <Wallet className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-xl font-semibold text-foreground">
                Wallet Profile
              </h2>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4 p-4 bg-muted/20 rounded-xl">
                <div className="w-12 h-12 bg-gradient-solana rounded-full flex items-center justify-center">
                  <div className="w-5 h-5 bg-white rounded-full" />
                </div>
                <div className="flex-1">
                  <div className="font-mono text-foreground text-lg">
                    {walletInfo.address}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Connected via {walletInfo.provider}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Balance: {walletInfo.balance} SOL
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={copyAddress}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border bg-background hover:bg-muted/50 text-foreground font-medium transition-all text-sm"
                >
                  <Copy className="w-4 h-4" />
                  Copy Address
                </button>
                <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border bg-background hover:bg-muted/50 text-foreground font-medium transition-all text-sm">
                  <ExternalLink className="w-4 h-4" />
                  View on Explorer
                </button>
                <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-destructive text-destructive hover:bg-destructive/10 font-medium transition-all text-sm">
                  <LogOut className="w-4 h-4" />
                  Disconnect
                </button>
              </div>
            </div>
          </section>

          {/* Notifications */}
          <section className="bg-card/60 rounded-2xl shadow-lg border border-border/50 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-accent/10 rounded-xl">
                <Bell className="w-6 h-6 text-accent" />
              </div>
              <h2 className="text-xl font-semibold text-foreground">
                Notifications
              </h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-foreground">
                    Escrow accepted
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Get notified when someone accepts your escrow
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications.escrowAccepted}
                    onChange={e =>
                      setNotifications({
                        ...notifications,
                        escrowAccepted: e.target.checked,
                      })
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-foreground">
                    Escrow expires in 1 hour
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Get reminded before your escrows expire
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications.escrowExpires}
                    onChange={e =>
                      setNotifications({
                        ...notifications,
                        escrowExpires: e.target.checked,
                      })
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-foreground">
                    New escrow opportunities
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Get notified about relevant trading opportunities
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications.newOpportunities}
                    onChange={e =>
                      setNotifications({
                        ...notifications,
                        newOpportunities: e.target.checked,
                      })
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-foreground">
                    Transaction confirmations
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Get notified when transactions are confirmed on-chain
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications.transactionConfirmations}
                    onChange={e =>
                      setNotifications({
                        ...notifications,
                        transactionConfirmations: e.target.checked,
                      })
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>
          </section>

          {/* Trading Preferences */}
          <section className="bg-card/60 rounded-2xl shadow-lg border border-border/50 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-success/10 rounded-xl">
                <User className="w-6 h-6 text-success" />
              </div>
              <h2 className="text-xl font-semibold text-foreground">
                Trading Preferences
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Default Duration
                </label>
                <Select
                  value={preferences.defaultDuration}
                  onChange={value =>
                    setPreferences({
                      ...preferences,
                      defaultDuration: value,
                    })
                  }
                  options={[
                    { value: '12 hours', label: '12 hours' },
                    { value: '24 hours', label: '24 hours' },
                    { value: '48 hours', label: '48 hours' },
                    { value: '72 hours', label: '72 hours' },
                    { value: '1 week', label: '1 week' },
                  ]}
                />
              </div>

              <div>
                <Input
                  type="number"
                  min="0"
                  step="0.1"
                  value={preferences.minimumTradeValue}
                  onChange={e =>
                    setPreferences({
                      ...preferences,
                      minimumTradeValue: e.target.value,
                    })
                  }
                  placeholder="1.0"
                  label="Minimum trade value (SOL)"
                />
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-foreground">
                    Auto-accept similar rates
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Automatically accept trades with rates similar to your
                    recent trades
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={preferences.autoAcceptSimilarRates}
                    onChange={e =>
                      setPreferences({
                        ...preferences,
                        autoAcceptSimilarRates: e.target.checked,
                      })
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>
          </section>

          {/* Appearance */}
          <section className="bg-card/60 rounded-2xl shadow-lg border border-border/50 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-warning/10 rounded-xl">
                <Sun className="w-6 h-6 text-warning" />
              </div>
              <h2 className="text-xl font-semibold text-foreground">
                Appearance
              </h2>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-foreground">Dark mode</div>
                <div className="text-sm text-muted-foreground">
                  Switch between light and dark themes
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={preferences.darkMode}
                  onChange={e =>
                    setPreferences({
                      ...preferences,
                      darkMode: e.target.checked,
                    })
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          </section>

          {/* Security */}
          <section className="bg-card/60 rounded-2xl shadow-lg border border-border/50 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-destructive/10 rounded-xl">
                <Shield className="w-6 h-6 text-destructive" />
              </div>
              <h2 className="text-xl font-semibold text-foreground">
                Security
              </h2>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-primary/5 border border-primary/10 rounded-xl">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      Your tokens are secure
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      All escrow funds are held in program-controlled vaults
                      with no admin keys. Your tokens can only be released by
                      the smart contract logic.
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border bg-background hover:bg-muted/50 text-foreground font-medium transition-all text-sm">
                  <ExternalLink className="w-4 h-4" />
                  View Audit Report
                </button>
                <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border bg-background hover:bg-muted/50 text-foreground font-medium transition-all text-sm">
                  Program ID: ESC123...
                </button>
              </div>
            </div>
          </section>

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              onClick={handleSaveSettings}
              disabled={isSaving}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-solana text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isSaving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Save Settings
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
