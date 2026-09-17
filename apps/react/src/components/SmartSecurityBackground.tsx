import React from 'react';

interface Trace {
  offset: string;
  delay: string;
  length: string;
}

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
 */
export function SmartSecurityBackground({ className = '' }: SmartSecurityBackgroundProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 overflow-hidden select-none bg-[#eff2fb] ${className}`}
    >
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
      <div className="mask-fade-edges absolute inset-0">
        {horizontalTraces.map((trace) => (
          <span
            key={`h-${trace.offset}`}
            className="animate-trace-x absolute left-0 h-[2px] rounded-full"
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
            className="animate-trace-y absolute top-0 w-[2px] rounded-full"
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
            className="animate-node absolute h-2 w-2 rounded-full bg-[#38bdf8]"
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
      <div className="mask-fade-edges absolute inset-0">
        <div
          className="animate-sheen absolute -inset-y-1/2 left-[32%] w-[30rem] -translate-x-1/2"
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
          className="animate-bloom absolute left-[28%] top-[-20rem] h-[42rem] w-[42rem] rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(178,193,255,0.8) 0%, rgba(178,193,255,0) 68%)'
          }}
        />
        <div
          className="animate-bloom-alt absolute bottom-[-16rem] left-[-12rem] h-[32rem] w-[32rem] rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(125,146,245,0.4) 0%, rgba(125,146,245,0) 70%)'
          }}
        />
        <div
          className="animate-bloom-alt absolute bottom-[-18rem] right-[-10rem] h-[34rem] w-[34rem] rounded-full"
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
