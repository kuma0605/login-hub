# Nodegrid Neon Portal — 复制指南

> 风格：霓虹电路控制台 | 动画：Canvas 2D + requestAnimationFrame | 外部依赖：无

---

## 文件清单

| 文件 | 框架 | 用途 | 必须 |
| :--- | :--- | :--- | :---: |
| `apps/react/src/components/CircuitField.tsx` | React | 背景：Canvas 电路脉冲网格 | ✅ |
| `apps/react/src/views/NodegridLogin.tsx` | React | 登录卡片 + HUD 风格界面 | ✅ |
| `apps/vue/src/components/CircuitField.vue` | Vue 3 | 背景 | ✅ |
| `apps/vue/src/views/NodegridLogin.vue` | Vue 3 | 登录卡片 | ✅ |
| `apps/vue2/src/components/CircuitField.vue` | Vue 2 | 背景 | ✅ |
| `apps/vue2/src/views/NodegridLogin.vue` | Vue 2 | 登录卡片 | ✅ |
| `packages/shared-data/src/mesh/nodegrid.ts` | 全部 | 实时遥测 Sparkline 数据、网关状态 | 按需 |

> 💡 **无外部动画依赖**：`CircuitField` 完全通过原生 Canvas 2D API 实现，不依赖任何动画库。

> ⚠️ **HUD 样式需全局引入**：`hud-corner` 和 `hud-scanlines` 在 `CircuitField` 和 `NodegridLogin` 中均有使用，需加入全局样式（见下方）。

---

## 全局 HUD 样式

以下样式同时被背景组件和登录卡片组件使用，**必须**加入全局 CSS：

```css
/* HUD 取景框四角装饰 */
.hud-corner::before,
.hud-corner::after {
  content: '';
  position: absolute;
  width: 18px;
  height: 18px;
  border-color: #67e8f9;
  opacity: 0.7;
  pointer-events: none;
}
.hud-corner::before {
  top: -1px; left: -1px;
  border-top-width: 1px; border-left-width: 1px;
}
.hud-corner::after {
  bottom: -1px; right: -1px;
  border-bottom-width: 1px; border-right-width: 1px;
}

/* 全息扫描线叠加 */
.hud-scanlines {
  background-image: repeating-linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.035) 0px,
    rgba(255, 255, 255, 0.035) 1px,
    transparent 1px,
    transparent 3px
  );
}
```

---

## React 复制步骤

### 1. 安装依赖
```bash
npm i lucide-react
```

### 2. 复制文件
```
src/
├── components/
│   └── CircuitField.tsx
├── views/
│   └── NodegridLogin.tsx
└── data/
    └── nodegrid.ts              ← 可选，仅在需要遥测 Sparkline 时复制
```

`NodegridLogin.tsx` 中如引用了 `nodegrid.ts`，修改 import 路径：
```ts
// 修改前
import { gatewayNodes, telemetryData } from '@login-hub/shared-data';
// 修改后
import { gatewayNodes, telemetryData } from '../data/nodegrid';
```

### 3. 添加全局样式
将上方 HUD 样式 + [copy-guide.md](./copy-guide.md) 的 `glass-panel` / `glass-pill` 加入全局 CSS。

### 4. 使用
```tsx
import { CircuitField } from './components/CircuitField';
import { NodegridLogin } from './views/NodegridLogin';

export default function App() {
  return (
    <div className="relative min-h-screen w-full bg-[#030810]">
      <CircuitField density={1} />
      <NodegridLogin />
    </div>
  );
}
```

### `density` prop 说明
| 值 | 效果 |
| :--- | :--- |
| `0.6` | 稀疏，节点少，性能最好 |
| `1`（默认）| 标准密度 |
| `1.6` | 密集，节点多，适合大屏 |

---

## Vue 3 复制步骤

### 1. 安装依赖
```bash
npm i lucide-vue-next
```

### 2. 复制文件 + 修改 import 路径（同 React）

### 3. 使用
```vue
<template>
  <div class="relative min-h-screen bg-[#030810]">
    <CircuitField :density="1" />
    <NodegridLogin />
  </div>
</template>

<script setup>
import CircuitField from './components/CircuitField.vue';
import NodegridLogin from './views/NodegridLogin.vue';
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
│   └── CircuitField.vue   ← 来自 apps/vue2/src/components/
└── views/
    └── NodegridLogin.vue  ← 来自 apps/vue2/src/views/
```

> ⚠️ Vue 2 版本使用 Options API + `mounted()` / `beforeDestroy()` 管理 Canvas 生命周期，
> 与 Vue 2.6.11 完全兼容，无 Composition API 依赖。

### 3. 使用
```vue
<template>
  <div class="relative min-h-screen bg-[#030810]">
    <CircuitField :density="1" />
    <NodegridLogin />
  </div>
</template>

<script>
import CircuitField from './components/CircuitField.vue';
import NodegridLogin from './views/NodegridLogin.vue';

export default {
  components: { CircuitField, NodegridLogin }
};
</script>
```

---

## 常见问题

**Q：Canvas 在 SSR（如 Nuxt）中会报错吗？**
会。`CircuitField` 在 `mounted()` / `useEffect` 中才初始化 Canvas，
在 Nuxt 中请使用 `<ClientOnly>` 包裹，或配置 `ssr: false`。

**Q：电流脉冲的颜色怎么改？**
在 `CircuitField` 的 Canvas 绘制逻辑中搜索 `rgba(103, 232, 249`（青色），替换为你想要的颜色。
节点亮色（bright nodes）颜色在 `ctx.fillStyle` 附近单独控制。

**Q：脉冲速度怎么调？**
修改 `spawnPulse()` 函数中的 `speed: 0.9 + Math.random() * 1.6`，
增大数值会让脉冲更快，缩小则更慢。

**Q：页面切换时动画没有停止？**
确认在组件卸载时调用了 `cancelAnimationFrame(raf)` 并移除了 `resize` 事件监听器。
三个框架版本均已正确处理，直接复制即可。
