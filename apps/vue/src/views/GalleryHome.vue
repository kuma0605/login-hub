<script setup lang="ts">
import { ref, computed } from 'vue';
import {
  Sparkles,
  ExternalLink,
  Code2,
  ArrowRight,
  RadioTower,
  Clock,
  Terminal,
  Orbit,
  Palette
} from 'lucide-vue-next';
import {
  showcaseThemes,
  showcaseCategories,
  type ShowcaseCategory
} from '@login-hub/shared-data';

const activeCategory = ref<ShowcaseCategory>('全部风格');

const filteredThemes = computed(() => {
  if (activeCategory.value === '全部风格') return showcaseThemes;
  return showcaseThemes.filter((t) => t.category === activeCategory.value);
});
</script>

<template>
  <div class="min-h-screen w-full bg-base text-ink relative selection:bg-signal selection:text-base">
    <!-- Subtle background glow orbs -->
    <div class="fixed top-0 left-1/4 w-96 h-96 bg-signal/10 rounded-full blur-[120px] pointer-events-none" />
    <div class="fixed bottom-10 right-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none" />

    <!-- Top Navigation -->
    <header class="sticky top-0 z-40 w-full backdrop-blur-md bg-base/80 border-b border-line/60">
      <div class="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-xl bg-signal/15 border border-signal/40 flex items-center justify-center shadow-[0_0_12px_rgba(58,224,198,0.25)]">
            <RadioTower class="w-4 h-4 text-signal" />
          </div>
          <div class="flex items-center gap-2 font-bold tracking-tight text-ink text-lg">
            <span>Login Hub</span>
            <span class="text-[11px] font-mono font-medium px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              Vue 3
            </span>
          </div>
        </div>

        <div class="flex items-center gap-3">
          <a
            href="http://localhost:5173"
            target="_blank"
            rel="noreferrer"
            class="px-3.5 py-1.5 rounded-full glass-pill text-xs font-medium text-ink hover:text-cyan-300 hover:border-cyan-500/40 transition-all flex items-center gap-2 group"
          >
            <Code2 class="w-3.5 h-3.5 text-cyan-400" />
            <span>React 画廊 (5173)</span>
            <ExternalLink class="w-3 h-3 text-muted group-hover:translate-x-0.5 transition-transform" />
          </a>

          <a
            href="https://github.com/kuma0605/login-hub"
            target="_blank"
            rel="noreferrer"
            class="p-2 rounded-full glass-pill text-muted hover:text-ink transition-colors"
            title="GitHub 仓库"
          >
            <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </a>
        </div>
      </div>
    </header>

    <!-- Hero Section -->
    <section class="relative pt-16 pb-12 px-6 max-w-7xl mx-auto text-center space-y-6">
      <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill border border-line text-xs text-muted shadow-lg shadow-black/20">
        <Sparkles class="w-3.5 h-3.5 text-signal" />
        <span class="font-mono text-signal font-medium">Showcase Collection</span>
        <span class="text-line">•</span>
        <span>高质量登录界面与动效背景</span>
      </div>

      <h1 class="text-4xl sm:text-5xl md:text-6xl font-extrabold text-ink tracking-tight max-w-3xl mx-auto leading-[1.15]">
        沉浸式、高品质的
        <span class="text-transparent bg-clip-text bg-gradient-to-r from-signal via-cyan-300 to-emerald-400">
          现代登录体验合集
        </span>
      </h1>

      <p class="text-sm sm:text-base text-muted max-w-2xl mx-auto leading-relaxed">
        收录工业级 IoT 拓扑、赛博朋克霓虹、3D 粒子力场与极简毛玻璃等多样化风格。Vue 3 与 React 双生态高保真对齐，独立解耦，开箱即用。
      </p>

      <!-- Categories Bar -->
      <div class="pt-4 flex flex-wrap items-center justify-center gap-2">
        <button
          v-for="cat in showcaseCategories"
          :key="cat"
          @click="activeCategory = cat"
          class="px-4 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer"
          :class="[
            activeCategory === cat
              ? 'bg-signal text-base font-semibold shadow-[0_0_16px_rgba(58,224,198,0.3)]'
              : 'glass-pill text-muted hover:text-ink hover:border-signal/40'
          ]"
        >
          {{ cat }}
        </button>
      </div>
    </section>

    <!-- Gallery Cards Grid -->
    <section class="max-w-7xl mx-auto px-6 pb-24">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="theme in filteredThemes"
          :key="theme.id"
          class="glass-panel rounded-3xl p-6 border border-line flex flex-col justify-between hover:border-signal/40 transition-all duration-300 group relative overflow-hidden"
        >
          <!-- Visual Thumbnail Area -->
          <div class="w-full h-44 rounded-2xl bg-base/80 border border-line/60 relative overflow-hidden mb-5 flex items-center justify-center group-hover:border-signal/30 transition-colors">
            <!-- IoT Mini Preview -->
            <div v-if="theme.id === 'iot-mesh'" class="relative w-full h-full p-4 flex flex-col justify-between">
              <div class="flex items-center justify-between z-10">
                <div class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-[10px] text-emerald-300 font-mono">
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  <span>LIVE TOPOLOGY</span>
                </div>
                <span class="text-[10px] font-mono text-muted">160x100 SVG</span>
              </div>

              <!-- Mini SVG Grid representation -->
              <div class="absolute inset-0 opacity-40 flex items-center justify-center pointer-events-none">
                <svg class="w-full h-full" viewBox="0 0 160 100">
                  <line x1="24" y1="26" x2="52" y2="48" stroke="#3ae0c6" stroke-width="0.5" />
                  <line x1="84" y1="32" x2="52" y2="48" stroke="#3ae0c6" stroke-width="0.5" />
                  <line x1="30" y1="74" x2="52" y2="48" stroke="#3ae0c6" stroke-width="0.5" />
                  <line x1="92" y1="70" x2="52" y2="48" stroke="#3ae0c6" stroke-width="0.5" />
                  <circle cx="52" cy="48" r="4" fill="#3ae0c6" opacity="0.8" />
                  <circle cx="24" cy="26" r="2.5" fill="#1a6f66" />
                  <circle cx="84" cy="32" r="2.5" fill="#1a6f66" />
                  <circle cx="30" cy="74" r="2.5" fill="#1a6f66" />
                  <circle cx="92" cy="70" r="2.5" fill="#1a6f66" />
                </svg>
              </div>

              <div class="z-10 flex items-center justify-between text-[11px] text-muted font-mono">
                <span>4 Gateways</span>
                <span>18 Nodes</span>
              </div>
            </div>

            <div v-else-if="theme.id === 'cyberpunk-neon'" class="flex flex-col items-center justify-center gap-2 text-rose-500">
              <Terminal class="w-8 h-8 opacity-70 group-hover:scale-110 transition-transform" />
              <span class="text-xs font-mono tracking-widest uppercase">NeoMatrix Cyberpunk</span>
            </div>

            <div v-else-if="theme.id === 'particles-3d'" class="flex flex-col items-center justify-center gap-2 text-indigo-400">
              <Orbit class="w-8 h-8 opacity-70 group-hover:scale-110 transition-transform" />
              <span class="text-xs font-mono tracking-widest uppercase">Celestial 3D Particles</span>
            </div>

            <div v-else class="flex flex-col items-center justify-center gap-2 text-sky-400">
              <Palette class="w-8 h-8 opacity-70 group-hover:scale-110 transition-transform" />
              <span class="text-xs font-mono tracking-widest uppercase">Minimal Frosted Aura</span>
            </div>
          </div>

          <!-- Info Area -->
          <div class="space-y-3 flex-1 flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between gap-2 mb-1.5">
                <span class="text-[11px] font-mono text-signal uppercase tracking-wider">
                  {{ theme.category }}
                </span>
                <div class="flex items-center gap-1.5">
                  <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-line text-muted">
                    React
                  </span>
                  <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-line text-muted">
                    Vue 3
                  </span>
                </div>
              </div>

              <h2 class="text-lg font-bold text-ink group-hover:text-signal transition-colors">
                {{ theme.name }}
              </h2>

              <p class="text-xs text-muted leading-relaxed line-clamp-2 mt-1">
                {{ theme.description }}
              </p>
            </div>

            <!-- Tags -->
            <div class="flex flex-wrap gap-1.5 pt-2">
              <span
                v-for="tag in theme.tags"
                :key="tag"
                class="text-[10px] px-2 py-0.5 rounded-full bg-surface/80 border border-line/60 text-muted"
              >
                {{ tag }}
              </span>
            </div>

            <!-- Action Link -->
            <div class="pt-4 border-t border-line/60">
              <router-link
                v-if="theme.status === 'active'"
                :to="`/view/${theme.id}`"
                class="w-full py-2.5 px-4 rounded-xl bg-signal/15 border border-signal/40 text-signal hover:bg-signal hover:text-base font-semibold text-xs transition-all flex items-center justify-center gap-2 group/btn cursor-pointer"
              >
                <span>进入全屏体验</span>
                <ArrowRight class="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
              </router-link>
              <div
                v-else
                class="w-full py-2.5 px-4 rounded-xl bg-white/5 border border-line/40 text-muted text-xs font-medium text-center flex items-center justify-center gap-1.5"
              >
                <Clock class="w-3.5 h-3.5 text-muted" />
                <span>正在研发中 • 敬请期待</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="border-t border-line/60 py-8 px-6 text-center text-xs text-muted space-y-2">
      <p>Login Hub • 高质量登录界面与动效背景精选合集 (React & Vue 3 Showcase Monorepo)</p>
      <p class="font-mono text-[11px] text-muted/60">MIT License • Built with Vite, Tailwind CSS, and Native SVG Compositor</p>
    </footer>
  </div>
</template>
