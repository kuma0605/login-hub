<script setup lang="ts">
import { ref } from 'vue';
import {
  RadioTower,
  ShieldCheck,
  Lock,
  Mail,
  ArrowRight,
  Eye,
  EyeOff,
  Activity,
  Cpu,
  Wifi,
  KeyRound,
  CheckCircle2
} from 'lucide-vue-next';

const showPassword = ref(false);
const email = ref('operator@meridian-fleet.io');
const password = ref('••••••••••••');
const isSubmitting = ref(false);
const loginSuccess = ref(false);

const handleSubmit = () => {
  isSubmitting.value = true;
  setTimeout(() => {
    isSubmitting.value = false;
    loginSuccess.value = true;
    setTimeout(() => {
      loginSuccess.value = false;
    }, 3000);
  }, 1200);
};
</script>

<template>
  <main class="relative min-h-screen w-full flex items-center justify-center p-6 md:p-12 lg:p-16 z-10">
    <div class="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center pt-16">
      <!-- Left: Brand Identity & Live Fleet Telemetry -->
      <div class="lg:col-span-7 flex flex-col justify-center space-y-8">
        <!-- Brand Header -->
        <div class="space-y-4">
          <div class="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full glass-pill border border-line text-xs text-muted">
            <span class="w-2 h-2 rounded-full bg-signal animate-pulse" />
            <span class="font-mono text-[11px] uppercase tracking-wider text-signal font-medium">
              Cluster v4.18 • Edge Mesh
            </span>
          </div>

          <div class="flex items-center gap-3.5">
            <div class="w-12 h-12 rounded-2xl bg-signal/15 border border-signal/40 flex items-center justify-center shadow-[0_0_24px_rgba(58,224,198,0.25)]">
              <RadioTower class="w-6 h-6 text-signal" />
            </div>
            <div>
              <h2 class="text-2xl md:text-3xl font-bold tracking-tight text-ink">
                Meridian Fleet Console
              </h2>
              <p class="text-xs md:text-sm text-muted">
                Industrial Telemetry & Edge Gateway Authentication
              </p>
            </div>
          </div>

          <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink tracking-tight leading-[1.15] max-w-xl">
            Every sensor, gateway, and edge node —
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-signal via-cyan-300 to-emerald-400">
              on one console.
            </span>
          </h1>

          <p class="text-sm md:text-base text-muted max-w-lg leading-relaxed">
            Real-time telemetry aggregation and cryptographic perimeter security for industrial IoT mesh networks.
          </p>
        </div>

        <!-- Fleet Status Telemetry Widget -->
        <div class="glass-panel rounded-2xl p-5 border border-line max-w-xl space-y-4">
          <div class="flex items-center justify-between pb-3 border-b border-line/60">
            <div class="flex items-center gap-2">
              <Activity class="w-4 h-4 text-signal" />
              <span class="text-xs font-semibold uppercase tracking-wider text-ink font-mono">
                Fleet Topology Status
              </span>
            </div>
            <div class="flex items-center gap-1.5 text-xs text-emerald-400 font-mono">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>99.98% Nominal</span>
            </div>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div class="bg-surface/50 border border-line/50 p-3 rounded-xl">
              <div class="flex items-center gap-1.5 text-muted text-[11px] mb-1">
                <Wifi class="w-3.5 h-3.5 text-signal" />
                <span>Gateways</span>
              </div>
              <div class="text-lg font-bold text-ink font-mono">4 / 4</div>
              <div class="text-[10px] text-emerald-400 font-medium">All Linked</div>
            </div>

            <div class="bg-surface/50 border border-line/50 p-3 rounded-xl">
              <div class="flex items-center gap-1.5 text-muted text-[11px] mb-1">
                <Cpu class="w-3.5 h-3.5 text-cyan-400" />
                <span>Mesh Nodes</span>
              </div>
              <div class="text-lg font-bold text-ink font-mono">18 Active</div>
              <div class="text-[10px] text-muted">Zero Packet Loss</div>
            </div>

            <div class="bg-surface/50 border border-line/50 p-3 rounded-xl">
              <div class="flex items-center gap-1.5 text-muted text-[11px] mb-1">
                <Activity class="w-3.5 h-3.5 text-amber-400" />
                <span>Mesh Latency</span>
              </div>
              <div class="text-lg font-bold text-ink font-mono">12.4 ms</div>
              <div class="text-[10px] text-muted font-mono">p99 &lt; 28ms</div>
            </div>

            <div class="bg-surface/50 border border-line/50 p-3 rounded-xl">
              <div class="flex items-center gap-1.5 text-muted text-[11px] mb-1">
                <ShieldCheck class="w-3.5 h-3.5 text-signal" />
                <span>Perimeter</span>
              </div>
              <div class="text-lg font-bold text-ink font-mono">TLS 1.3</div>
              <div class="text-[10px] text-emerald-400">Ed25519 Cert</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right: Glassmorphic Authentication Card -->
      <div class="lg:col-span-5 flex justify-center lg:justify-end">
        <div class="glass-panel w-full max-w-md rounded-3xl p-7 sm:p-9 border border-line relative shadow-2xl">
          <!-- Subtle glow orb behind the card -->
          <div class="absolute -top-12 -right-12 w-48 h-48 bg-signal/10 rounded-full blur-3xl pointer-events-none" />

          <div class="relative space-y-6">
            <!-- Card Header -->
            <div class="space-y-1.5">
              <h3 class="text-xl font-bold text-ink tracking-tight">
                Operator Login
              </h3>
              <p class="text-xs text-muted">
                Provide cryptographically verified credentials to initialize telemetry stream.
              </p>
            </div>

            <div
              v-if="loginSuccess"
              class="p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2.5 transition-all"
            >
              <CheckCircle2 class="w-4 h-4 flex-shrink-0" />
              <span>Session authenticated. Dispatching token to Nexus Gateway...</span>
            </div>

            <!-- Form -->
            <form @submit.prevent="handleSubmit" class="space-y-4">
              <div class="space-y-1.5">
                <label class="block text-xs font-medium text-muted uppercase tracking-wider font-mono">
                  Work Identity / Email
                </label>
                <div class="relative">
                  <Mail class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none" />
                  <input
                    type="email"
                    required
                    v-model="email"
                    placeholder="operator@meridian-fleet.io"
                    class="w-full pl-10 pr-4 py-2.5 bg-surface/80 border border-line rounded-xl text-sm text-ink placeholder-muted/60 focus:outline-none focus:border-signal focus:ring-1 focus:ring-signal transition-colors font-mono"
                  />
                </div>
              </div>

              <div class="space-y-1.5">
                <div class="flex items-center justify-between">
                  <label class="block text-xs font-medium text-muted uppercase tracking-wider font-mono">
                    Passcode / Security Token
                  </label>
                  <a
                    href="#recovery"
                    @click.prevent
                    class="text-[11px] text-signal hover:underline"
                  >
                    Lost token?
                  </a>
                </div>
                <div class="relative">
                  <Lock class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none" />
                  <input
                    :type="showPassword ? 'text' : 'password'"
                    required
                    v-model="password"
                    placeholder="Enter cryptographic passphrase"
                    class="w-full pl-10 pr-10 py-2.5 bg-surface/80 border border-line rounded-xl text-sm text-ink placeholder-muted/60 focus:outline-none focus:border-signal focus:ring-1 focus:ring-signal transition-colors font-mono"
                  />
                  <button
                    type="button"
                    @click="showPassword = !showPassword"
                    class="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted hover:text-ink transition-colors"
                  >
                    <EyeOff v-if="showPassword" class="w-4 h-4" />
                    <Eye v-else class="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div class="flex items-center justify-between text-xs text-muted pt-1">
                <label class="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked
                    class="w-4 h-4 rounded border-line bg-surface text-signal focus:ring-signal focus:ring-offset-base"
                  />
                  <span>Remember terminal</span>
                </label>
                <span class="text-[11px] font-mono text-muted/80">Hardware Key Ready</span>
              </div>

              <button
                type="submit"
                :disabled="isSubmitting"
                class="w-full mt-2 py-3 px-4 bg-gradient-to-r from-signal to-emerald-400 text-base font-semibold rounded-xl text-sm shadow-[0_0_20px_rgba(58,224,198,0.3)] hover:shadow-[0_0_30px_rgba(58,224,198,0.5)] transition-all flex items-center justify-center gap-2 group disabled:opacity-50 cursor-pointer"
              >
                <div
                  v-if="isSubmitting"
                  class="w-4 h-4 border-2 border-base border-t-transparent rounded-full animate-spin"
                />
                <template v-else>
                  <span>Initialize Session</span>
                  <ArrowRight class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </template>
              </button>
            </form>

            <!-- SSO Divider -->
            <div class="relative flex items-center justify-center my-4">
              <div class="border-t border-line/80 w-full" />
              <span class="bg-surface px-3 text-[10px] font-mono uppercase text-muted tracking-wider absolute">
                Enterprise SSO
              </span>
            </div>

            <!-- SSO Providers -->
            <div class="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                class="py-2.5 px-3 rounded-xl bg-surface/70 border border-line hover:border-signal/40 hover:bg-white/5 transition-all text-xs font-medium text-ink flex items-center justify-center gap-2"
              >
                <KeyRound class="w-3.5 h-3.5 text-signal" />
                <span>SAML / Okta</span>
              </button>
              <button
                type="button"
                class="py-2.5 px-3 rounded-xl bg-surface/70 border border-line hover:border-signal/40 hover:bg-white/5 transition-all text-xs font-medium text-ink flex items-center justify-center gap-2"
              >
                <ShieldCheck class="w-3.5 h-3.5 text-cyan-400" />
                <span>Azure AD</span>
              </button>
            </div>

            <!-- Compliance & Security Badges -->
            <div class="pt-2 border-t border-line/60 flex items-center justify-between text-[10px] text-muted font-mono">
              <span class="flex items-center gap-1">
                <ShieldCheck class="w-3 h-3 text-signal" /> FIPS 140-3 Validated
              </span>
              <span>SOC 2 Type II</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
