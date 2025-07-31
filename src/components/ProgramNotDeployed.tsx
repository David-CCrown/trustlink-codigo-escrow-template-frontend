import React from 'react';
import { Construction, Code2, ExternalLink, ArrowLeft } from 'lucide-react';
import Button from './ui/Button';
import { Link } from 'react-router';

const ProgramNotDeployed: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="max-w-2xl w-full text-center">
        {/* Icon */}
        <div className="mb-8">
          <div className="w-24 h-24 bg-gradient-to-br from-orange-100 to-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Construction className="h-12 w-12 text-orange-500" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Program Under Development
        </h1>

        {/* Description */}
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          The Solana escrow program is currently being developed and has not
          been deployed yet. This is a frontend template that will connect to
          the escrow program once it's ready.
        </p>

        {/* Development Status */}
        <div className="bg-card/50 rounded-2xl border border-border/50 p-6 mb-8">
          <h3 className="text-xl font-semibold text-foreground mb-4">
            Development Status
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-success/10 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span className="text-sm font-medium">Frontend Template</span>
              </div>
              <span className="text-xs text-success font-medium bg-success/20 px-2 py-1 rounded">
                Complete
              </span>
            </div>

            <div className="flex items-center justify-between p-3 bg-orange-100/10 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">Solana Program</span>
              </div>
              <span className="text-xs text-orange-500 font-medium bg-orange-100/20 px-2 py-1 rounded">
                In Progress
              </span>
            </div>

            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-muted-foreground rounded-full"></div>
                <span className="text-sm font-medium">Integration</span>
              </div>
              <span className="text-xs text-muted-foreground font-medium bg-muted px-2 py-1 rounded">
                Pending
              </span>
            </div>
          </div>
        </div>

        {/* Technical Details */}
        <div className="bg-muted/20 rounded-xl p-6 mb-8 text-left">
          <h4 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
            <Code2 className="h-5 w-5" />
            Program Specification
          </h4>
          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex justify-between">
              <span>Type:</span>
              <span className="text-foreground font-mono">Anchor Program</span>
            </div>
            <div className="flex justify-between">
              <span>Network:</span>
              <span className="text-foreground font-mono">Solana Devnet</span>
            </div>
            <div className="flex justify-between">
              <span>Instructions:</span>
              <span className="text-foreground font-mono">
                make, take, cancel, update
              </span>
            </div>
            <div className="flex justify-between">
              <span>Token Support:</span>
              <span className="text-foreground font-mono">SPL Tokens</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            variant="outline"
            size="lg"
            onClick={() =>
              window.open(
                'https://github.com/David-CCrown/trustlink-codigo-escrow-template-frontend',
                '_blank'
              )
            }
            className="flex items-center gap-2"
          >
            <ExternalLink className="h-5 w-5" />
            View Source Code
          </Button>

          <Link to="/">
            <Button
              variant="primary"
              size="lg"
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-5 w-5" />
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Note */}
        <div className="mt-8 p-4 bg-blue-50/50 border border-blue-200/50 rounded-lg">
          <p className="text-sm text-blue-700">
            <strong>Note:</strong> This template includes all the necessary
            frontend components, wallet integration, and UI for a complete
            escrow application. Once the Solana program is deployed, update the
            program ID in{' '}
            <code className="bg-blue-100 px-1 rounded">
              src/config/program.ts
            </code>{' '}
            to connect the frontend to the program.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProgramNotDeployed;
