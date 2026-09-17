<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue';
import {
  meshLinks,
  meshNodes,
  meshPackets,
  visibleIds,
  nodeRadius,
  nodeStrokeColor,
  type MeshDensity
} from '@login-hub/shared-data';

const props = defineProps<{
  density: MeshDensity;
  animate: boolean;
}>();

const systemReducedMotion = ref(false);

onMounted(() => {
  const media = window.matchMedia('(prefers-reduced-motion: reduce)');
  systemReducedMotion.value = media.matches;
  const listener = (e: MediaQueryListEvent) => {
    systemReducedMotion.value = e.matches;
  };
  media.addEventListener('change', listener);
  onUnmounted(() => media.removeEventListener('change', listener));
});

const isAnimated = computed(() => props.animate && !systemReducedMotion.value);

const ids = computed(() => visibleIds(props.density));
const nodes = computed(() => meshNodes.filter((n) => ids.value.has(n.id)));
const byId = computed(() => new Map(nodes.value.map((n) => [n.id, n])));
const links = computed(() => meshLinks.filter(([a, b]) => ids.value.has(a) && ids.value.has(b)));
const packets = computed(() =>
  meshPackets.filter(({ from, to }) => ids.value.has(from) && ids.value.has(to))
);
</script>

<template>
  <div class="absolute inset-0 overflow-hidden bg-base pointer-events-none" aria-hidden="true">
    <svg
      class="absolute inset-0 h-full w-full opacity-90"
      viewBox="0 0 160 100"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <!-- Subtle radial glow around the central hub -->
        <radialGradient id="vueHubGlow" cx="52%" cy="48%" r="35%">
          <stop offset="0%" stop-color="#3ae0c6" stop-opacity="0.12" />
          <stop offset="100%" stop-color="#060a11" stop-opacity="0" />
        </radialGradient>
      </defs>

      <rect x="0" y="0" width="160" height="100" fill="url(#vueHubGlow)" />

      <!-- Network links -->
      <g stroke="#1d2b3f" stroke-width="0.18">
        <template v-for="[aId, bId] in links" :key="`link-${aId}-${bId}`">
          <line
            v-if="byId.get(aId) && byId.get(bId)"
            :x1="byId.get(aId)!.x"
            :y1="byId.get(aId)!.y"
            :x2="byId.get(bId)!.x"
            :y2="byId.get(bId)!.y"
            opacity="0.85"
          />
        </template>
      </g>

      <!-- Flowing telemetry packet dots -->
      <template v-if="isAnimated">
        <g v-for="(packet, i) in packets" :key="`packet-${packet.from}-${packet.to}-${i}`">
          <circle
            v-if="byId.get(packet.from) && byId.get(packet.to)"
            r="0.5"
            fill="#3ae0c6"
            :cx="byId.get(packet.from)!.x"
            :cy="byId.get(packet.from)!.y"
            opacity="0"
          >
            <animate
              attributeName="cx"
              :values="`${byId.get(packet.from)!.x}; ${byId.get(packet.from)!.x}; ${byId.get(packet.to)!.x}; ${byId.get(packet.to)!.x}`"
              keyTimes="0; 0.12; 0.85; 1"
              :dur="`${packet.duration + 3.5}s`"
              :begin="`${packet.delay}s`"
              repeatCount="indefinite"
            />
            <animate
              attributeName="cy"
              :values="`${byId.get(packet.from)!.y}; ${byId.get(packet.from)!.y}; ${byId.get(packet.to)!.y}; ${byId.get(packet.to)!.y}`"
              keyTimes="0; 0.12; 0.85; 1"
              :dur="`${packet.duration + 3.5}s`"
              :begin="`${packet.delay}s`"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0; 0.95; 0.95; 0"
              keyTimes="0; 0.12; 0.85; 1"
              :dur="`${packet.duration + 3.5}s`"
              :begin="`${packet.delay}s`"
              repeatCount="indefinite"
            />
          </circle>
        </g>
      </template>

      <!-- Nodes layer -->
      <g v-for="node in nodes" :key="`node-${node.id}`">
        <!-- Pulsing signal ripples on hub & gateways -->
        <circle
          v-if="isAnimated && node.kind !== 'device'"
          :cx="node.x"
          :cy="node.y"
          :r="nodeRadius[node.kind]"
          fill="none"
          :stroke="node.kind === 'hub' ? '#3ae0c6' : '#1a6f66'"
          :stroke-width="node.kind === 'hub' ? 0.18 : 0.14"
          opacity="0"
        >
          <animate
            attributeName="r"
            :from="nodeRadius[node.kind]"
            :to="node.kind === 'hub' ? nodeRadius[node.kind] * 3.4 : nodeRadius[node.kind] * 2.5"
            :dur="`${node.kind === 'hub' ? 3.6 : 4.4}s`"
            :begin="`${node.id * 0.45}s`"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0.5; 0"
            keyTimes="0; 1"
            :dur="`${node.kind === 'hub' ? 3.6 : 4.4}s`"
            :begin="`${node.id * 0.45}s`"
            repeatCount="indefinite"
          />
        </circle>

        <!-- Base node circle -->
        <circle
          :cx="node.x"
          :cy="node.y"
          :r="nodeRadius[node.kind]"
          fill="#0b1220"
          :stroke="nodeStrokeColor[node.kind]"
          :stroke-width="node.kind === 'hub' ? 0.32 : node.kind === 'gateway' ? 0.22 : 0.16"
        />

        <!-- Inner core status dots -->
        <circle v-if="node.kind === 'hub'" :cx="node.x" :cy="node.y" r="1.1" fill="#3ae0c6" />
        <circle v-if="node.kind === 'gateway'" :cx="node.x" :cy="node.y" r="0.55" fill="#1a6f66" />
        <circle v-if="node.kind === 'device'" :cx="node.x" :cy="node.y" r="0.3" fill="#25384f" />
      </g>
    </svg>

    <!-- Scrim: keeps the mesh readable as background -->
    <div class="absolute inset-0 bg-base/70 backdrop-blur-[0.5px]" />
  </div>
</template>
