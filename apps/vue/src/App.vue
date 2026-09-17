<script setup lang="ts">
import { ref, computed } from 'vue';
import { Copy, Check } from 'lucide-vue-next';
import { DeviceMeshBackground } from './components';
import MeshlineBackground from './components/MeshlineBackground.vue';
import CircuitField from './components/CircuitField.vue';
import SmartSecurityBackground from './components/SmartSecurityBackground.vue';
import IotMeshLogin from './views/IotMeshLogin.vue';
import MeshlineLogin from './views/MeshlineLogin.vue';
import NodegridLogin from './views/NodegridLogin.vue';
import SmartSecurityLogin from './views/SmartSecurityLogin.vue';
import { showcaseThemes } from '@login-hub/shared-data';

const themeId = ref<string>('iot-mesh');
const copiedKey = ref<string | null>(null);

const currentTheme = computed(
  () => showcaseThemes.find((t) => t.id === themeId.value) || showcaseThemes[0]
);

const copySnippet = (code: string, key: string) => {
  navigator.clipboard.writeText(code);
  copiedKey.value = key;
  setTimeout(() => {
    copiedKey.value = null;
  }, 2000);
};
</script>

<template>
  <div class="relative min-h-screen w-full bg-base text-ink overflow-x-hidden flex flex-col justify-center selection:bg-signal selection:text-base">
    <!-- Dynamic Backgrounds -->
    <DeviceMeshBackground
      v-if="themeId === 'iot-mesh'"
      density="standard"
      :animate="true"
    />
    <MeshlineBackground
      v-else-if="themeId === 'meshline-iot'"
    />
    <CircuitField
      v-else-if="themeId === 'nodegrid-neon'"
    />
    <SmartSecurityBackground
      v-else-if="themeId === 'smart-security'"
    />

    <!-- Main Login Screens -->
    <IotMeshLogin v-if="themeId === 'iot-mesh'" />
    <MeshlineLogin v-else-if="themeId === 'meshline-iot'" />
    <NodegridLogin v-else-if="themeId === 'nodegrid-neon'" />
    <SmartSecurityLogin v-else-if="themeId === 'smart-security'" />

    <!-- Reusable Component Names & One-Click Copy Badge -->
    <aside class="fixed top-5 right-5 z-50 flex items-center" aria-label="组件代码复制">
      <div class="glass-pill px-3 py-1.5 rounded-2xl flex items-center gap-2 text-xs font-mono border border-line/80 shadow-2xl backdrop-blur-xl">
        <span class="text-[10px] text-muted uppercase tracking-wider hidden sm:inline pl-1">
          复用组件:
        </span>

        <!-- Background Component -->
        <button
          @click="copySnippet(`<${currentTheme.components.background} />`, 'bg')"
          class="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-white/5 hover:bg-white/10 text-signal border border-line/60 hover:border-signal/50 transition-all cursor-pointer group"
          :title="`点击复制背景组件代码 <${currentTheme.components.background} />`"
        >
          <span class="text-[10px] text-muted group-hover:text-muted/80">背景</span>
          <span class="font-semibold">&lt;{{ currentTheme.components.background }} /&gt;</span>
          <Check v-if="copiedKey === 'bg'" class="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <Copy v-else class="w-3.5 h-3.5 text-muted group-hover:text-signal opacity-70 group-hover:opacity-100 shrink-0" />
        </button>

        <!-- Login Card Component -->
        <button
          @click="copySnippet(`<${currentTheme.components.login} />`, 'login')"
          class="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-white/5 hover:bg-white/10 text-ink border border-line/60 hover:border-signal/50 transition-all cursor-pointer group"
          :title="`点击复制界面组件代码 <${currentTheme.components.login} />`"
        >
          <span class="text-[10px] text-muted group-hover:text-muted/80">界面</span>
          <span class="font-semibold">&lt;{{ currentTheme.components.login }} /&gt;</span>
          <Check v-if="copiedKey === 'login'" class="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <Copy v-else class="w-3.5 h-3.5 text-muted group-hover:text-signal opacity-70 group-hover:opacity-100 shrink-0" />
        </button>
      </div>
    </aside>

    <!-- Extreme Minimalist Dots (纯净点点点) -->
    <div class="fixed bottom-6 inset-x-0 z-50 flex justify-center pointer-events-none">
      <div class="glass-pill px-2.5 py-1 rounded-full flex items-center gap-1 pointer-events-auto shadow-xl shadow-black/60 border border-line/70">
        <button
          v-for="(theme, index) in showcaseThemes"
          :id="`theme-dot-${index + 1}`"
          :key="theme.id"
          @click="themeId = theme.id"
          class="p-1.5 rounded-full transition-all cursor-pointer flex items-center justify-center focus:outline-none"
          :title="theme.name"
        >
          <span
            class="h-2 rounded-full transition-all duration-300 block pointer-events-none"
            :class="[
              theme.id === themeId
                ? 'w-6 bg-signal shadow-[0_0_8px_#3ae0c6]'
                : 'w-2 bg-line hover:bg-muted'
            ]"
          />
        </button>
      </div>
    </div>
  </div>
</template>
