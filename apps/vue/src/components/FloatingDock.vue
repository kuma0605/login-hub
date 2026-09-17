<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import {
  ArrowLeft,
  Sparkles,
  Layers,
  Play,
  Pause,
  ExternalLink,
  Code2,
  ChevronUp
} from 'lucide-vue-next';
import { showcaseThemes, type MeshDensity } from '@login-hub/shared-data';

const props = defineProps<{
  currentThemeId: string;
  density: MeshDensity;
  animate: boolean;
}>();

const emit = defineEmits<{
  (e: 'changeDensity', d: MeshDensity): void;
  (e: 'toggleAnimate'): void;
}>();

const router = useRouter();
const dropdownOpen = ref(false);

const activeTheme = computed(
  () => showcaseThemes.find((t) => t.id === props.currentThemeId) || showcaseThemes[0]
);

const densities: MeshDensity[] = ['sparse', 'standard', 'dense'];

const handleSelectTheme = (id: string) => {
  router.push(`/view/${id}`);
  dropdownOpen.value = false;
};
</script>

<template>
  <div class="fixed bottom-6 inset-x-0 z-50 flex justify-center pointer-events-none px-4">
    <div className="glass-pill px-4 py-2.5 rounded-full flex items-center gap-3 shadow-2xl shadow-black/60 pointer-events-auto border border-line/90 relative max-w-2xl">
      <!-- Return to Gallery -->
      <router-link
        to="/"
        class="flex items-center gap-1.5 text-xs text-muted hover:text-ink font-medium px-2 py-1 rounded-full hover:bg-white/5 transition-colors group"
        title="返回画廊大厅"
      >
        <ArrowLeft class="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
        <span class="hidden sm:inline">画廊</span>
      </router-link>

      <div class="h-4 w-px bg-line/80" />

      <!-- Theme Quick Switcher -->
      <div class="relative">
        <button
          @click="dropdownOpen = !dropdownOpen"
          class="flex items-center gap-2 text-xs font-semibold text-ink hover:text-signal transition-colors group cursor-pointer"
        >
          <Sparkles class="w-3.5 h-3.5 text-signal group-hover:rotate-12 transition-transform" />
          <span class="max-w-[130px] sm:max-w-[180px] truncate">{{ activeTheme.name }}</span>
          <ChevronUp
            class="w-3.5 h-3.5 text-muted transition-transform"
            :class="{ 'rotate-180': dropdownOpen }"
          />
        </button>

        <template v-if="dropdownOpen">
          <div class="fixed inset-0 z-40" @click="dropdownOpen = false" />
          <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-72 glass-panel rounded-2xl p-2 z-50 shadow-2xl border border-line animate-in fade-in slide-in-from-bottom-2 duration-200">
            <div class="px-3 py-1.5 text-[10px] font-mono uppercase text-muted tracking-wider">
              快速切换模板
            </div>
            <div class="space-y-1">
              <button
                v-for="theme in showcaseThemes"
                :key="theme.id"
                :disabled="theme.status !== 'active'"
                @click="handleSelectTheme(theme.id)"
                class="w-full text-left px-3 py-2 rounded-xl transition-all flex items-center justify-between text-xs"
                :class="[
                  theme.id === currentThemeId
                    ? 'bg-signal/15 border border-signal/40 text-signal font-semibold'
                    : theme.status === 'active'
                    ? 'hover:bg-white/5 text-ink cursor-pointer'
                    : 'opacity-40 cursor-not-allowed text-muted'
                ]"
              >
                <span class="truncate">{{ theme.name }}</span>
                <span
                  v-if="theme.status !== 'active'"
                  class="text-[9px] px-1.5 py-0.5 rounded bg-white/10 text-muted uppercase font-mono"
                >
                  Soon
                </span>
              </button>
            </div>
          </div>
        </template>
      </div>

      <div class="h-4 w-px bg-line/80" />

      <!-- Density Selector -->
      <div class="hidden sm:flex items-center gap-1">
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
          {{ d }}
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

      <!-- Cross Link to React (5173) with same route -->
      <a
        :href="`http://localhost:5173/view/${currentThemeId}`"
        target="_blank"
        rel="noreferrer"
        class="flex items-center gap-1.5 text-xs text-cyan-300 hover:text-cyan-200 font-medium px-2 py-1 rounded-full hover:bg-cyan-500/10 transition-colors group"
        title="在 React (5173) 中打开同款页面"
      >
        <Code2 class="w-3.5 h-3.5" />
        <span class="hidden md:inline">React 版</span>
        <ExternalLink class="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
      </a>
    </div>
  </div>
</template>
