<script setup lang="ts">
import { computed } from 'vue';
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Layers,
  Code2,
  ExternalLink,
  Sparkles
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

const currentIndex = computed(() =>
  showcaseThemes.findIndex((t) => t.id === props.currentThemeId)
);

const activeTheme = computed(() => {
  const idx = currentIndex.value >= 0 ? currentIndex.value : 0;
  return showcaseThemes[idx];
});

const handlePrev = () => {
  const nextIdx = (currentIndex.value - 1 + showcaseThemes.length) % showcaseThemes.length;
  emit('selectTheme', showcaseThemes[nextIdx].id);
};

const handleNext = () => {
  const nextIdx = (currentIndex.value + 1) % showcaseThemes.length;
  emit('selectTheme', showcaseThemes[nextIdx].id);
};

const densities: MeshDensity[] = ['sparse', 'standard', 'dense'];
</script>

<template>
  <div class="fixed bottom-6 inset-x-0 z-50 flex justify-center pointer-events-none px-4">
    <div class="glass-pill px-4 py-2.5 rounded-full flex items-center gap-3.5 shadow-2xl shadow-black/80 pointer-events-auto border border-line/90 relative max-w-2xl animate-in fade-in slide-in-from-bottom-3 duration-300">
      <!-- Prev Button -->
      <button
        @click="handlePrev"
        class="p-1.5 rounded-full text-muted hover:text-ink hover:bg-white/5 transition-colors cursor-pointer"
        title="上一个风格 (Left Arrow)"
      >
        <ChevronLeft class="w-4 h-4" />
      </button>

      <!-- Theme Title Badge -->
      <div class="flex items-center gap-2 text-xs">
        <Sparkles class="w-3.5 h-3.5 text-signal" />
        <span class="font-semibold text-ink max-w-[120px] sm:max-w-[180px] truncate">
          {{ activeTheme.name }}
        </span>
        <span class="text-[10px] font-mono text-muted/70 hidden md:inline">
          {{ String(currentIndex + 1).padStart(2, '0') }}/{{ String(showcaseThemes.length).padStart(2, '0') }}
        </span>
      </div>

      <!-- Dots Pagination (点点点切换器) -->
      <div class="flex items-center gap-1.5 px-1 py-0.5">
        <button
          v-for="theme in showcaseThemes"
          :key="theme.id"
          @click="emit('selectTheme', theme.id)"
          class="group relative py-1 focus:outline-none cursor-pointer"
          :title="`${theme.name} (${theme.status === 'active' ? '可交互' : '研发中'})`"
        >
          <!-- Visual Dot -->
          <div
            class="h-2 rounded-full transition-all duration-300"
            :class="[
              theme.id === currentThemeId
                ? 'w-6 bg-signal shadow-[0_0_10px_#3ae0c6]'
                : 'w-2 bg-line hover:bg-muted/80'
            ]"
          />

          <!-- Floating Tooltip -->
          <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5 hidden group-hover:flex flex-col items-center pointer-events-none z-50">
            <div class="glass-panel px-2.5 py-1 rounded-lg text-[10px] font-medium text-ink whitespace-nowrap shadow-xl border border-line flex items-center gap-1.5">
              <span>{{ theme.name }}</span>
              <span
                v-if="theme.status !== 'active'"
                class="text-[9px] px-1 py-0.2 rounded bg-white/10 text-muted uppercase font-mono"
              >
                Soon
              </span>
            </div>
            <div class="w-1.5 h-1.5 bg-line rotate-45 -mt-1" />
          </div>
        </button>
      </div>

      <!-- Next Button -->
      <button
        @click="handleNext"
        class="p-1.5 rounded-full text-muted hover:text-ink hover:bg-white/5 transition-colors cursor-pointer"
        title="下一个风格 (Right Arrow)"
      >
        <ChevronRight class="w-4 h-4" />
      </button>

      <div class="h-4 w-px bg-line/80 hidden sm:block" />

      <!-- Density Selector (Active for IoT mesh) -->
      <div v-if="currentThemeId === 'iot-mesh'" class="hidden sm:flex items-center gap-1 text-xs">
        <Layers class="w-3.5 h-3.5 text-muted mr-0.5" />
        <button
          v-for="d in densities"
          :key="d"
          @click="emit('changeDensity', d)"
          class="px-2 py-0.5 rounded-full text-[10px] capitalize transition-all font-medium cursor-pointer"
          :class="[
            density === d
              ? 'bg-signal text-base font-bold shadow-sm'
              : 'text-muted hover:text-ink'
          ]"
        >
          {{ d === 'sparse' ? '疏' : d === 'standard' ? '标' : '密' }}
        </button>
      </div>

      <!-- Animation Toggle -->
      <button
        @click="emit('toggleAnimate')"
        :title="animate ? '暂停动效' : '开启动效'"
        class="p-1.5 rounded-full transition-colors cursor-pointer"
        :class="[
          animate ? 'text-signal hover:bg-signal/10' : 'text-muted hover:text-ink'
        ]"
      >
        <Pause v-if="animate" class="w-3.5 h-3.5" />
        <Play v-else class="w-3.5 h-3.5" />
      </button>

      <div class="h-4 w-px bg-line/80" />

      <!-- Cross Link to React Edition (5175) -->
      <a
        href="http://localhost:5175"
        target="_blank"
        rel="noreferrer"
        class="flex items-center gap-1.5 text-xs text-cyan-300 hover:text-cyan-200 font-medium px-2 py-1 rounded-full hover:bg-cyan-500/10 transition-colors group"
        title="切换至 React 版本 (端口 5175)"
      >
        <Code2 class="w-3.5 h-3.5" />
        <span class="hidden md:inline">React</span>
        <ExternalLink class="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
      </a>
    </div>
  </div>
</template>
