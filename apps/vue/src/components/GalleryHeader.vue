<script setup lang="ts">
import { ref, computed } from 'vue';
import {
  Sparkles,
  Layers,
  Play,
  Pause,
  ExternalLink,
  Code2,
  ChevronDown
} from 'lucide-vue-next';
import { showcaseThemes, type MeshDensity } from '@login-hub/shared-data';

const props = defineProps<{
  currentThemeId: string;
  density: MeshDensity;
  animate: boolean;
}>();

const emit = defineEmits<{
  (e: 'selectTheme', id: string): void;
  (e: 'changeDensity', d: MeshDensity): void;
  (e: 'toggleAnimate'): void;
}>();

const dropdownOpen = ref(false);
const activeTheme = computed(
  () => showcaseThemes.find((t) => t.id === props.currentThemeId) || showcaseThemes[0]
);

const densities: MeshDensity[] = ['sparse', 'standard', 'dense'];
</script>

<template>
  <header class="fixed top-4 left-4 right-4 z-50 flex items-center justify-between pointer-events-none">
    <!-- Left: Brand & Theme Selector -->
    <div class="flex items-center gap-3 pointer-events-auto">
      <div class="glass-pill px-3.5 py-2 rounded-full flex items-center gap-2.5 text-xs text-ink shadow-lg shadow-black/40">
        <div class="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981]" />
        <span class="font-semibold tracking-wider uppercase text-[11px] text-muted">
          Login Hub
        </span>
        <span class="text-line">/</span>
        <span class="font-mono text-emerald-400 font-medium">Vue 3</span>
      </div>

      <!-- Theme Switcher Dropdown -->
      <div class="relative">
        <button
          @click="dropdownOpen = !dropdownOpen"
          class="glass-pill px-3.5 py-2 rounded-full flex items-center gap-2 text-xs text-ink hover:border-signal/50 transition-colors shadow-lg shadow-black/40 group"
        >
          <Sparkles class="w-3.5 h-3.5 text-signal group-hover:scale-110 transition-transform" />
          <span class="font-medium">{{ activeTheme.name }}</span>
          <ChevronDown
            class="w-3.5 h-3.5 text-muted transition-transform"
            :class="{ 'rotate-180': dropdownOpen }"
          />
        </button>

        <template v-if="dropdownOpen">
          <div class="fixed inset-0 z-40" @click="dropdownOpen = false" />
          <div class="absolute top-full left-0 mt-2 w-72 glass-panel rounded-2xl p-2 z-50 shadow-2xl border border-line">
            <div class="px-3 py-2 text-[10px] font-mono uppercase text-muted tracking-wider">
              Select Showcase Theme
            </div>
            <div class="space-y-1">
              <button
                v-for="theme in showcaseThemes"
                :key="theme.id"
                :disabled="theme.status !== 'active'"
                @click="emit('selectTheme', theme.id); dropdownOpen = false;"
                class="w-full text-left px-3 py-2.5 rounded-xl transition-all flex items-start justify-between"
                :class="[
                  theme.id === currentThemeId
                    ? 'bg-signal/15 border border-signal/40 text-signal'
                    : theme.status === 'active'
                    ? 'hover:bg-white/5 text-ink'
                    : 'opacity-40 cursor-not-allowed text-muted'
                ]"
              >
                <div>
                  <div class="text-xs font-semibold flex items-center gap-1.5">
                    {{ theme.name }}
                    <span
                      v-if="theme.status !== 'active'"
                      class="text-[9px] px-1.5 py-0.5 rounded bg-white/10 text-muted uppercase tracking-wider font-mono"
                    >
                      Soon
                    </span>
                  </div>
                  <div class="text-[11px] text-muted line-clamp-1 mt-0.5 font-normal">
                    {{ theme.description }}
                  </div>
                </div>
              </button>
            </div>
          </div>
        </template>
      </div>
    </div>

    <!-- Right: Controls & React Cross-Link -->
    <div class="flex items-center gap-2.5 pointer-events-auto">
      <!-- Density Selector -->
      <div class="glass-pill px-2.5 py-1.5 rounded-full flex items-center gap-1 text-xs shadow-lg shadow-black/40">
        <Layers class="w-3.5 h-3.5 text-muted ml-1" />
        <button
          v-for="d in densities"
          :key="d"
          @click="emit('changeDensity', d)"
          class="px-2 py-0.5 rounded-full text-[11px] capitalize transition-all font-medium"
          :class="[
            density === d
              ? 'bg-signal text-base font-semibold shadow-sm'
              : 'text-muted hover:text-ink'
          ]"
        >
          {{ d }}
        </button>
      </div>

      <!-- Animation Toggle -->
      <button
        @click="emit('toggleAnimate')"
        :title="animate ? 'Pause Animation' : 'Resume Animation'"
        class="glass-pill p-2 rounded-full flex items-center justify-center transition-all shadow-lg shadow-black/40"
        :class="[
          animate ? 'text-signal hover:border-signal/50' : 'text-muted hover:text-ink border-line'
        ]"
      >
        <Pause v-if="animate" class="w-4 h-4" />
        <Play v-else class="w-4 h-4" />
      </button>

      <!-- Cross-Link to React App -->
      <a
        href="http://localhost:5173"
        target="_blank"
        rel="noreferrer"
        class="glass-pill px-3.5 py-2 rounded-full flex items-center gap-2 text-xs font-medium text-ink hover:text-cyan-300 hover:border-cyan-500/40 transition-all shadow-lg shadow-black/40 group"
        title="Open React Showcase on Port 5173"
      >
        <Code2 class="w-3.5 h-3.5 text-cyan-300" />
        <span>React Edition</span>
        <ExternalLink class="w-3 h-3 text-muted group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
      </a>
    </div>
  </header>
</template>
