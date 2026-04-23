import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'motion/react';

const networkingItems = [
  {
    role: "Director",
    title: "The Visionary",
    description: "Connect with directors who don't just call shots—they craft cinematic universes. Find your next creative lead or mentor.",
    image: "https://iili.io/B4gP4oP.png",
    accent: "from-blue-500/20"
  },
  {
    role: "Actor",
    title: "The Soul",
    description: "Discover performers who bring scripts to life with raw intensity and depth. Your lead role is waiting to be cast.",
    image: "https://iili.io/B4gPlFs.png",
    accent: "from-red-500/20"
  },
  {
    role: "Singer",
    title: "The Voice",
    description: "Collaborate with rockstars and vocalists who command the stage and your emotions. Find the perfect harmony.",
    image: "https://iili.io/B4giT0u.png",
    accent: "from-purple-500/20"
  },
  {
    role: "Editor",
    title: "The Architect",
    description: "Meet the masters of pacing and rhythm. Editors who turn raw footage into seamless cinematic poetry.",
    image: "https://iili.io/B4giuUb.png",
    accent: "from-emerald-500/20"
  }
];

interface CharacterSpotlightProps {
  item: typeof networkingItems[0];
  index: number;
  key?: React.Key;
}

function CharacterSpotlight({ item, index }: CharacterSpotlightProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.95, 1.35, 1.35, 0.95]);
  const bgTextXRaw = useTransform(scrollYProgress, [0, 1], [index % 2 === 0 ? -100 : 100, index % 2 === 0 ? 100 : -100]);
  const bgTextX = useSpring(bgTextXRaw, { stiffness: 60, damping: 25, mass: 1 });

  return (
    <div ref={containerRef} className="relative min-h-screen w-full flex items-center justify-center py-16 sm:py-32 px-4 sm:px-8 md:px-28 overflow-hidden">
      {/* Background Cinematic Atmosphere */}
      <div className={`absolute inset-0 bg-gradient-to-b ${item.accent} to-transparent opacity-30 blur-[100px] pointer-events-none`} />
      
      {/* Parallax Background Text */}
      <motion.div 
        style={{ x: bgTextX }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden opacity-5"
      >
        <h4 className="text-[40vw] md:text-[30vw] font-black uppercase tracking-tighter text-white leading-none whitespace-nowrap">
          {item.role}
        </h4>
      </motion.div>

      <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 items-center gap-8 sm:gap-16 md:gap-32 relative z-10">
        {/* Immersive Figurine (Large and Bold) */}
        <div className={`flex items-center justify-center ${index % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}>
          <motion.div
            style={{ scale, opacity }}
            className="relative w-full max-w-3xl aspect-square flex items-center justify-center"
          >
            {/* Spotlight Glow */}
            <div className={`absolute w-[140%] h-[140%] bg-gradient-to-tr ${item.accent} to-transparent rounded-full blur-[100px] opacity-40 mix-blend-screen animate-pulse`} />
            
            <img 
              src={item.image} 
              alt={item.role}
              className={`w-full h-full object-contain drop-shadow-[0_100px_180px_rgba(0,0,0,0.95)] filter drop-shadow-[0_0_80px_rgba(255,255,255,0.1)]`}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = `https://placehold.co/1200x1200/000/333?text=${item.role}`;
              }}
            />
          </motion.div>
        </div>

        {/* Cinematic Content Reveal */}
        <div className={`flex flex-col ${index % 2 === 0 ? 'md:order-2 text-left' : 'md:order-1 md:items-end md:text-right'}`}>
          <motion.div
            style={{ opacity }}
            className="max-w-xl"
          >
            <div className={`inline-flex items-center gap-4 mb-8 ${index % 2 === 1 ? 'flex-row-reverse' : ''}`}>
              <div className="w-12 h-px bg-white/20" />
              <span className="text-[10px] tracking-[8px] uppercase text-zinc-500 font-black">
                {item.role}
              </span>
            </div>

            <h3 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-medium tracking-tighter mb-6 sm:mb-10 leading-[0.85] bg-gradient-to-b from-white to-white/30 bg-clip-text text-transparent">
              {item.title}
            </h3>
            
            <p className="text-base sm:text-xl md:text-2xl text-zinc-400 leading-relaxed font-light mb-8 sm:mb-12">
              {item.description}
            </p>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className={`liquid-glass group relative flex items-center gap-6 px-8 py-4 rounded-full transition-all duration-500 hover:bg-white hover:text-black overflow-hidden ${index % 2 === 1 ? 'flex-row-reverse' : ''}`}
            >
              <span className="text-[10px] font-black tracking-[4px] uppercase relative z-10">
                View Network
              </span>
              <div className="w-8 h-px bg-current group-hover:w-12 transition-all duration-500 relative z-10" />
              {/* Shine effect */}
              <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:left-[200%] transition-all duration-1000 ease-in-out" />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default function SearchSection() {
  return (
    <section className="bg-background relative" id="networking">
      {/* Intro Header: The Reveal */}
      <div className="max-w-7xl mx-auto px-8 md:px-28 min-h-screen flex flex-col items-center justify-center text-center leading-[0.8]">
        <motion.div 
          initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
          className="relative"
        >
          {/* Subtle floating elements in intro */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-48 h-48 bg-white/5 rounded-full blur-[60px]" />
          
          <h2 className="text-4xl sm:text-6xl md:text-[8rem] font-medium tracking-tighter mb-6 sm:mb-10 leading-none">
            Networking has <br />
            <span className="font-serif italic font-normal text-white/40 border-b-2 border-white/10">changed.</span>
          </h2>
          <p className="text-zinc-500 text-lg md:text-2xl max-w-2xl mx-auto font-light leading-relaxed">
            Character-driven networking for the next generation of cinematic creators.
          </p>
        </motion.div>
      </div>

      {/* Characters Feed: Immersive Gallery */}
      <div className="flex flex-col relative">
        {networkingItems.map((item, index) => (
          <CharacterSpotlight key={item.role} item={item} index={index} />
        ))}
      </div>

      {/* Transition Out: The Call to Action hint */}
      <div className="h-screen flex flex-col items-center justify-center text-center px-8 relative overflow-visible">
        {/* Filmstrip Left */}
        <div className="hidden sm:flex absolute pointer-events-none select-none items-start" style={{ left: '1rem', top: '50%', transform: 'translateY(-50%)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', transform: 'rotate(25deg)' }}>
            <img
              src="https://iili.io/B4gLaP1.png"
              alt=""
              className="opacity-50"
              style={{ height: '80vh', width: 'auto', objectFit: 'cover', display: 'block' }}
            />
            <img
              src="https://iili.io/B4gLaP1.png"
              alt=""
              className="opacity-50"
              style={{ height: '80vh', width: 'auto', objectFit: 'cover', display: 'block', transform: 'scaleY(-1)', marginTop: '-14px' }}
            />
          </div>
        </div>

        {/* Filmstrip Right */}
        <div className="hidden sm:flex absolute pointer-events-none select-none items-start" style={{ right: '2.5rem', top: '50%', transform: 'translateY(-50%)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', transform: 'rotate(25deg)' }}>
            <img
              src="https://iili.io/B4gLaP1.png"
              alt=""
              className="opacity-50"
              style={{ height: '80vh', width: 'auto', objectFit: 'cover', display: 'block' }}
            />
            <img
              src="https://iili.io/B4gLaP1.png"
              alt=""
              className="opacity-50"
              style={{ height: '80vh', width: 'auto', objectFit: 'cover', display: 'block', transform: 'scaleY(-1)', marginTop: '-14px' }}
            />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl relative"
        >
          <motion.div
            className="text-[12vw] font-black uppercase absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none tracking-tighter"
            style={{
              backgroundImage: 'linear-gradient(90deg, transparent 0%, transparent 40%, rgba(255,255,255,0.95) 50%, transparent 60%, transparent 100%)',
              backgroundSize: '200% 100%',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
            }}
            animate={{ backgroundPosition: ['200% center', '-200% center'] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
          >
            LetsFAME
          </motion.div>

          <h5 className="text-2xl sm:text-4xl md:text-6xl font-medium tracking-tighter mb-6 sm:mb-10 leading-snug">
            Your journey is <br /> our script.
          </h5>
          <p className="text-zinc-600 text-[10px] font-black tracking-[8px] uppercase leading-relaxed">
            Claim your fame.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
