import React from 'react';
import { createPortal } from 'react-dom';
import { X, Clock, Star, Calendar, Zap } from 'lucide-react';

interface ComingSoonModalProps {
  isOpen: boolean;
  onClose: () => void;
  featureName?: string;
}

const ComingSoonModal: React.FC<ComingSoonModalProps> = ({
  isOpen,
  onClose,
  featureName = "Feature"
}) => {
  if (!isOpen) return null;

  const modalContent = (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-background border border-border rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 px-6 py-5 border-b border-border/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-primary/20 rounded-xl">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground">Coming Soon</h2>
                <p className="text-sm text-muted-foreground">Feature in development</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="rounded-full hover:bg-gray-200 h-8 w-8 flex items-center justify-center focus:outline-none bg-white/80 border border-gray-300 shadow-sm transition-all duration-200"
              title="Close"
            >
              <X className="h-4 w-4 text-gray-600 hover:text-gray-800" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 text-center">
          {/* Icon */}
          <div className="mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                <Star className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>

          {/* Message */}
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-foreground mb-3">
              {featureName} Coming Soon!
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              We're working hard to bring you this amazing feature. Stay tuned for updates as we continue to build the future of secure escrow payments.
            </p>
          </div>

          {/* Features Preview */}
          <div className="mb-6">
            <div className="grid grid-cols-1 gap-3">
              <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Zap className="h-4 w-4 text-primary" />
                </div>
                <span className="text-sm font-medium text-foreground">Enhanced Performance</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Star className="h-4 w-4 text-accent" />
                </div>
                <span className="text-sm font-medium text-foreground">New User Experience</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                <div className="w-8 h-8 bg-solana/10 rounded-lg flex items-center justify-center">
                  <Calendar className="h-4 w-4 text-solana" />
                </div>
                <span className="text-sm font-medium text-foreground">Advanced Features</span>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="space-y-3">
            <button
              onClick={onClose}
              className="w-full flex items-center justify-center gap-3 h-12 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl transition-all duration-200 font-medium"
            >
              Got it, thanks!
            </button>
            
            <p className="text-xs text-muted-foreground">
              Follow our updates for the latest news and release information.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  // Use portal to render in document.body
  if (typeof window === 'undefined') {
    return null; // Don't render during SSR
  }
  
  return createPortal(modalContent, document.body);
};

export default ComingSoonModal;
