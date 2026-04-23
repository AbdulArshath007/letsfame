import React from 'react';
import { motion } from 'motion/react';
import { Instagram, Linkedin, Twitter } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-4 sm:px-8 lg:px-20 py-5 sm:py-8 flex items-center justify-between pointer-events-auto">
      <div className="flex items-center gap-4 md:gap-12">
        {/* Logo */}
        <div className="flex items-center gap-3 group cursor-pointer">
          <img 
            src="https://www.letsfame.com/assets/img/logo.png" 
            alt="LetsFAME Logo" 
            className="h-8 w-auto grayscale brightness-200"
          />
        </div>
      </div>

      {/* Social Icons */}
      <div className="flex items-center gap-3">
        {[Instagram, Linkedin, Twitter].map((Icon, i) => (
          <motion.button
            key={i}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center liquid-glass",
              "text-foreground/80 hover:text-foreground transition-colors"
            )}
          >
            <Icon size={18} />
          </motion.button>
        ))}
      </div>
    </nav>
  );
}
