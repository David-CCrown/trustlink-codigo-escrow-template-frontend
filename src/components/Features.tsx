import {
  Clock,
  Users,
  FileText,
  DollarSign,
  Shield,
  Zap,
  Globe,
  TrendingUp,
  Lock,
  CheckCircle,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export function Features() {
  const mainFeatures = [
    {
      icon: Shield,
      title: 'Bank-level Security',
      description:
        'Multi-signature wallets with time-locked releases and automated dispute resolution powered by audited smart contracts.',
      gradient: 'from-primary to-primary/80',
      highlight: 'Most Secure',
    },
    {
      icon: Zap,
      title: 'Lightning Speed',
      description:
        'Sub-second transaction confirmations on Solana with minimal fees. Experience the fastest blockchain ecosystem.',
      gradient: 'from-accent to-accent/80',
      highlight: 'Fastest',
    },
    {
      icon: Users,
      title: 'Multi-Party Support',
      description:
        'Handle complex transactions with multiple buyers, sellers, and arbitrators in a single escrow agreement.',
      gradient: 'from-solana to-solana/80',
      highlight: 'Most Flexible',
    },
  ];

  const additionalFeatures = [
    {
      icon: Clock,
      title: 'Automated Releases',
      description: 'Smart contract conditions trigger automatic payments',
    },
    {
      icon: DollarSign,
      title: 'Any SPL Token',
      description: 'Support for USDC, SOL, and custom project tokens',
    },
    {
      icon: FileText,
      title: 'Transparent Contracts',
      description: 'Open-source, auditable smart contract code',
    },
    {
      icon: Globe,
      title: 'Global Access',
      description: '24/7 availability with worldwide accessibility',
    },
    {
      icon: Lock,
      title: 'Privacy First',
      description: 'Your transaction data remains private and secure',
    },
    {
      icon: CheckCircle,
      title: 'Instant Verification',
      description: 'Real-time transaction status and confirmations',
    },
  ];

  return (
    <section id="features" className="relative py-24 px-4 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl" />
      
      <div className="relative max-w-[90%] lg:max-w-[70%] mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4 mr-2" />
            Feature Rich Platform
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 tracking-tight">
            Everything you need for
            <span className="block bg-gradient-to-r from-primary via-accent to-solana bg-clip-text text-transparent">
              secure transactions
            </span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Built for the modern web3 economy with enterprise-grade security,
            lightning-fast performance, and user-friendly design.
          </p>
        </div>

        {/* Main Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {mainFeatures.map((feature, index) => (
            <div
              key={index}
              className="group relative p-8 rounded-3xl border border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2"
            >
              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Highlight Badge */}
              <div className="absolute -top-3 left-6 px-3 py-1 bg-gradient-to-r from-primary to-accent text-white text-xs font-semibold rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-y-1 group-hover:translate-y-0">
                {feature.highlight}
              </div>
              
              <div className="relative">
                {/* Icon */}
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                
                {/* Content */}
                <h3 className="text-2xl font-semibold text-foreground mb-4 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {feature.description}
                </p>
                
                {/* Learn More Link */}
                <div className="flex items-center text-primary font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                  <span className="text-sm">Learn more</span>
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {additionalFeatures.map((feature, index) => (
            <div
              key={index}
              className="group p-6 rounded-2xl border border-border/50 bg-card/30 backdrop-blur-sm hover:bg-card/60 hover:border-primary/20 transition-all duration-300"
            >
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="h-6 w-6 text-primary group-hover:text-accent transition-colors" />
                </div>
                
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center px-6 py-3 rounded-full border border-primary/20 bg-primary/5 text-primary hover:bg-primary/10 transition-colors cursor-pointer">
            <TrendingUp className="w-5 h-5 mr-2" />
            <span className="font-medium">Ready to get started? Create your first escrow</span>
            <ArrowRight className="ml-2 h-4 w-4" />
          </div>
        </div>
      </div>
    </section>
  );
}
