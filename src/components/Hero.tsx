import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { fadeUp } from '@/src/lib/animations';

const avatars = [
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&h=200&auto=format&fit=crop"
];

const messages = [
  {
    title: "All the Cinema Minds in One Place!",
    subtitle: "Hire Talents, Connect with Industry Professionals, Discover Film & Media Opportunities. Find Your Next Big Break!"
  },
  {
    title: "Step into the Reels!",
    subtitle: "Direct access to a treasure trove of actors, technicians, and countless film production opportunities worldwide."
  },
  {
    title: "Hire the finest Crew!",
    subtitle: "Find amazing cinematographers, connect with post-production experts, and unlock incredible project opportunities."
  },
  {
    title: "Network with the Visionaries!",
    subtitle: "Find talented directors, connect with scriptwriters, and explore groundbreaking filmmaking collaborations."
  },
  {
    title: "Craft Cinema with the Masters!",
    subtitle: "Discover exceptional editing talents, network with production legends, and access remarkable industry opportunities."
  },
  {
    title: "Lead Projects with the Best!",
    subtitle: "Join the elite ranks of filmmakers, connect with producers, and unearth a world of possibilities in the movie realm."
  }
];

function CinematicTyper({ text, className, speed = 40, startDelay = 0 }: { text: string; className?: string; speed?: number; startDelay?: number }) {
  const [displayedText, setDisplayedText] = useState("");
  
  useEffect(() => {
    setDisplayedText(""); // Reset when text changes
    let timeout: NodeJS.Timeout;
    
    const start = () => {
      const chars = Array.from(text);
      let i = 0;
      let current = "";
      
      const type = () => {
        if (i < chars.length) {
          current += chars[i];
          setDisplayedText(current);
          i++;
          timeout = setTimeout(type, speed);
        }
      };
      
      timeout = setTimeout(type, startDelay);
    };
    
    start();
    return () => clearTimeout(timeout);
  }, [text, speed, startDelay]);

  return (
    <motion.p className={className}>
      {Array.from(displayedText).map((char, index) => (
        <motion.span
          key={`${text}-${index}`}
          initial={{ opacity: 0, filter: 'blur(4px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          transition={{
            duration: 0.3,
            ease: "easeOut"
          }}
        >
          {char}
        </motion.span>
      ))}
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
        className="inline-block w-[2px] h-[0.7em] bg-white ml-1 align-middle"
      />
    </motion.p>
  );
}

export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 8000); // Longer interval for the full typing experience
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background Video Container */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-black">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-40 translate-y-12 scale-110"
        >
          <source 
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260324_151826_c7218672-6e92-402c-9e45-f1e0f454bdc4.mp4" 
            type="video/mp4" 
          />
        </video>
        {/* Top Drop Shadows / Fades */}
        <div className="absolute top-0 left-0 w-full h-72 bg-gradient-to-b from-black via-black/80 to-transparent z-10" />
        {/* Bottom Fade */}
        <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-black to-transparent z-10" />
        {/* Subtle Vignette */}
        <div className="vignette-overlay" />
      </div>

      <div className="relative z-20 flex flex-col items-center text-center px-4 sm:px-6 max-w-5xl mx-auto py-12 lg:py-20">
        {/* Avatars */}
        <motion.div
          {...fadeUp(0.1)}
          className="flex items-center gap-3 mb-6 sm:mb-10"
        >
          <div className="flex -space-x-2">
            {avatars.map((url, i) => (
              <div key={i} className="w-8 h-8 rounded-full border-2 border-black overflow-hidden bg-zinc-800">
                <img 
                  src={url} 
                  alt={`User ${i}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
          <span className="text-zinc-400 text-xs sm:text-sm font-medium">80,000+ cinema professionals already joined</span>
        </motion.div>

        {/* Content Rotation Container */}
        <div className="w-full flex flex-col items-center justify-center mb-8 sm:mb-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center w-full"
            >
              <CinematicTyper
                text={messages[index].title}
                speed={50}
                className="text-[2rem] leading-[1.15] sm:text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight mb-4 sm:mb-8 w-full"
              />

              <motion.p
                initial={{ opacity: 0, filter: 'blur(10px)', y: 10 }}
                animate={{ opacity: 0.8, filter: 'blur(0px)', y: 0 }}
                exit={{ opacity: 0, filter: 'blur(10px)', y: -10 }}
                transition={{
                  duration: 1.2,
                  delay: 1.5,
                  ease: [0.22, 1, 0.36, 1]
                }}
                className="text-sm sm:text-lg md:text-xl text-[#F0F2F5] max-w-2xl leading-relaxed px-1 sm:px-0"
              >
                {messages[index].subtitle}
              </motion.p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Form */}
        <motion.div
          {...fadeUp(0.4)}
          className="w-full max-w-lg flex flex-col sm:flex-row gap-3 sm:gap-0 sm:liquid-glass sm:rounded-full sm:p-2 sm:items-center"
        >
          <input
            type="email"
            placeholder="Email address"
            className="w-full liquid-glass sm:liquid-glass-none flex-grow bg-transparent border-none outline-none px-5 py-3.5 sm:py-0 sm:px-6 text-sm text-foreground focus:outline-none placeholder:text-zinc-500 rounded-full sm:rounded-none"
          />
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="w-full sm:w-auto bg-white text-black font-bold text-[10px] tracking-widest rounded-full px-8 py-3.5 uppercase transition-transform whitespace-nowrap"
          >
            Join our community
          </motion.button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        {...fadeUp(0.6)}
        className="absolute bottom-8 left-0 right-0 flex flex-col items-center z-20"
      >
        <p className="text-[10px] tracking-[4px] text-zinc-500 uppercase mb-4">Scroll to discover</p>
      </motion.div>
    </section>
  );
}
