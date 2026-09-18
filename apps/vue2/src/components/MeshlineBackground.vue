<template>
  <div class="pointer-events-none absolute inset-0 overflow-hidden bg-[#eef3f8]" aria-hidden="true">
    <!-- Fine + Coarse Grid -->
    <div class="grid-field absolute inset-0" />
    <div class="grid-field-lg absolute inset-0" />

    <!-- Radar Rings anchored in the center -->
    <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
      <span
        v-for="i in 3"
        :key="i"
        class="absolute left-0 top-0 h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#0b5cff]/25 animate-radar-pulse"
        :style="{ animationDelay: `${(i - 1) * 2}s` }"
      />
      <span class="absolute left-0 top-0 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#0b5cff]/20" />
      <span class="absolute left-0 top-0 h-[760px] w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#0b5cff]/10" />
    </div>

    <!-- Mesh Network Lines -->
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" class="absolute inset-0 h-full w-full">
      <template v-for="link in meshlineLinks">
        <line
          v-if="nodeById(link.from) && nodeById(link.to)"
          :key="`${link.from}-${link.to}`"
          :x1="nodeById(link.from).x"
          :y1="nodeById(link.from).y"
          :x2="nodeById(link.to).x"
          :y2="nodeById(link.to).y"
          stroke="#0b5cff"
          stroke-opacity="0.25"
          stroke-width="1"
          vector-effect="non-scaling-stroke"
        />
      </template>
    </svg>

    <!-- Dynamic Telemetry Packet Flow -->
    <svg class="absolute inset-0 h-full w-full">
      <template v-for="(link, index) in meshlinePacketLinks">
        <circle
          v-if="nodeById(link.from) && nodeById(link.to)"
          :key="`packet-${link.from}-${link.to}`"
          r="3"
          fill="#0b5cff"
          :cx="`${nodeById(link.from).x}%`"
          :cy="`${nodeById(link.from).y}%`"
          opacity="0"
        >
          <animate
            attributeName="cx"
            :values="`${nodeById(link.from).x}%; ${nodeById(link.to).x}%`"
            keyTimes="0; 1"
            dur="3.2s"
            :begin="`${index * 0.7}s`"
            repeatCount="indefinite"
          />
          <animate
            attributeName="cy"
            :values="`${nodeById(link.from).y}%; ${nodeById(link.to).y}%`"
            keyTimes="0; 1"
            dur="3.2s"
            :begin="`${index * 0.7}s`"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0; 0.95; 0.95; 0"
            keyTimes="0; 0.15; 0.85; 1"
            dur="3.2s"
            :begin="`${index * 0.7}s`"
            repeatCount="indefinite"
          />
        </circle>
      </template>
    </svg>

    <!-- Mesh Nodes Layer -->
    <div
      v-for="(node, index) in meshlineNodes"
      :key="node.id"
      class="absolute -translate-x-1/2 -translate-y-1/2"
      :style="{ left: `${node.x}%`, top: `${node.y}%` }"
    >
      <span
        class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full animate-ping opacity-20"
        :style="{
          width: `${meshlineNodeRadius[node.size] * 10}px`,
          height: `${meshlineNodeRadius[node.size] * 10}px`,
          backgroundColor: meshlineStatusColor[node.status],
          animationDuration: '4s',
          animationDelay: `${index * 0.35}s`
        }"
      />

      <span
        class="relative block rounded-full bg-white shadow-sm"
        :style="{
          width: `${meshlineNodeRadius[node.size] * 4}px`,
          height: `${meshlineNodeRadius[node.size] * 4}px`,
          border: `${node.size === 'leaf' ? 1.5 : 2}px solid ${meshlineStatusColor[node.status]}`
        }"
      />

      <template v-if="node.size === 'hub'">
        <span
          class="absolute left-1/2 top-1/2 h-px w-16 -translate-x-1/2 -translate-y-1/2"
          :style="{ backgroundColor: meshlineStatusColor[node.status], opacity: 0.3 }"
        />
        <span
          class="absolute left-1/2 top-1/2 h-16 w-px -translate-x-1/2 -translate-y-1/2"
          :style="{ backgroundColor: meshlineStatusColor[node.status], opacity: 0.3 }"
        />
      </template>
    </div>

    <!-- Vertical Scan Sweep -->
    <div class="scan-line absolute inset-x-0 h-44 opacity-40 animate-scan-sweep" />

    <!-- Corner Tech Brackets -->
    <span class="absolute h-8 w-8 border-[#0b5cff]/35 left-6 top-6 border-l-2 border-t-2" />
    <span class="absolute h-8 w-8 border-[#0b5cff]/35 right-6 top-6 border-r-2 border-t-2" />
    <span class="absolute h-8 w-8 border-[#0b5cff]/35 left-6 bottom-6 border-b-2 border-l-2" />
    <span class="absolute h-8 w-8 border-[#0b5cff]/35 right-6 bottom-6 border-b-2 border-r-2" />

    <!-- Edge Soft Fade -->
    <div class="absolute inset-0 bg-[#eef3f8]/40" />
  </div>
</template>

<script>
import {
  meshlineLinks,
  meshlineNodes,
  meshlinePacketLinks,
  meshlineNodeRadius,
  meshlineStatusColor
} from '@login-hub/shared-data';

export default {
  name: 'MeshlineBackground',
  data() {
    return {
      meshlineLinks,
      meshlineNodes,
      meshlinePacketLinks,
      meshlineNodeRadius,
      meshlineStatusColor
    };
  },
  methods: {
    nodeById(id) {
      return meshlineNodes.find((node) => node.id === id);
    }
  }
};
</script>

<style scoped>
/* MeshlineBackground — all grid/scan/radar CSS self-contained */

.grid-field {
  background-image:
    linear-gradient(to right, rgba(11, 92, 255, 0.07) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(11, 92, 255, 0.07) 1px, transparent 1px);
  background-size: 44px 44px;
}
.grid-field-lg {
  background-image:
    linear-gradient(to right, rgba(11, 92, 255, 0.13) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(11, 92, 255, 0.13) 1px, transparent 1px);
  background-size: 220px 220px;
}
.scan-line {
  background-image: linear-gradient(
    to bottom,
    rgba(11, 92, 255, 0) 0%,
    rgba(11, 92, 255, 0.5) 50%,
    rgba(11, 92, 255, 0) 100%
  );
}

@keyframes scan-sweep {
  0%   { transform: translateY(-12%); }
  100% { transform: translateY(112%); }
}
@keyframes radar-pulse {
  0%   { transform: translate(-50%, -50%) scale(0.45); opacity: 0.45; }
  100% { transform: translate(-50%, -50%) scale(1.25); opacity: 0; }
}

.animate-scan-sweep  { animation: scan-sweep 11s linear infinite; }
.animate-radar-pulse { animation: radar-pulse 6s linear infinite; }
</style>
