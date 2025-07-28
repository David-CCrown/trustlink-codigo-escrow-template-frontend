import {
  Github,
  Twitter,
  Linkedin,
  Mail,
  ExternalLink,
  Shield,
  Zap,
  Globe,
  ArrowRight,
  Sparkles,
  Heart,
  Lock,
} from 'lucide-react';
import Input from './ui/Input';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Product',
      links: [
        { name: 'Features', href: '#features', icon: Sparkles },
        { name: 'Security', href: '#security', icon: Shield },
        { name: 'How it Works', href: '#how-it-works', icon: Zap },
        { name: 'API Docs', href: '#', icon: ExternalLink },
        { name: 'Pricing', href: '#', icon: ExternalLink },
      ],
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '#', icon: ExternalLink },
        { name: 'Blog', href: '#', icon: ExternalLink },
        { name: 'Careers', href: '#', icon: ExternalLink },
        { name: 'Contact', href: '#', icon: Mail },
        { name: 'Press Kit', href: '#', icon: ExternalLink },
      ],
    },
    {
      title: 'Resources',
      links: [
        { name: 'Help Center', href: '#', icon: ExternalLink },
        { name: 'Community', href: '#', icon: ExternalLink },
        { name: 'Status', href: '#', icon: Globe },
        { name: 'Changelog', href: '#', icon: ExternalLink },
        { name: 'Partner Program', href: '#', icon: ExternalLink },
      ],
    },
  ];

  const socialLinks = [
    { name: 'Twitter', href: '#', icon: Twitter, color: 'hover:text-blue-400' },
    { name: 'Github', href: '#', icon: Github, color: 'hover:text-foreground' },
    {
      name: 'LinkedIn',
      href: '#',
      icon: Linkedin,
      color: 'hover:text-blue-600',
    },
    {
      name: 'Email',
      href: 'mailto:hello@trustlink.com',
      icon: Mail,
      color: 'hover:text-primary',
    },
  ];

  return (
    <footer className="relative overflow-hidden">
      {/* Dramatic Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/10 to-primary/5" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-solana/5" />

      {/* Top Separator with Glow */}
      <div className="relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-48 h-px bg-gradient-to-r from-primary via-accent to-solana" />
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-48 h-4 bg-gradient-to-r from-primary/20 via-accent/20 to-solana/20 blur-sm" />
      </div>

      {/* Floating Background Elements */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-3xl animate-float" />
      <div
        className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-br from-solana/15 to-primary/15 rounded-full blur-3xl animate-float"
        style={{ animationDelay: '3s' }}
      />
      <div
        className="absolute top-1/2 left-1/3 w-20 h-20 bg-gradient-to-br from-accent/25 to-solana/25 rounded-full blur-2xl animate-float"
        style={{ animationDelay: '6s' }}
      />

      <div className="relative max-w-[90%] lg:max-w-[70%] mx-auto px-4 py-20">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-12 mb-16">
          {/* Brand Section - Enhanced */}
          <div className="lg:col-span-4 flex flex-col items-start sm:items-center lg:items-start">
            {/* Logo with Animation */}
            <div className="group flex items-center space-x-3 mb-6">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-solana rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <span className="text-white text-xl font-bold">T</span>
                </div>
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary to-solana rounded-xl opacity-0 group-hover:opacity-30 blur-md transition-opacity duration-500" />
              </div>

              <div>
                <h3 className="text-2xl font-bold text-foreground group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-solana group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                  Trustlink
                </h3>
                <p className="text-xs text-muted-foreground font-medium tracking-wide uppercase">
                  Secure • Fast • Transparent
                </p>
              </div>
            </div>

            {/* Enhanced Description */}
            <p className="text-muted-foreground leading-relaxed mb-6 text-base sm:text-center lg:text-left">
              The future of secure payments is here. Trustlink combines the
              speed of Solana with enterprise-grade security to deliver
              trust-minimized escrow transactions for the modern digital
              economy.
            </p>

            {/* Trust Indicators */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mb-8">
              <div className="flex items-center gap-2 text-sm text-muted-foreground whitespace-nowrap">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span>99.9% Uptime</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground whitespace-nowrap">
                <Lock className="w-4 h-4 text-primary" />
                <span>Audited Smart Contracts</span>
              </div>
            </div>

            {/* Social Links with Hover Effects */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">
                Follow us
              </span>
              <div className="flex items-center gap-3">
                {socialLinks.map(social => (
                  <a
                    key={social.name}
                    href={social.href}
                    className={`w-10 h-10 rounded-lg border border-border/50 bg-card/30 backdrop-blur-sm flex items-center justify-center text-muted-foreground ${social.color} hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 hover:scale-110 hover:shadow-lg group`}
                    aria-label={social.name}
                  >
                    <social.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation Sections */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {footerSections.map((section, index) => (
              <div key={index} className="space-y-4">
                <h4 className="text-foreground font-semibold text-lg mb-4 relative">
                  {section.title}
                  <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-primary to-accent rounded-full" />
                </h4>

                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a
                        href={link.href}
                        className="group flex items-center gap-2 text-muted-foreground hover:text-primary transition-all duration-300 text-sm hover:translate-x-1"
                      >
                        <link.icon className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:text-primary transition-all" />
                        <span className="group-hover:font-medium transition-all">
                          {link.name}
                        </span>
                        <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Signup - Optional Premium Touch */}
        <div className="relative p-8 rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/5 to-solana/5 backdrop-blur-sm mb-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1">
              <h4 className="text-xl font-semibold text-foreground mb-2 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                Stay in the loop
              </h4>
              <p className="text-muted-foreground">
                Get updates on new features, security enhancements, and Solana
                ecosystem news.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Input
                type="email"
                placeholder="Enter your email"
                variant="search"
                className="min-w-[200px]"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-primary to-solana text-white rounded-xl font-medium hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center gap-2">
                Subscribe
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section with Style */}
        <div className="pt-8 border-t border-gradient-to-r from-transparent via-border to-transparent">
          {/* Copyright section */}
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-6">
            <div className="flex items-center gap-6">
              <p className="text-muted-foreground text-sm flex items-center gap-2">
                © {currentYear} Trustlink. Crafted with
                <Heart className="w-4 h-4 text-red-500 animate-pulse" />
                for the future of payments.
              </p>
            </div>

            {/* Powered by Badge */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-solana/20 bg-solana/5 text-solana text-xs font-medium whitespace-nowrap">
              <div className="w-2 h-2 bg-solana rounded-full animate-pulse" />
              Powered by Solana
            </div>
          </div>

          {/* Legal links section */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-3 text-sm">
            <a
              href="#"
              className="text-muted-foreground hover:text-primary transition-colors hover:underline whitespace-nowrap"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-primary transition-colors hover:underline whitespace-nowrap"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-primary transition-colors hover:underline whitespace-nowrap"
            >
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
