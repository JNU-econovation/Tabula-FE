import React from "react";

const WaveBackground = () => {
  return (
    <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
      <svg
        className="relative block w-[200%] h-full"
        viewBox="0 0 2880 320"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#D8D4FF" stopOpacity="1" />
            <stop offset="100%" stopColor="#AFDCFF" stopOpacity="1" />
          </linearGradient>
        </defs>

        <path
          d="M0,32L96,37.3C192,43,384,53,576,80C768,107,960,149,1152,144C1344,139,1536,85,1728,80C1920,75,2112,117,2304,128C2496,139,2688,117,2784,106.7L2880,96L2880,320L2784,320C2688,320,2496,320,2304,320C2112,320,1920,320,1728,320C1536,320,1344,320,1152,320C960,320,768,320,576,320C384,320,192,320,96,320L0,320Z"
          fill="url(#waveGradient)"
          fillOpacity="0.6"
          className="animate-wave-slow"
        />

        <path
          d="M0,96L96,85.3C192,75,384,53,576,53.3C768,53,960,75,1152,101.3C1344,128,1536,160,1728,154.7C1920,149,2112,107,2304,90.7C2496,75,2688,85,2784,90.7L2880,96L2880,320L2784,320C2688,320,2496,320,2304,320C2112,320,1920,320,1728,320C1536,320,1344,320,1152,320C960,320,768,320,576,320C384,320,192,320,96,320L0,320Z"
          fill="url(#waveGradient)"
          fillOpacity="0.4"
          className="animate-wave-normal"
        />

        <path
          d="M0,160L96,154.7C192,149,384,139,576,154.7C768,171,960,213,1152,208C1344,203,1536,149,1728,138.7C1920,128,2112,160,2304,170.7C2496,181,2688,171,2784,165.3L2880,160L2880,320L2784,320C2688,320,2496,320,2304,320C2112,320,1920,320,1728,320C1536,320,1344,320,1152,320C960,320,768,320,576,320C384,320,192,320,96,320L0,320Z"
          fill="url(#waveGradient)"
          fillOpacity="0.3"
          className="animate-wave-fast"
        />
      </svg>
    </div>
  );
};

export default WaveBackground;
