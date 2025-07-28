/**
 * Home Route Component for Codigo Escrow Template
 * 
 * @author David James
 * @email ccrowndavid@gmail.com
 * @github https://www.github.com/David-CCrown
 * @description Displays the main landing page with header, hero, features, and footer components
 */

import { Features } from '@/components/Features';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import { HowItWorks } from '@/components/HowItWorks';
import { Footer } from '@/components/Footer';
import { useAuthRedirect } from '@/hooks/useAuthRedirect';

export default function Home() {
  // Handle redirects after wallet connection
  useAuthRedirect();
  
  return (
    <>
      <Header />
      <Hero />
      <Features />
      <HowItWorks />
      <Footer />
    </>
  );
}
