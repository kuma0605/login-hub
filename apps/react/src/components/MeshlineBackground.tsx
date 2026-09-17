import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  meshlineLinks,
  meshlineNodes,
  meshlinePacketLinks,
  meshlineNodeRadius,
  meshlineStatusColor
} from '@login-hub/shared-data';

function nodeById(id: string) {
  return meshlineNodes.find((node) => node.id === id);
}

export function MeshlineBackground() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden bg-[#eef3f8]" aria-hidden="true">
      {/* Fine + Coarse Grid */}
      <div className="grid-field absolute inset-0" />
      <div className="grid-field-lg absolute inset-0" />

      {/* Radar Rings anchored in the center */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        {!reduceMotion &&
          [0, 1, 2].map((index) => (
            <motion.span
              key={index}
              className="absolute left-0 top-0 h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#0b5cff]/25"
              animate={{ scale: [0.45, 1.25], opacity: [0.45, 0] }}
              transition={{ duration: 6, ease: 'linear', repeat: Infinity, delay: index * 2 }}
            />
          ))}
        <span className="absolute left-0 top-0 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#0b5cff]/20" />
        <span className="absolute left-0 top-0 h-[760px] w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#0b5cff]/10" />
      </div>

      {/* Mesh Network Lines */}
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        {meshlineLinks.map((link) => {
          const from = nodeById(link.from);
          const to = nodeById(link.to);
          if (!from || !to) return null;
          return (
            <line
              key={`${link.from}-${link.to}`}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke="#0b5cff"
              strokeOpacity={0.25}
              strokeWidth={1}
              vectorEffect="non-scaling-stroke"
            />
          );
        })}
      </svg>

      {/* Dynamic Telemetry Packet Flow */}
      {!reduceMotion && (
        <svg className="absolute inset-0 h-full w-full">
          {meshlinePacketLinks.map((link, index) => {
            const from = nodeById(link.from);
            const to = nodeById(link.to);
            if (!from || !to) return null;
            return (
              <motion.circle
                key={`packet-${link.from}-${link.to}`}
                r={3}
                fill="#0b5cff"
                initial={{ opacity: 0 }}
                animate={{
                  cx: [`${from.x}%`, `${to.x}%`],
                  cy: [`${from.y}%`, `${to.y}%`],
                  opacity: [0, 0.95, 0.95, 0]
                }}
                transition={{ duration: 3.2, ease: 'linear', repeat: Infinity, delay: index * 0.7 }}
              />
            );
          })}
        </svg>
      )}

      {/* Mesh Nodes Layer */}
      {meshlineNodes.map((node, index) => {
        const size = meshlineNodeRadius[node.size];
        const color = meshlineStatusColor[node.status];
        return (
          <div
            key={node.id}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
          >
            {!reduceMotion && (
              <motion.span
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{ width: size * 12, height: size * 12, backgroundColor: color }}
                animate={{ opacity: [0.15, 0.02, 0.15], scale: [0.7, 1.15, 0.7] }}
                transition={{ duration: 4, ease: 'easeInOut', repeat: Infinity, delay: index * 0.35 }}
              />
            )}

            <span
              className="relative block rounded-full bg-white shadow-sm"
              style={{
                width: size * 4,
                height: size * 4,
                border: `${node.size === 'leaf' ? 1.5 : 2}px solid ${color}`
              }}
            />

            {node.size === 'hub' && (
              <>
                <span
                  className="absolute left-1/2 top-1/2 h-px w-16 -translate-x-1/2 -translate-y-1/2"
                  style={{ backgroundColor: color, opacity: 0.3 }}
                />
                <span
                  className="absolute left-1/2 top-1/2 h-16 w-px -translate-x-1/2 -translate-y-1/2"
                  style={{ backgroundColor: color, opacity: 0.3 }}
                />
              </>
            )}
          </div>
        );
      })}

      {/* Vertical Scan Sweep */}
      {!reduceMotion && (
        <motion.div
          className="scan-line absolute inset-x-0 h-44 opacity-40"
          animate={{ y: ['-12%', '112%'] }}
          transition={{ duration: 11, ease: 'linear', repeat: Infinity }}
        />
      )}

      {/* Corner Tech Brackets */}
      {[
        'left-6 top-6 border-l-2 border-t-2',
        'right-6 top-6 border-r-2 border-t-2',
        'left-6 bottom-6 border-b-2 border-l-2',
        'right-6 bottom-6 border-b-2 border-r-2'
      ].map((corner) => (
        <span key={corner} className={`absolute h-8 w-8 border-[#0b5cff]/35 ${corner}`} />
      ))}

      {/* Edge Soft Fade */}
      <div className="absolute inset-0 bg-[#eef3f8]/40" />
    </div>
  );
}
