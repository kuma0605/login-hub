<script setup lang="ts">
import { ref } from 'vue';
import { DeviceMeshBackground } from './components';
import IotMeshLogin from './views/IotMeshLogin.vue';
import { showcaseThemes } from '@login-hub/shared-data';

const themeId = ref<string>('iot-mesh');
</script>

<template>
  <div class="relative min-h-screen w-full bg-base text-ink overflow-x-hidden flex flex-col justify-center selection:bg-signal selection:text-base">
    <!-- Dynamic Background -->
    <DeviceMeshBackground
      v-if="themeId === 'iot-mesh'"
      density="standard"
      :animate="true"
    />
    <div
      v-else
      class="fixed inset-0 bg-base flex items-center justify-center text-muted text-sm font-mono"
    >
      <span>{{ showcaseThemes.find((t) => t.id === themeId)?.name }} • 即将推出</span>
    </div>

    <!-- Main Login Screen -->
    <IotMeshLogin v-if="themeId === 'iot-mesh'" />

    <!-- Extreme Minimalist Dots (纯净点点点) -->
    <div class="fixed bottom-6 inset-x-0 z-50 flex justify-center pointer-events-none">
      <div class="glass-pill px-3 py-1.5 rounded-full flex items-center gap-2 pointer-events-auto shadow-xl shadow-black/60 border border-line/70">
        <button
          v-for="theme in showcaseThemes"
          :key="theme.id"
          @click="themeId = theme.id"
          class="h-2 rounded-full transition-all duration-300 cursor-pointer"
          :class="[
            theme.id === themeId
              ? 'w-6 bg-signal shadow-[0_0_8px_#3ae0c6]'
              : 'w-2 bg-line hover:bg-muted'
          ]"
          :title="theme.name"
        />
      </div>
    </div>
  </div>
</template>
