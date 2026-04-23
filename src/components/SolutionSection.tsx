import { motion } from 'motion/react';
import { fadeUp } from '@/src/lib/animations';

const features = [
  {
    title: "Talent Discovery",
    description: "Connect with verified actors, models, and voice artists across the globe."
  },
  {
    title: "Crew Hiring",
    description: "Access a worldwide database of skilled technicians and production crew."
  },
  {
    title: "Community",
    description: "Collaborate with industry pros in dedicated cinematic networking hubs."
  },
  {
    title: "Career Growth",
    description: "Discover production calls and industry gigs that launch your career."
  }
];

export default function SolutionSection() {
  return (
    <section className="bg-background py-16 sm:py-32 md:py-44 px-4 sm:px-8 md:px-28 border-t border-border/30">
      <div className="max-w-7xl mx-auto">
        <motion.div {...fadeUp(0.1)} className="mb-16">
          <span className="text-xs tracking-[4px] uppercase text-muted-foreground font-semibold">SOLUTION</span>
          <h2 className="text-2xl sm:text-4xl md:text-6xl font-medium mt-4 sm:mt-6 tracking-tight">
            The platform for <span className="font-serif italic font-normal">cinematic</span> networking
          </h2>
        </motion.div>

        {/* Big Video */}
        <motion.div 
            {...fadeUp(0.2)}
            className="w-full aspect-video sm:aspect-[2/1] md:aspect-[3/1] mb-12 sm:mb-20 rounded-xl sm:rounded-2xl overflow-hidden border border-border/50"
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source 
                src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260416_101255_3099d3e4-d0cf-4e59-9666-97fbf521ac71.mp4" 
                type="video/mp4" 
            />
          </video>
        </motion.div>

        {/* Feature Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 md:gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              {...fadeUp(0.3 + i * 0.1)}
              className="group"
            >
              <div className="h-px w-8 bg-foreground/20 mb-6 group-hover:w-full transition-all duration-700 ease-in-out" />
              <h3 className="text-lg font-semibold mb-4 text-foreground">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
