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
  <div
    class="absolute inset-0 overflow-hidden pointer-events-none"
    style="
      background-color: #0f2438;
      background-image:
        radial-gradient(circle at 25% 45%, rgba(56, 189, 248, 0.28) 0%, transparent 55%),
        radial-gradient(circle at 78% 45%, rgba(14, 165, 233, 0.28) 0%, transparent 55%),
        linear-gradient(rgba(56, 189, 248, 0.07) 1px, transparent 1px),
        linear-gradient(90deg, rgba(56, 189, 248, 0.07) 1px, transparent 1px);
      background-size: 100% 100%, 100% 100%, 40px 40px, 40px 40px;
    "
    aria-hidden="true"
  >
    <svg
      class="absolute inset-0 h-full w-full opacity-95"
      viewBox="0 0 160 100"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <!-- Dual ice cyan/sky glows: one for left hub, one for right side nodes -->
        <radialGradient id="vueLeftMeshGlow" cx="35%" cy="48%" r="45%">
          <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.3" />
          <stop offset="100%" stop-color="#0f2438" stop-opacity="0" />
        </radialGradient>
        <radialGradient id="vueRightMeshGlow" cx="75%" cy="48%" r="45%">
          <stop offset="0%" stop-color="#0ea5e9" stop-opacity="0.3" />
          <stop offset="100%" stop-color="#0f2438" stop-opacity="0" />
        </radialGradient>
      </defs>

      <rect x="0" y="0" width="160" height="100" fill="url(#vueLeftMeshGlow)" />
      <rect x="0" y="0" width="160" height="100" fill="url(#vueRightMeshGlow)" />

      <!-- Network links - pure luminous ice cyan -->
      <g stroke="rgba(56, 189, 248, 0.55)" stroke-width="0.38">
        <template v-for="[aId, bId] in links" :key="`link-${aId}-${bId}`">
          <line
            v-if="byId.get(aId) && byId.get(bId)"
            :x1="byId.get(aId)!.x"
            :y1="byId.get(aId)!.y"
            :x2="byId.get(bId)!.x"
            :y2="byId.get(bId)!.y"
            opacity="0.95"
          />
        </template>
      </g>

      <!-- Flowing telemetry packet dots - pure crisp white-cyan, zero yellow -->
      <template v-if="isAnimated">
        <g v-for="(packet, i) in packets" :key="`packet-${packet.from}-${packet.to}-${i}`">
          <circle
            v-if="byId.get(packet.from) && byId.get(packet.to)"
            r="0.8"
            fill="#e0f2fe"
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
              values="0; 1; 1; 0"
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
          :stroke="node.kind === 'hub' ? '#38bdf8' : '#60a5fa'"
          :stroke-width="node.kind === 'hub' ? 0.3 : 0.22"
          opacity="0"
        >
          <animate
            attributeName="r"
            :from="nodeRadius[node.kind]"
            :to="node.kind === 'hub' ? nodeRadius[node.kind] * 3.6 : nodeRadius[node.kind] * 2.6"
            :dur="`${node.kind === 'hub' ? 3.2 : 4.0}s`"
            :begin="`${node.id * 0.45}s`"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0.85; 0"
            keyTimes="0; 1"
            :dur="`${node.kind === 'hub' ? 3.2 : 4.0}s`"
            :begin="`${node.id * 0.45}s`"
            repeatCount="indefinite"
          />
        </circle>

        <!-- Base node circle -->
        <circle
          :cx="node.x"
          :cy="node.y"
          :r="nodeRadius[node.kind]"
          fill="#163450"
          :stroke="node.kind === 'hub' ? '#38bdf8' : node.kind === 'gateway' ? '#60a5fa' : '#7dd3fc'"
          :stroke-width="node.kind === 'hub' ? 0.5 : node.kind === 'gateway' ? 0.38 : 0.28"
        />

        <!-- Inner core status dots -->
        <circle v-if="node.kind === 'hub'" :cx="node.x" :cy="node.y" r="1.2" fill="#38bdf8" />
        <circle v-if="node.kind === 'gateway'" :cx="node.x" :cy="node.y" r="0.7" fill="#60a5fa" />
        <circle v-if="node.kind === 'device'" :cx="node.x" :cy="node.y" r="0.45" fill="#7dd3fc" opacity="0.9" />
      </g>
    </svg>
  </div>
</template>
