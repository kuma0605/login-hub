<script setup lang="ts">
import { ref, computed } from 'vue';
import { DeviceMeshBackground, GalleryHeader } from './components';
import IotMeshLogin from './views/IotMeshLogin.vue';
import { type MeshDensity, showcaseThemes } from '@login-hub/shared-data';
import { Construction } from 'lucide-vue-next';

const themeId = ref<string>('iot-mesh');
const density = ref<MeshDensity>('standard');
const animate = ref<boolean>(true);

const currentTheme = computed(
  () => showcaseThemes.find((t) => t.id === themeId.value) || showcaseThemes[0]
);
</script>

<template>
  <div class="relative min-h-screen w-full bg-base text-ink overflow-x-hidden flex flex-col justify-between">
    <!-- Dynamic Background -->
    <DeviceMeshBackground
      v-if="themeId === 'iot-mesh'"
      :density="density"
      :animate="animate"
    />
    <div
      v-else
      class="absolute inset-0 bg-gradient-to-br from-base via-surface to-base opacity-80"
    />

    <!-- Top Floating Gallery Controller -->
    <GalleryHeader
      :current-theme-id="themeId"
      :density="density"
      :animate="animate"
      @select-theme="(id) => (themeId = id)"
      @change-density="(d) => (density = d)"
      @toggle-animate="animate = !animate"
    />

    <!-- Main Content Area -->
    <IotMeshLogin v-if="themeId === 'iot-mesh'" />

    <div v-else class="min-h-screen flex items-center justify-center p-6 z-10">
      <div class="glass-panel p-8 rounded-3xl max-w-md text-center space-y-4">
        <div class="w-12 h-12 rounded-2xl bg-signal/15 border border-signal/40 flex items-center justify-center mx-auto text-signal">
          <Construction class="w-6 h-6" />
        </div>
        <h2 class="text-xl font-bold text-ink">{{ currentTheme.name }}</h2>
        <p class="text-sm text-muted">{{ currentTheme.description }}</p>
        <div class="inline-block px-3 py-1 rounded-full bg-white/5 border border-line text-xs font-mono text-muted">
          Coming in Next Release • Readily Extensible
        </div>
        <button
          @click="themeId = 'iot-mesh'"
          class="block w-full mt-4 py-2.5 px-4 rounded-xl bg-signal text-base font-semibold text-xs transition-opacity hover:opacity-90"
        >
          Back to IoT Mesh Console
        </button>
      </div>
    </div>

    <!-- Subtle Footer watermark -->
    <footer class="relative z-10 w-full py-4 px-6 text-center text-xs text-muted/60 font-mono">
      Login Hub Monorepo Showcase • Vue 3 Edition
    </footer>
  </div>
</template>
