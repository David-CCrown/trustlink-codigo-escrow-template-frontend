import {
  PlusCircle,
  Wallet,
  CheckSquare,
  ArrowRight,
  Sparkles,
  Clock,
  Shield,
  Zap,
} from 'lucide-react';

export function HowItWorks() {
  const steps = [
    {
      number: '01',
      icon: PlusCircle,
      title: 'Create Escrow',
      description: 'Set amount, recipient, and release conditions for your secure transaction.',
      color: 'primary',
      delay: '0s',
    },
    {
      number: '02',
      icon: Wallet,
      title: 'Fund Escrow',
      description: 'Transfer tokens to the secure smart contract with multi-signature protection.',
      color: 'accent',
      delay: '0.2s',
    },
    {
      number: '03',
      icon: CheckSquare,
      title: 'Fulfill Conditions',
      description: 'Complete deliverables or meet time-based conditions automatically.',
      color: 'solana',
      delay: '0.4s',
    },
    {
      number: '04',
      icon: Zap,
      title: 'Release Funds',
      description: 'Instant automatic release based on predefined smart contract conditions.',
      color: 'primary',
      delay: '0.6s',
    },
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'primary':
        return {
          bg: 'from-primary to-primary/80',
          border: 'border-primary/20',
          text: 'text-primary',
          glow: 'shadow-primary/10',
        };
      case 'accent':
        return {
          bg: 'from-accent to-accent/80',
          border: 'border-accent/20',
          text: 'text-accent',
          glow: 'shadow-accent/10',
        };
      case 'solana':
        return {
          bg: 'from-solana to-solana/80',
          border: 'border-solana/20',
          text: 'text-solana',
          glow: 'shadow-solana/10',
        };
      default:
        return {
          bg: 'from-primary to-primary/80',
          border: 'border-primary/20',
          text: 'text-primary',
          glow: 'shadow-primary/10',
        };
    }
  };

  return (
    <section id="how-it-works" className="relative py-32 px-4 overflow-hidden">
      {/* Clear Section Separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-px bg-gradient-to-r from-primary via-accent to-solana" />
      
      {/* Enhanced Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/5 to-background" />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/3 to-transparent" />
      
      {/* Floating Background Elements */}
      <div className="absolute top-20 right-16 w-24 h-24 bg-gradient-to-br from-accent/20 to-primary/20 rounded-full blur-2xl animate-float" />
      <div className="absolute bottom-20 left-16 w-36 h-36 bg-gradient-to-br from-primary/15 to-solana/15 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}} />
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-gradient-to-br from-solana/20 to-accent/20 rounded-full blur-xl animate-float" style={{animationDelay: '4s'}} />
      
      <div className="relative max-w-[90%] lg:max-w-[70%] mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium mb-6">
            <Clock className="w-4 h-4 mr-2" />
            Simple Process
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 tracking-tight">
            How it 
            <span className="bg-gradient-to-r from-primary via-accent to-solana bg-clip-text text-transparent">
              works
            </span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Secure, transparent escrow in four simple steps. 
            Built for speed without compromising security.
          </p>
        </div>

        {/* Steps Timeline */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/20 via-accent/20 to-solana/20" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => {
              const colors = getColorClasses(step.color);
              
              return (
                <div 
                  key={index} 
                  className="group relative"
                  style={{ animationDelay: step.delay }}
                >
                  {/* Step Card */}
                  <div className={`relative p-8 rounded-3xl border ${colors.border} bg-card/40 backdrop-blur-sm hover:bg-card/70 transition-all duration-500 hover:shadow-2xl hover:${colors.glow} hover:-translate-y-3 group-hover:border-opacity-40`}>
                    {/* Enhanced Background Effects */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-transparent to-accent/3 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-white/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Subtle Inner Glow */}
                    <div className={`absolute inset-0.5 bg-gradient-to-br ${colors.bg} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-500`} />
                    
                    <div className="relative">
                      {/* Enhanced Step Number & Icon */}
                      <div className="flex items-center justify-between mb-8">
                        <div className={`relative text-3xl font-bold ${colors.text} opacity-40 group-hover:opacity-70 transition-opacity`}>
                          {step.number}
                          {/* Step number background */}
                          <div className={`absolute inset-0 bg-gradient-to-br ${colors.bg} opacity-0 group-hover:opacity-10 blur-sm transition-opacity duration-500`} />
                        </div>
                        
                        <div className="relative">
                          {/* Icon container with enhanced effects */}
                          <div className={`w-14 h-14 bg-gradient-to-br ${colors.bg} rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg group-hover:shadow-xl`}>
                            <step.icon className="h-7 w-7 text-white group-hover:scale-105 transition-transform duration-300" />
                          </div>
                          
                          {/* Icon glow effect */}
                          <div className={`absolute inset-0 bg-gradient-to-br ${colors.bg} rounded-xl opacity-0 group-hover:opacity-30 blur-md transition-opacity duration-500`} />
                        </div>
                      </div>
                      
                      {/* Enhanced Content */}
                      <div className="space-y-4">
                        <h3 className={`text-xl font-semibold text-foreground group-hover:${colors.text} transition-colors duration-300`}>
                          {step.title}
                        </h3>
                        
                        <p className="text-muted-foreground leading-relaxed text-sm group-hover:text-foreground/80 transition-colors duration-300">
                          {step.description}
                        </p>
                        
                        {/* Progress indicator */}
                        <div className="pt-2">
                          <div className={`h-1 bg-gradient-to-r ${colors.bg} rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
                        </div>
                      </div>
                      
                      {/* Enhanced Arrow for desktop */}
                      {index < steps.length - 1 && (
                        <div className="hidden lg:block absolute -right-6 top-1/2 transform -translate-y-1/2">
                          <div className="relative">
                            <ArrowRight className={`h-8 w-8 ${colors.text} opacity-0 group-hover:opacity-60 transition-all duration-300 group-hover:translate-x-2`} />
                            <div className={`absolute inset-0 bg-gradient-to-r ${colors.bg} opacity-0 group-hover:opacity-10 blur-sm rounded-full transition-opacity duration-500`} />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Connection dot for timeline */}
                  <div className={`hidden lg:block absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-gradient-to-r ${colors.bg} rounded-full border-2 border-background`} />
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center px-6 py-3 rounded-full border border-accent/20 bg-accent/5 text-accent hover:bg-accent/10 transition-colors cursor-pointer group">
            <Shield className="w-5 h-5 mr-2" />
            <span className="font-medium">All transactions are secured by audited smart contracts</span>
            <Sparkles className="ml-2 h-4 w-4 group-hover:rotate-12 transition-transform" />
          </div>
        </div>
      </div>
    </section>
  );
}
