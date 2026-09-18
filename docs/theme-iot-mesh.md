# Meridian Fleet Console — 复制指南

> 风格：暗黑赛博拓扑 | 动画：SVG SMIL + CSS Gradient | 外部依赖：无

---

## 文件清单

| 文件 | 框架 | 用途 | 必须 |
| :--- | :--- | :--- | :---: |
| `apps/react/src/components/DeviceMeshBackground.tsx` | React | 背景：深海微晶格 + 拓扑网络 | ✅ |
| `apps/react/src/views/IotMeshLogin.tsx` | React | 登录卡片 | ✅ |
| `apps/vue/src/components/DeviceMeshBackground.vue` | Vue 3 | 背景 | ✅ |
| `apps/vue/src/views/IotMeshLogin.vue` | Vue 3 | 登录卡片 | ✅ |
| `apps/vue2/src/components/DeviceMeshBackground.vue` | Vue 2 | 背景 | ✅ |
| `apps/vue2/src/views/IotMeshLogin.vue` | Vue 2 | 登录卡片 | ✅ |
| `packages/shared-data/src/mesh/nodes.ts` | 全部 | 拓扑节点坐标与状态数据 | ✅ |

---

## React 复制步骤

### 1. 安装依赖
```bash
npm i lucide-react
# Tailwind CSS v3（如未安装）
npm i -D tailwindcss postcss autoprefixer
```

### 2. 复制文件
```
src/
├── components/
│   └── DeviceMeshBackground.tsx   ← 复制自 apps/react/src/components/
└── views/
    └── IotMeshLogin.tsx           ← 复制自 apps/react/src/views/
```

同时复制 `packages/shared-data/src/mesh/nodes.ts` 到你的项目，
并修改 `DeviceMeshBackground.tsx` 中的 import 路径：
```ts
// 修改前
import { iotNodes, iotLinks } from '@login-hub/shared-data';
// 修改后（根据你的实际路径调整）
import { iotNodes, iotLinks } from '../data/nodes';
```

### 3. 添加全局样式
将 [copy-guide.md](./copy-guide.md) 中的 `glass-panel` / `glass-pill` 样式加入全局 CSS。

### 4. 使用
```tsx
import { DeviceMeshBackground } from './components/DeviceMeshBackground';
import { IotMeshLogin } from './views/IotMeshLogin';

export default function App() {
  return (
    <div className="relative min-h-screen w-full bg-[#0f2438]">
      <DeviceMeshBackground density="standard" animate={true} />
      <IotMeshLogin />
    </div>
  );
}
```

---

## Vue 3 复制步骤

### 1. 安装依赖
```bash
npm i lucide-vue-next
```

### 2. 复制文件
```
src/
├── components/
│   └── DeviceMeshBackground.vue
└── views/
    └── IotMeshLogin.vue
```

修改 import 路径同 React 步骤。

### 3. 使用
```vue
<template>
  <div class="relative min-h-screen w-full bg-[#0f2438]">
    <DeviceMeshBackground density="standard" :animate="true" />
    <IotMeshLogin />
  </div>
</template>

<script setup>
import DeviceMeshBackground from './components/DeviceMeshBackground.vue';
import IotMeshLogin from './views/IotMeshLogin.vue';
</script>
```

---

## Vue 2 (2.6.11) 复制步骤

### 1. 安装依赖
```bash
npm i lucide-vue
```

### 2. 复制文件
```
src/
├── components/
│   └── DeviceMeshBackground.vue   ← 来自 apps/vue2/src/components/
└── views/
    └── IotMeshLogin.vue           ← 来自 apps/vue2/src/views/
```

> ⚠️ 注意：必须使用 `apps/vue2/` 下的版本，该版本使用 Options API 单根节点，与 Vue 2 完全兼容。

### 3. 使用
```vue
<template>
  <div class="relative min-h-screen bg-[#0f2438]">
    <DeviceMeshBackground density="standard" :animate="true" />
    <IotMeshLogin />
  </div>
</template>

<script>
import DeviceMeshBackground from './components/DeviceMeshBackground.vue';
import IotMeshLogin from './views/IotMeshLogin.vue';

export default {
  components: { DeviceMeshBackground, IotMeshLogin }
};
</script>
```

---

## 常见问题

**Q：拓扑节点位置可以自定义吗？**
可以。修改 `nodes.ts` 中的 `x`、`y` 坐标（百分比单位，0–100），以及 `status`（`active` / `warning` / `offline`）和 `size`（`hub` / `gateway` / `leaf`）。

**Q：背景颜色可以改吗？**
可以。`DeviceMeshBackground` 中背景色为 `#0f2438`，修改 `backgroundColor` style 属性即可。径向渐变的光晕颜色在 SVG `<radialGradient>` 中调整。

**Q：动画可以关掉吗？**
可以。`<DeviceMeshBackground :animate="false" />` 会关闭所有数据包飞行和脉冲动画，仅保留静态拓扑结构。
