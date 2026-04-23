import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { fadeUp } from '@/src/lib/animations';
import Hls from 'hls.js';

export default function CTASection() {
  const currentYear = new Date().getFullYear();
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoSrc = "https://stream.mux.com/Si6ej2ZRrxRCnTYBXSScDRCdd7CGnyTqiPszZcw3z4I.m3u8";

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Ensure muted for autoplay
    video.muted = true;

    let hls: Hls | null = null;

    if (video.canPlayType('application/vnd.apple.mpegurl')) {
      // Native HLS support (Safari)
      video.src = videoSrc;
      video.addEventListener('loadedmetadata', () => {
        video.play().catch(e => console.error("Native playback error:", e));
      });
    } else if (Hls.isSupported()) {
      // Use hls.js
      hls = new Hls({
        capLevelToPlayerSize: true,
        autoStartLoad: true
      });
      hls.loadSource(videoSrc);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(e => console.error("HLS playback error:", e));
      });

      hls.on(Hls.Events.ERROR, (_event, data) => {
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              hls?.startLoad();
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              hls?.recoverMediaError();
              break;
            default:
              hls?.destroy();
              break;
          }
        }
      });
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-60"
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-background/45 backdrop-blur-[2px] z-[1]" />
      </div>

      {/* Main CTA Content */}
      <div className="relative z-10 flex-grow flex flex-col items-center justify-center text-center px-4 sm:px-8 pt-20 sm:pt-32 pb-12 sm:pb-20">
        <motion.div {...fadeUp(0.1)} className="mb-8">
          <img 
            src="https://www.letsfame.com/assets/img/logo.png" 
            alt="LetsFAME logo" 
            className="h-10 w-auto grayscale brightness-200"
          />
        </motion.div>

        <motion.h2 
          {...fadeUp(0.2)}
          className="text-3xl sm:text-5xl md:text-7xl font-medium mb-4 sm:mb-6 tracking-tight"
        >
          Start Your <span className="font-serif italic font-normal">Journey</span>
        </motion.h2>

        <motion.p 
          {...fadeUp(0.3)}
          className="text-muted-foreground text-sm sm:text-lg max-w-xl mb-8 sm:mb-12 px-2 sm:px-0"
        >
          Become a part of the world's first professional cinema networking community. Your next big role or crew member is just a click away.
        </motion.p>

        <motion.div 
          {...fadeUp(0.4)}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="bg-foreground text-background font-bold text-sm rounded-lg px-10 py-4 shadow-[0_10px_20px_-10px_rgba(255,255,255,0.2)]"
          >
            Join Now
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="liquid-glass border-none text-foreground font-bold text-sm rounded-lg px-10 py-4"
          >
            Hire Talent
          </motion.button>
        </motion.div>
      </div>

      {/* Integrated Footer Content */}
      <div className="relative z-10 w-full px-4 sm:px-8 md:px-28 pb-8 sm:pb-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 pt-12 border-t border-white/10">
          <motion.div 
            {...fadeUp(0.5)}
            className="text-foreground/50 text-sm"
          >
            © {currentYear} LetsFAME. All rights reserved.
          </motion.div>

          <motion.div 
            {...fadeUp(0.6)}
            className="flex items-center gap-4 sm:gap-8"
          >
            {["Privacy", "Terms", "Contact"].map((link) => (
              <a 
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-foreground/50 text-sm hover:text-foreground transition-colors duration-300"
              >
                {link}
              </a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
