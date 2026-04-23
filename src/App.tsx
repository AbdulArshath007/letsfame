import { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import LogoLoop from './components/LogoLoop';
import SearchSection from './components/SearchSection';
import MissionSection from './components/MissionSection';
import SolutionSection from './components/SolutionSection';
import CTASection from './components/CTASection';
import ParticlesCanvas from './components/ParticlesCanvas';
import LoadingScreen from './components/LoadingScreen';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@1&display=swap" rel="stylesheet" />

      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <div
        className="relative min-h-screen selection:bg-foreground selection:text-background"
        style={{ opacity: isLoading ? 0 : 1, transition: 'opacity 0.5s ease-out' }}
      >
        <ParticlesCanvas />
        <Navbar />
        <main>
          <Hero />
          <LogoLoop />
          <SearchSection />
          <MissionSection />
          <SolutionSection />
          <CTASection />
        </main>
      </div>
    </>
  );
}
