<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import {
  User,
  KeyRound,
  Eye,
  EyeOff,
  AlertTriangle,
  Fingerprint,
  Loader2,
  CheckCircle2,
  Activity,
  RadioTower
} from 'lucide-vue-next';
import { nodegridGateways, nodegridStatusTone } from '@login-hub/shared-data';

const operator = ref('a.vance@nodegrid.io');
const key = ref('access•token•48');
const showKey = ref(false);
const phase = ref<'idle' | 'verifying' | 'granted'>('idle');
const error = ref<string | null>(null);

// Live Sparkline series
const throughput = ref<number[]>([
  45, 52, 48, 55, 60, 58, 62, 65, 59, 63, 68, 72, 70, 74, 69, 73, 76, 75, 78, 82,
  79, 85, 81, 86, 84, 88, 85, 89, 92, 87, 91, 93, 89, 94, 90, 93, 95, 92, 96, 94
]);

let timer: ReturnType<typeof setInterval> | null = null;

onMounted(() => {
  timer = setInterval(() => {
    const list = throughput.value;
    const last = list[list.length - 1];
    const drift = (Math.random() - 0.48) * 12;
    const next = Math.min(98, Math.max(30, last + drift));
    throughput.value = [...list.slice(1), next];
  }, 1200);
});

onUnmounted(() => {
  if (timer) clearInterval(timer);
});

const handleSubmit = () => {
  if (phase.value === 'verifying') return;
  if (!operator.value.includes('@')) {
    error.value = 'Operator ID must be a valid credentialed address.';
    return;
  }
  if (key.value.length < 6) {
    error.value = 'Access key must be at least 6 characters.';
    return;
  }
  error.value = null;
  phase.value = 'verifying';
  setTimeout(() => {
    phase.value = 'granted';
  }, 1400);
};

const latestThroughput = computed(() => throughput.value[throughput.value.length - 1]);
const w = 280;
const h = 50;

const pts = computed(() =>
  throughput.value.map((v, i) => {
    const x = (i / (throughput.value.length - 1)) * w;
    const y = h - (v / 100) * h;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  })
);

const linePath = computed(() => `M ${pts.value.join(' L ')}`);
const areaPath = computed(() => `${linePath.value} L ${w},${h} L 0,${h} Z`);
</script>

