// pages/index.tsx
import { useEffect, useRef, useState } from 'react';
import { useScroll, motion, useTransform } from 'framer-motion';
import Head from 'next/head';

export default function AltitudeLanding() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentFrame, setCurrentFrame] = useState(1);
  const TOTAL_FRAMES = 120; // Update this based on your total EzGIF frame count

  // Monitor scroll progress of the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Fade out hero text at 30% scroll depth exactly like the video
  const heroTextOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const heroTextScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);

  useEffect(() => {
    // Map scroll progress (0 to 1) to frame index (1 to TOTAL_FRAMES)
    return scrollYProgress.onChange((latest) => {
      const frameIndex = Math.min(
        TOTAL_FRAMES,
        Math.max(1, Math.floor(latest * TOTAL_FRAMES))
      );
      setCurrentFrame(frameIndex);
    });
  }, [scrollYProgress]);

  // Preload images for buttery-smooth performance
  useEffect(() => {
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = `/images/sequence/frame_${String(i).padStart(3, '0')}.jpg`;
    }
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-black text-white font-sans antialiased selection:bg-white selection:text-black">
      <Head>
        <title>ALTITUDE | Peak Performance</title>
        <meta name="description" content="Experience the next level with ALTITUDE" />
      </Head>

      {/* 1. Glassmorphism Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/10 backdrop-blur-md border-b border-white/10 px-6 py-4 flex justify-between items-center transition-all duration-300">
        <div className="text-2xl font-black tracking-widest text-white cursor-pointer" onClick={() => window.scrollTo({top:0, behavior:'smooth'})}>
          ALTITUDE
        </div>
        <div className="hidden md:flex space-x-8 text-sm font-medium tracking-wide text-gray-300">
          <button onClick={() => scrollToSection('why-us')} className="hover:text-white transition-colors">Why ALTITUDE</button>
          <button onClick={() => scrollToSection('features')} className="hover:text-white transition-colors">Features</button>
          <button onClick={() => scrollToSection('store')} className="hover:text-white transition-colors">Store Locator</button>
        </div>
        <button onClick={() => scrollToSection('features')} className="bg-white text-black text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-full hover:bg-gray-200 transition-all">
          Explore
        </button>
      </nav>

      {/* 2. Scroll Animation Container (Hero Section) */}
      <div ref={containerRef} className="relative h-[400vh] w-full">
        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
          
          {/* Dynamic Background Image Frame */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-opacity duration-75"
            style={{
              backgroundImage: `url('/images/sequence/frame_${String(currentFrame).padStart(3, '0')}.jpg')`
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black" />

          {/* Fading Hero Typography */}
          <motion.div 
            style={{ opacity: heroTextOpacity, scale: heroTextScale }}
            className="relative z-10 text-center px-4"
          >
            <h1 className="text-6xl md:text-9xl font-black tracking-tighter uppercase text-white drop-shadow-2xl">
              ALTITUDE
            </h1>
            <p className="mt-4 text-lg md:text-2xl font-light tracking-widest text-gray-300 uppercase">
              Reach Your Peak
            </p>
          </motion.div>

          {/* Elegant Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center space-y-2 opacity-50">
            <span className="text-xs tracking-widest uppercase font-semibold">Scroll Down</span>
            <div className="w-[1px] h-12 bg-white/50 animate-pulse" />
          </div>
        </div>
      </div>

      {/* 3. Deep Content Sections (Replacing the custom layout built via Stitch) */}
      <main className="relative z-20 bg-black">
        
        {/* Why Us Section */}
        <section id="why-us" className="py-32 px-6 max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center border-t border-white/10">
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-gray-400">01 / Introduction</span>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight uppercase mt-4 mb-6">
              Crafted at the <br/><span className="text-gray-400">Highest Standards</span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed max-w-xl">
              ALTITUDE reimagines product design from the ground up. By focusing purely on raw performance, meticulous aesthetics, and seamless engineering, we offer an unparalleled experience.
            </p>
          </div>
          <div className="h-[400px] bg-neutral-900 rounded-3xl border border-white/5 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-neutral-950 to-transparent opacity-50" />
            <span className="text-sm tracking-widest uppercase text-neutral-500 font-mono">[ Premium Visual Asset ]</span>
          </div>
        </section>

        {/* Feature Highlights Grid */}
        <section id="features" className="py-32 bg-neutral-950 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16">
              <span className="text-xs uppercase font-bold tracking-widest text-gray-500">02 / Features</span>
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight mt-2">Engineered Perfection</h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {['Pure Innovation', 'Elevated Design', 'Peak Performance'].map((feature, idx) => (
                <div key={idx} className="bg-black p-8 rounded-2xl border border-white/5 hover:border-white/20 transition-all duration-300 group">
                  <div className="text-xs font-mono text-gray-500 mb-8">02.0{idx + 1}</div>
                  <h3 className="text-xl font-bold uppercase tracking-wide text-white mb-4 group-hover:text-gray-300 transition-colors">
                    {feature}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Designed to sustain heavy demands while retaining pristine responsiveness. No compromises, no shortcuts.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Store Locator Section */}
        <section id="store" className="py-32 px-6 max-w-7xl mx-auto text-center">
          <span className="text-xs uppercase font-bold tracking-widest text-gray-400">03 / Availability</span>
          <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter mt-4 mb-8">Find ALTITUDE Near You</h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-12 text-lg">
            Our premier products are distributed globally across select luxury concept spaces and digital flagship distribution channels.
          </p>
          <button className="bg-white text-black px-8 py-4 rounded-full font-bold uppercase text-sm tracking-widest hover:bg-gray-200 transition-all shadow-xl">
            Locate Flagship Stores
          </button>
        </section>
      </main>

      {/* 4. Minimalist Footer */}
      <footer className="bg-black border-t border-white/10 py-12 px-6 text-center text-xs tracking-widest text-gray-500 uppercase">
        <p>&copy; {new Date().getFullYear()} ALTITUDE Inc. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
