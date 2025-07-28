/**
 * Not Found (404) Route Component for Codigo Escrow Template
 * 
 * @author David James
 * @email ccrowndavid@gmail.com
 * @github https://www.github.com/David-CCrown
 * @description Fallback page displayed when a user navigates to an unknown route
 */

import { XCircle } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background py-12 px-4">
      <div className="bg-card/60 rounded-2xl shadow-lg p-12 border border-border/50 flex flex-col items-center max-w-md w-full">
        <XCircle className="w-20 h-20 text-muted-foreground mb-6" />
        <h1 className="text-3xl font-bold text-foreground mb-2">
          404 - Not Found
        </h1>
        <p className="text-muted-foreground mb-6 text-center">
          The page you are looking for does not exist.
        </p>
        <a
          href="/"
          className="px-6 py-3 bg-gradient-to-r from-primary to-solana text-white rounded-xl font-medium hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center gap-2"
        >
          Go Home
        </a>
      </div>
    </main>
  );
}