<template>
  <div class="relative min-h-screen w-full flex flex-col justify-center items-center z-10 text-[#e8f7ff] font-mono px-4 py-12">
    <!-- Main Grid: Left Telemetry & Right Login Card -->
    <main class="mx-auto flex w-full max-w-6xl flex-col-reverse items-center justify-center gap-10 px-4 sm:px-8 lg:grid lg:grid-cols-[minmax(0,1fr)_440px] lg:items-center lg:gap-16">
      <!-- Left Telemetry Column -->
      <div class="w-full space-y-5">
        <div>
          <p class="text-[10px] uppercase tracking-[0.3em] text-[#67e8f9]/90 font-semibold">
            Live mesh telemetry
          </p>
          <h2 class="mt-2 text-2xl font-bold text-white tracking-tight">
            8,048 devices reporting across 4 gateways
          </h2>
        </div>

        <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
          <!-- Sparkline Throughput Module -->
          <section class="hud-corner relative border border-[#67e8f9]/30 bg-[#1f4866]/45 p-4 backdrop-blur-md">
            <header class="mb-2 flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.18em] text-white/90">
              <span class="flex items-center gap-2">
                <Activity class="w-3.5 h-3.5 text-[#67e8f9]" />
                Mesh Throughput
              </span>
              <span class="text-[10px] text-[#99f6e4] font-mono">LIVE</span>
            </header>

            <svg :viewBox="`0 0 ${w} ${h}`" class="h-14 w-full overflow-visible">
              <path :d="areaPath" fill="rgba(103,232,249,0.15)" />
              <path
                :d="linePath"
                fill="none"
                stroke="#67e8f9"
                stroke-width="1.8"
                stroke-linejoin="round"
                stroke-linecap="round"
              />
              <circle
                :cx="w"
                :cy="h - (latestThroughput / 100) * h"
                r="3"
                fill="#a5f3fc"
                class="animate-pulse"
              />
            </svg>

            <div class="mt-2 flex items-baseline justify-between">
              <span class="text-xl font-bold text-[#67e8f9] tabular-nums">
                {{ (latestThroughput * 12.4).toFixed(0) }}
                <span class="text-[11px] font-normal text-[#a9cadd]">msg/s</span>
              </span>
              <span class="text-[10px] text-[#a9cadd]">P95 42ms • Zero loss</span>
            </div>
          </section>

          <!-- Gateways Status Module -->
          <section class="hud-corner relative border border-[#67e8f9]/30 bg-[#1f4866]/45 p-4 backdrop-blur-md">
            <header class="mb-2.5 flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.18em] text-white/90">
              <span class="flex items-center gap-2">
                <RadioTower class="w-3.5 h-3.5 text-[#67e8f9]" />
                Active Gateways
              </span>
              <span class="text-[10px] text-[#a9cadd]">4 NODES</span>
            </header>

            <ul class="divide-y divide-[#67e8f9]/15">
              <li
                v-for="g in nodegridGateways"
                :key="g.id"
                class="flex items-center gap-3 py-2 first:pt-0 last:pb-0"
              >
                <span
                  class="h-1.5 w-1.5 shrink-0 rounded-full animate-pulse"
                  :class="nodegridStatusTone[g.status].dot"
                />
                <div class="min-w-0 flex-1">
                  <p class="truncate text-xs font-medium text-white">{{ g.label }}</p>
                  <p class="text-[10px] text-[#a9cadd]">
                    {{ g.id }} · {{ g.region }}
                  </p>
                </div>
                <div class="text-right">
                  <p class="text-xs text-white/90 tabular-nums">{{ g.devices.toLocaleString() }}</p>
                  <p
                    class="text-[9px] font-bold tracking-wider"
                    :class="nodegridStatusTone[g.status].text"
                  >
                    {{ nodegridStatusTone[g.status].label }}
                  </p>
                </div>
              </li>
            </ul>
          </section>
        </div>
      </div>

      <!-- Right Login Card -->
      <div class="flex w-full justify-center lg:justify-end">
        <div
          class="hud-corner relative w-full max-w-[440px] overflow-hidden border border-[#67e8f9]/30 bg-[rgba(31,72,102,0.65)] shadow-[0_0_40px_rgba(2,14,26,0.8)] backdrop-blur-xl animate-fade-in"
        >
          <!-- Scanning Sweep line -->
          <div class="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
            <div class="h-16 w-full bg-[linear-gradient(to_bottom,transparent,rgba(165,243,252,0.1),transparent)] animate-pulse" />
          </div>

          <div class="relative px-7 pb-7 pt-8 sm:px-9 sm:pb-9">
            <div class="flex items-center justify-between">
              <span class="text-[10px] uppercase tracking-[0.3em] text-[#a9cadd]">
                SEC // TIER-3
              </span>
              <span class="flex items-center gap-1.5 text-[10px] text-[#99f6e4] font-semibold">
                <span class="h-1.5 w-1.5 animate-ping rounded-full bg-[#99f6e4]" />
                LINK SECURE
              </span>
            </div>

            <h1 class="mt-4 text-2xl sm:text-3xl font-bold leading-tight tracking-tight text-white">
              Operator Access
            </h1>
            <p class="mt-1.5 max-w-sm text-xs leading-relaxed text-[#a9cadd]">
              Authenticate to reach the device mesh control plane. Sessions are keyed to hardware tokens.
            </p>

            <form @submit.prevent="handleSubmit" class="mt-6 space-y-4" novalidate>
              <div>
                <label class="mb-1.5 block text-[10px] uppercase tracking-[0.22em] text-[#a9cadd]">
                  Operator ID
                </label>
                <div class="flex items-center gap-2.5 border border-[#67e8f9]/30 bg-[#102c44]/70 px-3 py-2.5 transition-colors focus-within:border-[#67e8f9]">
                  <User class="w-4 h-4 text-[#67e8f9]/80" />
                  <input
                    type="email"
                    required
                    v-model="operator"
                    placeholder="a.vance@nodegrid.io"
                    class="w-full bg-transparent text-xs text-white placeholder-[#a9cadd]/60 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <div class="flex items-baseline justify-between mb-1.5">
                  <label class="block text-[10px] uppercase tracking-[0.22em] text-[#a9cadd]">
                    Access Key
                  </label>
                  <a
                    href="#recover"
                    @click.prevent
                    class="text-[11px] text-[#7dd3fc] hover:text-[#67e8f9]"
                  >
                    Key recovery
                  </a>
                </div>
                <div class="flex items-center gap-2.5 border border-[#67e8f9]/30 bg-[#102c44]/70 px-3 py-2.5 transition-colors focus-within:border-[#67e8f9]">
                  <KeyRound class="w-4 h-4 text-[#67e8f9]/80" />
                  <input
                    :type="showKey ? 'text' : 'password'"
                    required
                    v-model="key"
                    placeholder="••••••••••••"
                    class="w-full bg-transparent text-xs text-white placeholder-[#a9cadd]/60 focus:outline-none"
                  />
                  <button
                    type="button"
                    @click="showKey = !showKey"
                    class="text-[#a9cadd] hover:text-[#67e8f9] transition-colors"
                  >
                    <EyeOff v-if="showKey" class="w-4 h-4" />
                    <Eye v-else class="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div class="flex items-center justify-between pt-1 text-xs text-[#a9cadd]">
                <label class="flex cursor-pointer items-center gap-2">
                  <input
                    type="checkbox"
                    checked
                    class="h-3.5 w-3.5 border border-[#67e8f9]/30 bg-[#1a4160] text-[#67e8f9] accent-[#67e8f9]"
                  />
                  <span>Trust this terminal</span>
                </label>
                <span class="text-[10px] text-[#99f6e4]">YubiKey Ready</span>
              </div>

              <p
                v-if="error"
                class="flex items-start gap-2 border border-red-400/40 bg-red-500/10 px-3 py-2 text-xs text-red-300"
              >
                <AlertTriangle class="w-4 h-4 shrink-0 mt-0.5" />
                <span>{{ error }}</span>
              </p>

              <button
                type="submit"
                :disabled="phase !== 'idle'"
                class="group relative flex w-full items-center justify-center gap-2 border border-[#67e8f9]/60 bg-[#67e8f9]/20 px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] text-[#67e8f9] shadow-[0_0_20px_rgba(103,232,249,0.3)] hover:bg-[#67e8f9]/30 hover:text-white transition-all cursor-pointer disabled:opacity-60"
              >
                <Loader2 v-if="phase === 'verifying'" class="w-4 h-4 animate-spin" />
                <CheckCircle2 v-else-if="phase === 'granted'" class="w-4 h-4 text-[#99f6e4]" />
                <Fingerprint v-else class="w-4 h-4" />
                <span v-if="phase === 'idle'">Authenticate Session</span>
                <span v-else-if="phase === 'verifying'">Verifying token…</span>
                <span v-else class="text-[#99f6e4]">Access granted</span>
              </button>
            </form>

            <p class="mt-5 border-t border-[#67e8f9]/20 pt-4 text-[9px] text-[#a9cadd]/80 leading-relaxed">
              NODEGRID CONTROL · BUILD 4.18.2 · AES-256 / TLS 1.3 · MUTUAL CERTIFICATE BOUND
            </p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
