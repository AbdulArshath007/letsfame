
const logos = [
  "https://www.letsfame.com/assets/img/features/feature-1.png",
  "https://www.letsfame.com/assets/img/features/feature-2.png",
  "https://www.letsfame.com/assets/img/features/feature-3.png",
  "https://www.letsfame.com/assets/img/features/feature-4.png",
  "https://www.letsfame.com/assets/img/features/feature-5.png",
  "https://www.letsfame.com/assets/img/features/feature-6.png",
  "https://www.letsfame.com/assets/img/features/feature-7.png",
  "https://www.letsfame.com/assets/img/features/feature-8.png",
];

export default function LogoLoop() {
  const doubled = [...logos, ...logos];

  return (
    <div className="w-full py-8 sm:py-12 mt-6 sm:mt-10 overflow-hidden">
      <p className="text-center text-[9px] sm:text-[10px] tracking-[4px] sm:tracking-[6px] uppercase text-zinc-600 font-black mb-6 sm:mb-10">
        As featured in
      </p>
      <div className="relative flex">
        {/* fade edges */}
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

        <div className="flex animate-logo-loop gap-8 sm:gap-16 items-center">
          {doubled.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`featured-${(i % logos.length) + 1}`}
              className="h-8 w-auto object-contain grayscale invert opacity-40 hover:opacity-80 transition-opacity duration-300 shrink-0"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
