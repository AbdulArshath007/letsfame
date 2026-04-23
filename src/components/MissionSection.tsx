import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

interface RevealTextProps {
  text: string;
  className?: string;
  highlights?: string[];
}

function RevealText({ text, className, highlights = [] }: RevealTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const words = text.split(" ");
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.2"]
  });

  return (
    <div ref={containerRef} className={className}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = (i + 1) / words.length;
        const isHighlighted = highlights.includes(word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, ""));
        
        // Use transform to control opacity based on scroll
        const opacity = useTransform(scrollYProgress, [start, end], [0.15, 1]);

        return (
          <motion.span
            key={i}
            style={{ opacity }}
            className={`inline-block mr-[0.25em] ${isHighlighted ? "text-foreground font-semibold" : "text-[hsl(var(--hero-subtitle))]"}`}
          >
            {word}
          </motion.span>
        );
      })}
    </div>
  );
}

export default function MissionSection() {
  return (
    <section className="bg-background pt-0 pb-16 sm:pb-32 md:pb-44 px-4 sm:px-8 md:px-28 relative overflow-visible">
      <div className="max-w-5xl mx-auto flex flex-col items-center">
        {/* Video */}
        <div className="relative w-full aspect-square max-w-[600px] mb-12 sm:mb-24 overflow-hidden rounded-2xl sm:rounded-3xl">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source 
                src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4" 
                type="video/mp4" 
            />
          </video>
        </div>

        {/* Reveal Text Paragraph 1 */}
        <RevealText 
          text="We're building a space where talent meets opportunity — where filmmakers find vision, actors find roles, and every project becomes a masterpiece worth sharing."
          highlights={["talent", "meets", "opportunity"]}
          className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-medium tracking-tight text-center leading-[1.3] mb-8 sm:mb-12"
        />

        {/* Reveal Text Paragraph 2 */}
        <RevealText 
          text="A platform where creativity, community, and cinematic insight flow together — with less friction, more exposure, and real careers for everyone on set."
          className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium text-center leading-[1.5] mt-6 sm:mt-10 opacity-80"
        />
      </div>
    </section>
  );
}
