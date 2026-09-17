import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  meshLinks,
  meshNodes,
  meshPackets,
  visibleIds,
  nodeRadius,
  nodeStrokeColor,
  type MeshDensity
} from '@login-hub/shared-data';

export interface DeviceMeshBackgroundProps {
  density: MeshDensity;
  animate: boolean;
}

export const DeviceMeshBackground: React.FC<DeviceMeshBackgroundProps> = ({
  density,
  animate
}) => {
  const reduceMotion = useReducedMotion();
  const isAnimated = animate && !reduceMotion;

  const ids = visibleIds(density);
  const nodes = meshNodes.filter((n) => ids.has(n.id));
  const byId = new Map(nodes.map((n) => [n.id, n]));
  const links = meshLinks.filter(([a, b]) => ids.has(a) && ids.has(b));
  const packets = meshPackets.filter(({ from, to }) => ids.has(from) && ids.has(to));

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{
        backgroundColor: '#0f2438',
        backgroundImage: `
          radial-gradient(circle at 25% 45%, rgba(56, 189, 248, 0.28) 0%, transparent 55%),
          radial-gradient(circle at 78% 45%, rgba(14, 165, 233, 0.28) 0%, transparent 55%),
          linear-gradient(rgba(56, 189, 248, 0.07) 1px, transparent 1px),
          linear-gradient(90deg, rgba(56, 189, 248, 0.07) 1px, transparent 1px)
        `,
        backgroundSize: '100% 100%, 100% 100%, 40px 40px, 40px 40px'
      }}
      aria-hidden="true"
    >
      <svg
        className="absolute inset-0 h-full w-full opacity-95"
        viewBox="0 0 160 100"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Dual ice cyan/sky glows: one for left hub, one for right side nodes */}
          <radialGradient id="leftMeshGlow" cx="35%" cy="48%" r="45%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#0f2438" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="rightMeshGlow" cx="75%" cy="48%" r="45%">
            <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#0f2438" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect x="0" y="0" width="160" height="100" fill="url(#leftMeshGlow)" />
        <rect x="0" y="0" width="160" height="100" fill="url(#rightMeshGlow)" />

        {/* Network links - pure luminous ice cyan */}
        <g stroke="rgba(56, 189, 248, 0.55)" strokeWidth="0.38">
          {links.map(([aId, bId]) => {
            const a = byId.get(aId);
            const b = byId.get(bId);
            if (!a || !b) return null;
            return (
              <line
                key={`link-${aId}-${bId}`}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                opacity="0.95"
              />
            );
          })}
        </g>

        {/* Flowing telemetry packet dots - pure crisp white-cyan, zero yellow */}
        {packets.map((packet, i) => {
          const a = byId.get(packet.from);
          const b = byId.get(packet.to);
          if (!a || !b) return null;

          return (
            <motion.circle
              key={`packet-${packet.from}-${packet.to}-${i}`}
              r="0.8"
              fill="#e0f2fe"
              initial={{ cx: a.x, cy: a.y, opacity: 0 }}
              animate={
                isAnimated
                  ? {
                      cx: [a.x, a.x, b.x, b.x],
                      cy: [a.y, a.y, b.y, b.y],
                      opacity: [0, 1, 1, 0]
                    }
                  : { cx: a.x, cy: a.y, opacity: 0 }
              }
              transition={{
                duration: packet.duration,
                delay: packet.delay,
                times: [0, 0.12, 0.85, 1],
                repeat: Infinity,
                repeatDelay: 3.5,
                ease: 'easeInOut'
              }}
            />
          );
        })}

        {/* Nodes layer */}
        {nodes.map((node) => {
          const r = nodeRadius[node.kind];
          const isHub = node.kind === 'hub';
          const isGateway = node.kind === 'gateway';

          return (
            <g key={`node-${node.id}`}>
              {/* Pulsing signal ripples on hub & gateways */}
              {isAnimated && (isHub || isGateway) && (
                <motion.circle
                  cx={node.x}
                  cy={node.y}
                  r={r}
                  fill="none"
                  stroke={isHub ? '#38bdf8' : '#60a5fa'}
                  strokeWidth={isHub ? '0.3' : '0.22'}
                  initial={{ scale: 1, opacity: 0.85 }}
                  animate={{
                    scale: isHub ? 3.6 : 2.6,
                    opacity: 0
                  }}
                  style={{ originX: `${node.x}px`, originY: `${node.y}px` }}
                  transition={{
                    duration: isHub ? 3.2 : 4.0,
                    ease: 'linear',
                    repeat: Infinity,
                    delay: node.id * 0.45
                  }}
                />
              )}

              {/* Base node circle */}
              <circle
                cx={node.x}
                cy={node.y}
                r={r}
                fill="#163450"
                stroke={isHub ? '#38bdf8' : isGateway ? '#60a5fa' : '#7dd3fc'}
                strokeWidth={isHub ? 0.5 : isGateway ? 0.38 : 0.28}
              />

              {/* Inner core status dots */}
              {isHub && <circle cx={node.x} cy={node.y} r={1.2} fill="#38bdf8" />}
              {isGateway && <circle cx={node.x} cy={node.y} r={0.7} fill="#60a5fa" />}
              {node.kind === 'device' && <circle cx={node.x} cy={node.y} r={0.45} fill="#7dd3fc" opacity="0.9" />}
            </g>
          );
        })}
      </svg>
    </div>
  );
};
