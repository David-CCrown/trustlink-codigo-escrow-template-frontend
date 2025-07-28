import { ArrowRight, Sparkles, Shield, TrendingUp, Users, ZapIcon } from 'lucide-react';
import Button from './ui/Button';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useWalletUtils } from '../hooks/useWalletUtils';
import { WalletModal } from './wallet/WalletModal';
import ComingSoonModal from './reusables/ComingSoonModal';

const Hero = () => {
  const navigate = useNavigate();
  const { connected } = useWalletUtils();
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [isComingSoonModalOpen, setIsComingSoonModalOpen] = useState(false);

  const handleStartEscrow = () => {
    if (connected) {
      navigate('/app/create');
    } else {
      setIsWalletModalOpen(true);
    }
  };

  const handleExploreFeatures = () => {
    setIsComingSoonModalOpen(true);
  };

  return (
    <>
      {/* Hero Section with animated background */}
      <section className="relative pt-8 pb-20 px-4 min-h-screen flex items-center">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/10 to-solana/5 animate-pulse" />
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-primary/5 to-accent/10 opacity-50" />
        
        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-2 h-2 bg-primary/30 rounded-full animate-bounce" style={{animationDelay: '0s'}} />
        <div className="absolute top-32 right-20 w-3 h-3 bg-accent/40 rounded-full animate-bounce" style={{animationDelay: '0.5s'}} />
        <div className="absolute bottom-40 left-1/4 w-1 h-1 bg-solana/50 rounded-full animate-bounce" style={{animationDelay: '1s'}} />
        <div className="absolute bottom-60 right-1/3 w-2 h-2 bg-primary/20 rounded-full animate-bounce" style={{animationDelay: '1.5s'}} />
        
        <div className="relative max-w-[90%] lg:max-w-[70%] mx-auto">
          {/* Main Hero Content */}
          <div className="text-center mb-16">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium mb-8">
              <div className="w-2 h-2 bg-primary rounded-full mr-2 animate-pulse" />
              Trusted by 10,000+ users worldwide
            </div>
            
            {/* Spectacular Headline */}
            <div className="relative mb-6">
              {/* Background Typography Effects */}
              <div className="absolute inset-0 flex items-center justify-center opacity-5">
                <span className="text-8xl lg:text-9xl font-black text-primary blur-sm select-none">
                  TRUSTLINK
                </span>
              </div>
              
              <h1 className="relative text-center">
                {/* First Line - Secure escrow */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-2 lg:gap-4 mb-1">
                  <span className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-foreground tracking-tight transform hover:scale-105 transition-transform duration-300">
                    Secure
                  </span>
                  
                  <div className="relative">
                    <span className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-black bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient-shift">
                      escrow
                    </span>
                    {/* Underline effect */}
                    <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-accent to-solana rounded-full opacity-60" />
                  </div>
                </div>
                
                {/* Second Line - payments */}
                <div className="flex items-center justify-center mb-2">
                  <span className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black bg-gradient-to-r from-accent via-solana to-primary bg-clip-text text-transparent tracking-tight leading-none">
                    payments
                  </span>
                </div>
                
                {/* Third Line - on Solana with spectacular effects */}
                <div className="flex items-center justify-center gap-2 lg:gap-3">
                  <span className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-medium text-muted-foreground">
                    on
                  </span>
                  
                  {/* Solana with spectacular effects */}
                  <div className="relative group">
                    {/* Background glow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-solana via-primary to-accent rounded-2xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500 scale-110" />
                    
                    {/* Main Solana text */}
                    <div className="relative transform rotate-2 hover:rotate-0 transition-transform duration-500 group">
                      <span className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-black bg-gradient-to-r from-solana via-accent to-primary bg-clip-text text-transparent tracking-tight transform hover:scale-110 transition-all duration-300 inline-block">
                        Solana
                      </span>
                      
                      {/* Decorative elements */}
                      <div className="absolute -top-2 -right-2 w-3 h-3 bg-solana rounded-full animate-pulse opacity-80" />
                      <div className="absolute -bottom-2 -left-2 w-2 h-2 bg-accent rounded-full animate-pulse opacity-60" style={{animationDelay: '0.5s'}} />
                      <div className="absolute top-1/2 -right-4 w-1 h-1 bg-primary rounded-full animate-pulse opacity-40" style={{animationDelay: '1s'}} />
                    </div>
                    
                    {/* Floating particles */}
                    <div className="absolute inset-0 pointer-events-none">
                      <div className="absolute top-0 left-1/4 w-1 h-1 bg-solana/60 rounded-full animate-bounce" style={{animationDelay: '0s'}} />
                      <div className="absolute bottom-0 right-1/4 w-1 h-1 bg-accent/60 rounded-full animate-bounce" style={{animationDelay: '0.3s'}} />
                      <div className="absolute top-1/2 left-0 w-0.5 h-0.5 bg-primary/60 rounded-full animate-bounce" style={{animationDelay: '0.6s'}} />
                    </div>
                  </div>
                </div>
                
                {/* Decorative elements around the entire title */}
                <div className="absolute -top-8 left-1/4 w-32 h-0.5 bg-gradient-to-r from-transparent via-primary/50 to-transparent transform -rotate-12" />
                <div className="absolute -bottom-8 right-1/3 w-24 h-0.5 bg-gradient-to-r from-transparent via-accent/50 to-transparent transform rotate-12" />
                <div className="absolute top-1/2 -left-8 w-16 h-0.5 bg-gradient-to-r from-transparent via-solana/50 to-transparent transform rotate-90" />
                <div className="absolute top-1/2 -right-8 w-20 h-0.5 bg-gradient-to-r from-transparent via-primary/50 to-transparent transform rotate-90" />
              </h1>
            </div>

            {/* Clean Subtitle */}
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 max-w-2xl mx-auto">
              The most trusted way to send and receive payments with built-in dispute resolution. 
              Lightning-fast transactions with enterprise-grade security.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              {/* Primary CTA with animated outline */}
              <div className="group relative">
                {/* Animated SVG outline */}
                <svg 
                  className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect 
                    x="1" 
                    y="1" 
                    width="calc(100% - 2px)" 
                    height="calc(100% - 2px)" 
                    rx="11" 
                    stroke="url(#gradient)" 
                    strokeWidth="2" 
                    strokeDasharray="200" 
                    strokeDashoffset="200"
                    className="animate-draw-outline"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="oklch(0.55 0.18 150)" />
                      <stop offset="50%" stopColor="oklch(0.65 0.15 85)" />
                      <stop offset="100%" stopColor="oklch(0.45 0.25 165)" />
                    </linearGradient>
                  </defs>
                </svg>
                
                <Button
                  size="lg"
                  onClick={handleStartEscrow}
                  className="bg-primary hover:bg-primary/95 text-primary-foreground px-8 py-3 text-base font-semibold shadow-lg hover:shadow-2xl transition-all duration-300 rounded-xl relative overflow-hidden"
                >
                  {/* Button background glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent/20 to-primary opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                  
                  <span className="relative z-10">
                    {connected ? 'Start Escrow' : 'Connect Wallet to Start'}
                  </span>
                  
                  {/* Animated arrow */}
                  <ArrowRight className="ml-2 h-5 w-5 relative z-10 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-80" />
                </Button>
              </div>
              
              {/* Secondary CTA - Explore Features */}
              <div className="group relative">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleExploreFeatures}
                  className="px-8 py-3 text-base border-2 border-accent/30 hover:border-accent/60 hover:bg-accent/5 rounded-xl transition-all duration-300 relative overflow-hidden"
                >
                  {/* Subtle background effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <Sparkles className="mr-2 h-5 w-5 transition-all duration-300 group-hover:scale-110" />
                  <span>Explore Features</span>
                </Button>
              </div>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground mb-12">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-primary/10 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-4 w-4 text-primary" />
                </div>
                <span>$50M+ secured</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Users className="h-4 w-4 text-accent" />
                </div>
                <span>10,000+ users</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-solana/10 rounded-lg flex items-center justify-center">
                  <Shield className="h-4 w-4 text-solana" />
                </div>
                <span>99.9% uptime</span>
              </div>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="group relative p-8 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 hover:border-primary/20 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Shield className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  Secure by design
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Multi-signature protection with time-locked releases and automated dispute resolution powered by smart contracts.
                </p>
              </div>
            </div>

            <div className="group relative p-8 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 hover:border-accent/20 transition-all duration-300 hover:shadow-lg hover:shadow-accent/10">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-accent to-accent/80 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <ZapIcon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  Lightning fast
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Sub-second confirmation times on Solana's high-performance network with minimal transaction costs.
                </p>
              </div>
            </div>

            <div className="group relative p-8 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 hover:border-solana/20 transition-all duration-300 hover:shadow-lg hover:shadow-solana/10">
              <div className="absolute inset-0 bg-gradient-to-br from-solana/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-solana to-solana/80 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <TrendingUp className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  Enterprise grade
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Built for scale with 99.9% uptime, comprehensive APIs, and institutional-grade security infrastructure.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Wallet Selection Modal */}
      <WalletModal 
        isOpen={isWalletModalOpen} 
        onClose={() => setIsWalletModalOpen(false)} 
      />
      
      {/* Coming Soon Modal */}
      <ComingSoonModal 
        isOpen={isComingSoonModalOpen} 
        onClose={() => setIsComingSoonModalOpen(false)}
        featureName="Advanced Features"
      />
    </>
  );
};

export default Hero;
