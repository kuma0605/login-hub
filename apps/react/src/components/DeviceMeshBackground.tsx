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
    <div className="absolute inset-0 overflow-hidden bg-base pointer-events-none" aria-hidden="true">
      <svg
        className="absolute inset-0 h-full w-full opacity-90"
        viewBox="0 0 160 100"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Subtle radial glow around the central hub */}
          <radialGradient id="hubGlow" cx="52%" cy="48%" r="35%">
            <stop offset="0%" stopColor="#3ae0c6" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#060a11" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect x="0" y="0" width="160" height="100" fill="url(#hubGlow)" />

        {/* Network links */}
        <g stroke="#1d2b3f" strokeWidth="0.18">
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
                opacity="0.85"
              />
            );
          })}
        </g>

        {/* Flowing telemetry packet dots */}
        {packets.map((packet, i) => {
          const a = byId.get(packet.from);
          const b = byId.get(packet.to);
          if (!a || !b) return null;

          return (
            <motion.circle
              key={`packet-${packet.from}-${packet.to}-${i}`}
              r="0.5"
              fill="#3ae0c6"
              initial={{ cx: a.x, cy: a.y, opacity: 0 }}
              animate={
                isAnimated
                  ? {
                      cx: [a.x, a.x, b.x, b.x],
                      cy: [a.y, a.y, b.y, b.y],
                      opacity: [0, 0.95, 0.95, 0]
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
          const stroke = nodeStrokeColor[node.kind];

          return (
            <g key={`node-${node.id}`}>
              {/* Pulsing signal ripples on hub & gateways */}
              {isAnimated && (isHub || isGateway) && (
                <motion.circle
                  cx={node.x}
                  cy={node.y}
                  r={r}
                  fill="none"
                  stroke={isHub ? '#3ae0c6' : '#1a6f66'}
                  strokeWidth={isHub ? '0.18' : '0.14'}
                  initial={{ scale: 1, opacity: 0.5 }}
                  animate={{
                    scale: isHub ? 3.4 : 2.5,
                    opacity: 0
                  }}
                  style={{ originX: `${node.x}px`, originY: `${node.y}px` }}
                  transition={{
                    duration: isHub ? 3.6 : 4.4,
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
                fill="#0b1220"
                stroke={stroke}
                strokeWidth={isHub ? 0.32 : isGateway ? 0.22 : 0.16}
              />

              {/* Inner core status dots */}
              {isHub && <circle cx={node.x} cy={node.y} r={1.1} fill="#3ae0c6" />}
              {isGateway && <circle cx={node.x} cy={node.y} r={0.55} fill="#1a6f66" />}
              {node.kind === 'device' && <circle cx={node.x} cy={node.y} r={0.3} fill="#25384f" />}
            </g>
          );
        })}
      </svg>

      {/* Scrim: keeps the mesh readable as background and never competes with the foreground form */}
      <div className="absolute inset-0 bg-base/70 backdrop-blur-[0.5px]" />
    </div>
  );
};
