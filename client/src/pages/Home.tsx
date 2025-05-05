import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import AboutVPH from '@/components/AboutVPH';
import RiskFactors from '@/components/RiskFactors';
import Prevention from '@/components/Prevention';
import CTASection from '@/components/CTASection';
import Resources from '@/components/Resources';
import Footer from '@/components/Footer';
import InteractiveBackground from '@/components/InteractiveBackground';
import { calculateScrollProgress } from '@/lib/utils';

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollProgress(calculateScrollProgress());
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <div className="min-h-screen text-neutral-800 overflow-x-hidden">
      {/* Interactive gradient background */}
      <InteractiveBackground numPoints={6} sensitivity={0.02} />
      
      {/* Semi-transparent backdrop for text readability */}
      <div className="relative min-h-screen z-10">
        <Header scrollProgress={scrollProgress} />
        <main>
          <Hero />
          <AboutVPH />
          <RiskFactors />
          <Prevention />
          <CTASection />
          <Resources />
        </main>
        <Footer />
      </div>
    </div>
  );
}
