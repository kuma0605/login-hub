# Meshline IoT Console — 复制指南

> 风格：浅色工业蓝图 | 动画：Framer Motion（React）/ SVG SMIL（Vue）| 外部依赖：`framer-motion`（仅 React）

---

## 文件清单

| 文件 | 框架 | 用途 | 必须 |
| :--- | :--- | :--- | :---: |
| `apps/react/src/components/MeshlineBackground.tsx` | React | 背景：蓝图网格 + 雷达环 + 数据包流 | ✅ |
| `apps/react/src/views/MeshlineLogin.tsx` | React | 登录卡片 | ✅ |
| `apps/vue/src/components/MeshlineBackground.vue` | Vue 3 | 背景 | ✅ |
| `apps/vue/src/views/MeshlineLogin.vue` | Vue 3 | 登录卡片 | ✅ |
| `apps/vue2/src/components/MeshlineBackground.vue` | Vue 2 | 背景 | ✅ |
| `apps/vue2/src/views/MeshlineLogin.vue` | Vue 2 | 登录卡片 | ✅ |
| `packages/shared-data/src/mesh/meshline.ts` | 全部 | 网格节点、连线、数据包路径 | ✅ |

> 💡 **动画 CSS 已内置**：`MeshlineBackground` 的所有 `@keyframes` 和动画类均已写入组件 `<style>` 块，无需额外引入全局样式。

---

## React 复制步骤

### 1. 安装依赖
```bash
npm i framer-motion lucide-react
```

### 2. 复制文件
```
src/
├── components/
│   └── MeshlineBackground.tsx
├── views/
│   └── MeshlineLogin.tsx
└── data/
    └── meshline.ts              ← 来自 packages/shared-data/src/mesh/meshline.ts
```

修改 `MeshlineBackground.tsx` 中的 import：
```ts
// 修改前
import { meshlineLinks, meshlineNodes, ... } from '@login-hub/shared-data';
// 修改后
import { meshlineLinks, meshlineNodes, ... } from '../data/meshline';
```

### 3. 添加全局样式
将 [copy-guide.md](./copy-guide.md) 中的 `glass-panel` / `glass-pill` 加入全局 CSS。

### 4. 使用
```tsx
import { MeshlineBackground } from './components/MeshlineBackground';
import { MeshlineLogin } from './views/MeshlineLogin';

export default function App() {
  return (
    <div className="relative min-h-screen w-full bg-[#eef3f8]">
      <MeshlineBackground />
      <MeshlineLogin />
    </div>
  );
}
```

### 5. 关于 `prefers-reduced-motion`
React 版本通过 `framer-motion` 的 `useReducedMotion()` 自动响应系统无障碍设置，
开启「减少动态效果」时雷达环、数据包、扫描线会自动停止。

---

## Vue 3 复制步骤

### 1. 安装依赖
```bash
npm i lucide-vue-next
# Vue 版本不依赖 framer-motion，动画通过 SVG SMIL + CSS 实现
```

### 2. 复制文件
```
src/
├── components/
│   └── MeshlineBackground.vue
├── views/
│   └── MeshlineLogin.vue
└── data/
    └── meshline.ts
```

修改 import 路径同 React 步骤。

### 3. 使用
```vue
<template>
  <div class="relative min-h-screen bg-[#eef3f8]">
    <MeshlineBackground />
    <MeshlineLogin />
  </div>
</template>

<script setup>
import MeshlineBackground from './components/MeshlineBackground.vue';
import MeshlineLogin from './views/MeshlineLogin.vue';
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
│   └── MeshlineBackground.vue   ← 来自 apps/vue2/src/components/
├── views/
│   └── MeshlineLogin.vue        ← 来自 apps/vue2/src/views/
└── data/
    └── meshline.ts
```

> ⚠️ 必须使用 `apps/vue2/` 版本。Vue 2 版本用 `<animate>` SVG SMIL 实现数据包动画，
> 不依赖 `framer-motion`，与 Vue 2.6.11 完全兼容。

### 3. 使用
```vue
<template>
  <div class="relative min-h-screen bg-[#eef3f8]">
    <MeshlineBackground />
    <MeshlineLogin />
  </div>
</template>

<script>
import MeshlineBackground from './components/MeshlineBackground.vue';
import MeshlineLogin from './views/MeshlineLogin.vue';

export default {
  components: { MeshlineBackground, MeshlineLogin }
};
</script>
```

---

## 常见问题

**Q：网格密度可以调整吗？**
可以。在组件 `<style>` 块中修改 `.ml-grid-field` 和 `.ml-grid-field-lg` 的 `background-size`，
数值越小网格越密，越大越稀疏。

**Q：雷达环颜色怎么改？**
搜索 `#0b5cff`（蓝色），替换为你想要的颜色。节点状态颜色在 `meshline.ts` 的 `meshlineStatusColor` 中定义。

**Q：数据包飞行速度怎么调？**
React 版：修改 `motion.circle` 的 `transition.duration`（单位秒）。
Vue 版：修改 `<animate>` 标签的 `dur` 属性。
