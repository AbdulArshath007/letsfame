import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const WORDS = ["Lights", "Camera", "Action", "Shoot", "Cut", "Edit", "Premiere"];

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => { onCompleteRef.current = onComplete; }, [onComplete]);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex(prev => {
        if (prev < WORDS.length - 1) return prev + 1;
        clearInterval(interval);
        return prev;
      });
    }, 1600);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let isCancelled = false;
    const sleep = (ms: number) => new Promise<void>(r => setTimeout(r, ms));
    const tween = (start: number, end: number, duration: number) =>
      new Promise<void>(resolve => {
        let startTime: number | null = null;
        const loop = (timestamp: number) => {
          if (isCancelled) return resolve();
          if (!startTime) startTime = timestamp;
          const t = Math.min((timestamp - startTime) / duration, 1);
          const eased = 1 - Math.pow(1 - t, 3);
          setProgress(start + (end - start) * eased);
          t < 1 ? requestAnimationFrame(loop) : resolve();
        };
        requestAnimationFrame(loop);
      });

    const run = async () => {
      await tween(0, 25, 1200);  if (isCancelled) return; await sleep(800);
      await tween(25, 45, 1000); if (isCancelled) return; await sleep(800);
      await tween(45, 50, 800);  if (isCancelled) return; await sleep(1200);
      await tween(50, 75, 1500); if (isCancelled) return; await sleep(800);
      await tween(75, 85, 1000); if (isCancelled) return; await sleep(800);
      await tween(85, 100, 1100);if (isCancelled) return;
      setTimeout(() => { if (!isCancelled) onCompleteRef.current(); }, 400);
    };
    run();
    return () => { isCancelled = true; };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[99999]"
      style={{ backgroundColor: '#0a0a0a' }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
    >
      {/* Rotating words */}
      <div className="absolute inset-0 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.span
            key={wordIndex}
            className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl"
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontStyle: 'italic',
              fontWeight: 400,
              color: 'rgba(245,245,245,0.8)',
            }}
            initial={{ opacity: 0, y: 15, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -15, filter: 'blur(8px)' }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {WORDS[wordIndex]}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* Counter */}
      <motion.div
        className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 md:bottom-12 md:right-12 text-5xl sm:text-6xl md:text-8xl lg:text-9xl tabular-nums"
        style={{
          fontFamily: "'Instrument Serif', serif",
          fontStyle: 'italic',
          color: '#f5f5f5',
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        {Math.round(progress).toString().padStart(3, '0')}
      </motion.div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px]" style={{ backgroundColor: 'rgba(31,31,31,0.5)' }}>
        <motion.div
          className="h-full origin-left"
          style={{
            background: 'linear-gradient(90deg, #89AACC 0%, #4E85BF 100%)',
            boxShadow: '0 0 8px rgba(137,170,204,0.35)',
          }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: progress / 100 }}
          transition={{ duration: 0.1, ease: 'linear' }}
        />
      </div>
    </motion.div>
  );
}
