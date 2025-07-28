import { useState, useMemo } from 'react';
import { ArrowRight, Info, AlertTriangle } from 'lucide-react';
import Button from '../../components/ui/Button';
import TransactionModal from '@/components/ui/TransactionModal';
import Select from '../../components/ui/Select';
import Input from '../../components/ui/Input';
import { useEscrowProgram } from '@/hooks/useEscrowProgram';
import { calculateExchangeRate, parseTokenAmount } from '@/lib/program';

const durations = [
  { label: '12 hours', hours: 12 },
  { label: '24 hours', hours: 24 },
  { label: '48 hours', hours: 48 },
  { label: '72 hours', hours: 72 },
  { label: '1 week', hours: 168 },
];

export default function CreateEscrow() {
  const {
    createEscrow,
    transactionState,
    resetTransactionState,
    getAvailableTokens,
    isConnected,
  } = useEscrowProgram();

  const [offerToken, setOfferToken] = useState('USDC');
  const [offerAmount, setOfferAmount] = useState('100.00');
  const [requestToken, setRequestToken] = useState('SOL');
  const [requestAmount, setRequestAmount] = useState('5.25');
  const [durationIndex, setDurationIndex] = useState(1); // 24 hours default
  const [allowUpdates, setAllowUpdates] = useState(true);
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const availableTokens = getAvailableTokens();
  const selectedDuration = durations[durationIndex];

  // Get token info
  const offerTokenInfo = useMemo(() => {
    return (
      availableTokens.find(t => t.symbol === offerToken) || availableTokens[0]
    );
  }, [offerToken, availableTokens]);

  const requestTokenInfo = useMemo(() => {
    return (
      availableTokens.find(t => t.symbol === requestToken) || availableTokens[1]
    );
  }, [requestToken, availableTokens]);

  // Calculate exchange rate
  const exchangeRate = useMemo(() => {
    if (!offerAmount || !requestAmount || !offerTokenInfo || !requestTokenInfo)
      return 0;

    try {
      const offerAmountBN = parseTokenAmount(
        offerAmount,
        offerTokenInfo.decimals
      );
      const requestAmountBN = parseTokenAmount(
        requestAmount,
        requestTokenInfo.decimals
      );
      return calculateExchangeRate(
        offerAmountBN,
        offerTokenInfo.decimals,
        requestAmountBN,
        requestTokenInfo.decimals
      );
    } catch {
      return 0;
    }
  }, [offerAmount, requestAmount, offerTokenInfo, requestTokenInfo]);

  // Validation
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!offerAmount || parseFloat(offerAmount) <= 0) {
      newErrors.offerAmount = 'Offer amount must be greater than 0';
    }

    if (!requestAmount || parseFloat(requestAmount) <= 0) {
      newErrors.requestAmount = 'Request amount must be greater than 0';
    }

    if (offerToken === requestToken) {
      newErrors.tokens = 'Offer and request tokens must be different';
    }

    if (!isConnected) {
      newErrors.wallet = 'Please connect your wallet';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setShowTransactionModal(true);

      const result = await createEscrow({
        makerTokenMint: offerTokenInfo.mint,
        makerTokenAmount: offerAmount,
        takerTokenMint: requestTokenInfo.mint,
        takerTokenAmount: requestAmount,
        durationHours: selectedDuration.hours,
        isMutable: allowUpdates,
      });

      if (result) {
        // Reset form on success
        setOfferAmount('100.00');
        setRequestAmount('5.25');
        setAllowUpdates(true);
        setDurationIndex(1);
      }
    } catch (error) {
      console.error('Failed to create escrow:', error);
    }
  };

  const handleCloseModal = () => {
    setShowTransactionModal(false);
    resetTransactionState();
  };

  return (
    <div className="py-12 px-4">
      <div className="relative max-w-[90%] lg:max-w-[70%] mx-auto">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-12">
          {/* Left Panel: Form */}
          <section className="md:col-span-3 bg-card/60 rounded-2xl shadow-lg p-8 border border-border/50">
            <h2 className="text-2xl font-bold text-foreground mb-8">
              Create New Escrow
            </h2>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Validation Errors */}
              {Object.keys(errors).length > 0 && (
                <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-4 h-4 text-destructive" />
                    <span className="text-sm font-medium text-destructive">
                      Please fix the following errors:
                    </span>
                  </div>
                  <ul className="text-sm text-destructive space-y-1">
                    {Object.values(errors).map((error, index) => (
                      <li key={index}>• {error}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* You Offer */}
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  You Offer
                </label>
                <div className="flex gap-4">
                  {/* Token Dropdown */}
                  <div className="w-40">
                    <Select
                      value={offerToken}
                      onChange={value => setOfferToken(value)}
                      options={availableTokens.map(token => ({
                        value: token.symbol,
                        label: token.symbol,
                      }))}
                    />
                  </div>
                  {/* Amount Input */}
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    value={offerAmount}
                    onChange={e => setOfferAmount(e.target.value)}
                    placeholder="Amount"
                    variant={errors.offerAmount ? 'error' : 'default'}
                    error={errors.offerAmount}
                    className="flex-1"
                  />
                </div>
              </div>
              {/* You Request */}
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  You Request
                </label>
                <div className="flex gap-4">
                  {/* Token Dropdown */}
                  <div className="w-40">
                    <Select
                      value={requestToken}
                      onChange={value => setRequestToken(value)}
                      options={availableTokens.map(token => ({
                        value: token.symbol,
                        label: token.symbol,
                      }))}
                    />
                  </div>
                  {/* Amount Input */}
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    value={requestAmount}
                    onChange={e => setRequestAmount(e.target.value)}
                    placeholder="Amount"
                    variant={errors.requestAmount ? 'error' : 'default'}
                    error={errors.requestAmount}
                    className="flex-1"
                  />
                </div>
              </div>
              {/* Duration & Options */}
              <div className="flex gap-4">
                {/* Duration Dropdown */}
                <div className="w-40">
                  <Select
                    label="Duration"
                    value={durationIndex.toString()}
                    onChange={value => setDurationIndex(parseInt(value))}
                    options={durations.map((duration, index) => ({
                      value: index.toString(),
                      label: duration.label,
                    }))}
                  />
                </div>
                {/* Allow Updates Checkbox */}
                <div className="flex items-end pb-1">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={allowUpdates}
                      onChange={e => setAllowUpdates(e.target.checked)}
                      className="w-5 h-5 rounded border border-border text-primary focus:ring-primary/20 focus:border-primary/40 transition-all"
                    />
                    <span className="text-sm font-medium text-muted-foreground">
                      Allow updates
                    </span>
                  </label>
                </div>
              </div>
              {/* Create Button */}
              <Button
                type="submit"
                variant="escrow"
                size="lg"
                gradient
                fullWidth
                className="mt-4 text-lg"
                rightIcon={<ArrowRight className="w-5 h-5" />}
              >
                Create Escrow
              </Button>
            </form>
          </section>
          {/* Right Panel: Preview */}
          <aside className="md:col-span-2 bg-card/40 rounded-2xl shadow-md p-8 border border-border/30 flex flex-col gap-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Transaction Preview
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Exchange Rate</span>
                <span className="font-medium text-foreground">
                  1 {offerToken} ={' '}
                  {(
                    parseFloat(requestAmount) / parseFloat(offerAmount)
                  ).toFixed(4)}{' '}
                  {requestToken}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Network Fee</span>
                <span className="font-medium text-foreground">~0.001 SOL</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  Your tokens will be locked for:
                </span>
                <span className="font-medium text-foreground">
                  {selectedDuration.label}
                </span>
              </div>
              <div className="flex items-start gap-2 bg-primary/5 border border-primary/10 rounded-lg p-4 mt-4">
                <Info className="w-5 h-5 text-primary mt-0.5" />
                <span className="text-sm text-muted-foreground">
                  <b>Your {offerToken}</b> will be held in a secure program
                  vault until the trade is completed.
                </span>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Transaction Modal */}
      <TransactionModal
        isOpen={showTransactionModal}
        onClose={handleCloseModal}
        transactionState={transactionState}
        title="Create Escrow"
      />
    </div>
  );
}
