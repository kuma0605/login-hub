import React from 'react';

interface Trace {
  offset: string;
  delay: string;
  length: string;
}

/** All keyframes and utility classes scoped to this component — no global index.css needed */
const STYLES = `
  .ss-mask-fade-edges {
    -webkit-mask-image: radial-gradient(120% 100% at 50% 25%, #000 40%, transparent 100%);
    mask-image: radial-gradient(120% 100% at 50% 25%, #000 40%, transparent 100%);
  }
  .ss-mask-clear-hero {
    -webkit-mask-image: radial-gradient(34rem 30rem at 76% 30%, transparent 30%, #000 78%);
    mask-image: radial-gradient(34rem 30rem at 76% 30%, transparent 30%, #000 78%);
  }
  @keyframes ss-bloom-breathe {
    0%, 100% { transform: translate(-50%, 0) scale(0.92); opacity: 0.45; }
    50%       { transform: translate(-50%, 2rem) scale(1.18); opacity: 1; }
  }
  @keyframes ss-bloom-breathe-alt {
    0%, 100% { transform: translate(0, 0) scale(1.14); opacity: 0.35; }
    50%       { transform: translate(-2rem, -1.5rem) scale(0.94); opacity: 0.9; }
  }
  @keyframes ss-trace-x {
    0%        { transform: translateX(-40%); opacity: 0; }
    8%        { opacity: 1; }
    64%       { opacity: 1; }
    80%, 100% { transform: translateX(150%); opacity: 0; }
  }
  @keyframes ss-trace-y {
    0%        { transform: translateY(-50%); opacity: 0; }
    8%        { opacity: 1; }
    64%       { opacity: 1; }
    80%, 100% { transform: translateY(160%); opacity: 0; }
  }
  @keyframes ss-sheen-sweep {
    0%   { transform: translate3d(-65%, -25%, 0) rotate(12deg); opacity: 0; }
    18%  { opacity: 1; }
    70%  { opacity: 1; }
    100% { transform: translate3d(65%, 25%, 0) rotate(12deg); opacity: 0; }
  }
  @keyframes ss-node-pulse {
    0%, 100% { transform: scale(0.5); opacity: 0; }
    35%      { transform: scale(1); opacity: 1; }
    70%      { transform: scale(1.6); opacity: 0; }
  }
  .ss-animate-bloom     { animation: ss-bloom-breathe 6.5s ease-in-out infinite; }
  .ss-animate-bloom-alt { animation: ss-bloom-breathe-alt 8s ease-in-out infinite; }
  .ss-animate-trace-x   { animation: ss-trace-x 4.2s linear infinite; }
  .ss-animate-trace-y   { animation: ss-trace-y 5s linear infinite; }
  .ss-animate-sheen     { animation: ss-sheen-sweep 7s ease-in-out infinite; }
  .ss-animate-node      { animation: ss-node-pulse 3.2s ease-in-out infinite; }
`;

const horizontalTraces: Trace[] = [
  { offset: '22%', delay: '0s', length: '20rem' },
  { offset: '58%', delay: '1.8s', length: '28rem' },
  { offset: '84%', delay: '3.4s', length: '24rem' }
];

const verticalTraces: Trace[] = [
  { offset: '10%', delay: '1.2s', length: '22rem' },
  { offset: '31%', delay: '3.1s', length: '16rem' },
  { offset: '52%', delay: '0.5s', length: '26rem' }
];

const nodes = [
  { left: '14%', top: '34%', delay: '0s' },
  { left: '36%', top: '72%', delay: '0.9s' },
  { left: '63%', top: '88%', delay: '2.1s' },
  { left: '88%', top: '82%', delay: '1.4s' }
];

export interface SmartSecurityBackgroundProps {
  className?: string;
}

/**
 * SmartSecurityBackground:
 * Ambient smart security edge network backdrop with breathing violet/blue blooms,
 * signal streaks, flaring node points, and diagonal sheen sweeps.
 * All animation CSS is self-contained — no dependency on global index.css.
 */
export function SmartSecurityBackground({ className = '' }: SmartSecurityBackgroundProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 overflow-hidden select-none bg-[#eff2fb] ${className}`}
    >
      {/* Scoped animation styles — injected once per mount */}
      <style>{STYLES}</style>

      {/* Subtle coordinate grid layer */}
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(79, 106, 232, 0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(79, 106, 232, 0.06) 1px, transparent 1px)',
          backgroundSize: '36px 36px'
        }}
      />

      {/* Signal streaks + flaring node points */}
      <div className="ss-mask-fade-edges absolute inset-0">
        {horizontalTraces.map((trace) => (
          <span
            key={`h-${trace.offset}`}
            className="ss-animate-trace-x absolute left-0 h-[2px] rounded-full"
            style={{
              top: trace.offset,
              width: trace.length,
              animationDelay: trace.delay,
              background:
                'linear-gradient(90deg, rgba(79,106,232,0) 0%, rgba(79,106,232,0.6) 45%, rgba(56,189,248,0.95) 100%)',
              boxShadow: '0 0 10px rgba(56,189,248,0.6)'
            }}
          />
        ))}

        {verticalTraces.map((trace) => (
          <span
            key={`v-${trace.offset}`}
            className="ss-animate-trace-y absolute top-0 w-[2px] rounded-full"
            style={{
              left: trace.offset,
              height: trace.length,
              animationDelay: trace.delay,
              background:
                'linear-gradient(180deg, rgba(125,146,245,0) 0%, rgba(125,146,245,0.6) 45%, rgba(56,189,248,0.95) 100%)',
              boxShadow: '0 0 10px rgba(125,146,245,0.6)'
            }}
          />
        ))}

        {nodes.map((node) => (
          <span
            key={`${node.left}-${node.top}`}
            className="ss-animate-node absolute h-2 w-2 rounded-full bg-[#38bdf8]"
            style={{
              left: node.left,
              top: node.top,
              animationDelay: node.delay,
              boxShadow: '0 0 14px 3px rgba(56,189,248,0.5)'
            }}
          />
        ))}
      </div>

      {/* Diagonal sheen light sweep */}
      <div className="ss-mask-fade-edges absolute inset-0">
        <div
          className="ss-animate-sheen absolute -inset-y-1/2 left-[32%] w-[30rem] -translate-x-1/2"
          style={{
            background:
              'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(214,226,255,0.7) 45%, rgba(255,255,255,0.85) 55%, rgba(214,226,255,0) 100%)',
            filter: 'blur(30px)'
          }}
        />
      </div>

      {/* Ambient Breathing Blooms */}
      <div className="absolute inset-0">
        <div
          className="ss-animate-bloom absolute left-[28%] top-[-20rem] h-[42rem] w-[42rem] rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(178,193,255,0.8) 0%, rgba(178,193,255,0) 68%)'
          }}
        />
        <div
          className="ss-animate-bloom-alt absolute bottom-[-16rem] left-[-12rem] h-[32rem] w-[32rem] rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(125,146,245,0.4) 0%, rgba(125,146,245,0) 70%)'
          }}
        />
        <div
          className="ss-animate-bloom-alt absolute bottom-[-18rem] right-[-10rem] h-[34rem] w-[34rem] rounded-full"
          style={{
            animationDelay: '3.5s',
            background:
              'radial-gradient(circle, rgba(56,189,248,0.36) 0%, rgba(56,189,248,0) 70%)'
          }}
        />
      </div>

      {/* Bottom smooth ambient fade */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-white/40 pointer-events-none" />
    </div>
  );
}

export default SmartSecurityBackground;
