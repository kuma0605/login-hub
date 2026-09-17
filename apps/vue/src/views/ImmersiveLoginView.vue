<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { DeviceMeshBackground } from '../components';
import FloatingDock from '../components/FloatingDock.vue';
import IotMeshLogin from './IotMeshLogin.vue';
import { type MeshDensity, showcaseThemes } from '@login-hub/shared-data';
import { Construction, ArrowLeft } from 'lucide-vue-next';

const route = useRoute();
const currentId = computed(() => (route.params.id as string) || 'iot-mesh');

const density = ref<MeshDensity>('standard');
const animate = ref<boolean>(true);

const theme = computed(() =>
  showcaseThemes.find((t) => t.id === currentId.value)
);
</script>

<template>
  <div class="relative min-h-screen w-full bg-base text-ink overflow-x-hidden flex flex-col justify-between">
    <!-- Dynamic Background Layer -->
    <DeviceMeshBackground
      v-if="currentId === 'iot-mesh'"
      :density="density"
      :animate="animate"
    />
    <div
      v-else
      class="absolute inset-0 bg-gradient-to-br from-base via-surface to-base opacity-90"
    />

    <!-- Main Content Area -->
    <IotMeshLogin v-if="currentId === 'iot-mesh'" />

    <div v-else class="min-h-screen flex items-center justify-center p-6 z-10">
      <div class="glass-panel p-8 rounded-3xl max-w-md text-center space-y-4">
        <div class="w-12 h-12 rounded-2xl bg-signal/15 border border-signal/40 flex items-center justify-center mx-auto text-signal">
          <Construction class="w-6 h-6" />
        </div>
        <h2 class="text-xl font-bold text-ink">{{ theme?.name || '未知模板' }}</h2>
        <p class="text-sm text-muted">{{ theme?.description || '该模板正在研发中，敬请期待。' }}</p>
        <div class="inline-block px-3 py-1 rounded-full bg-white/5 border border-line text-xs font-mono text-muted">
          Coming in Next Release • 敬请期待
        </div>
        <router-link
          to="/"
          class="inline-flex items-center justify-center gap-2 w-full mt-4 py-2.5 px-4 rounded-xl bg-signal text-base font-semibold text-xs transition-opacity hover:opacity-90"
        >
          <ArrowLeft class="w-4 h-4" />
          <span>返回画廊大厅</span>
        </router-link>
      </div>
    </div>

    <!-- Bottom Floating Control Dock -->
    <FloatingDock
      :current-theme-id="currentId"
      :density="density"
      :animate="animate"
      @change-density="(d) => (density = d)"
      @toggle-animate="animate = !animate"
    />
  </div>
</template>
