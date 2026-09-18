# Smart Security Network — 复制指南

> 风格：智能安防边缘网络 | 动画：纯 CSS keyframes | 外部依赖：无

---

## 文件清单

| 文件 | 框架 | 用途 | 必须 |
| :--- | :--- | :--- | :---: |
| `apps/react/src/components/SmartSecurityBackground.tsx` | React | 背景：星云呼吸 + 信号飞线 + 掠光扫掠 | ✅ |
| `apps/react/src/views/SmartSecurityLogin.tsx` | React | 登录卡片 + 3D 等距网络 | ✅ |
| `apps/vue/src/components/SmartSecurityBackground.vue` | Vue 3 | 背景 | ✅ |
| `apps/vue/src/views/SmartSecurityLogin.vue` | Vue 3 | 登录卡片 | ✅ |
| `apps/vue2/src/components/SmartSecurityBackground.vue` | Vue 2 | 背景 | ✅ |
| `apps/vue2/src/views/SmartSecurityLogin.vue` | Vue 2 | 登录卡片 | ✅ |

> 💡 **零外部依赖，动画 CSS 已内置**：所有 `@keyframes` 和动画类均写在组件 `<style>` 块内，
> 复制单个文件即可完整运行，无需引入任何额外样式。

> 💡 **无拓扑数据依赖**：本主题不使用 `shared-data` 中的节点数据，可完全独立使用。

---

## React 复制步骤

### 1. 安装依赖
```bash
npm i lucide-react
# 无需 framer-motion，动画完全由 CSS 驱动
```

### 2. 复制文件
```
src/
├── components/
│   └── SmartSecurityBackground.tsx
└── views/
    └── SmartSecurityLogin.tsx
```

无需修改任何 import 路径，两个文件均无外部数据依赖。

### 3. 添加全局样式
将 [copy-guide.md](./copy-guide.md) 中的 `glass-panel` / `glass-pill` 加入全局 CSS。

### 4. 使用
```tsx
import { SmartSecurityBackground } from './components/SmartSecurityBackground';
import { SmartSecurityLogin } from './views/SmartSecurityLogin';

export default function App() {
  return (
    <div className="relative min-h-screen w-full">
      <SmartSecurityBackground />
      <SmartSecurityLogin />
    </div>
  );
}
```

### `className` prop
`SmartSecurityBackground` 接受可选的 `className` prop，用于追加自定义样式：
```tsx
<SmartSecurityBackground className="opacity-80" />
```

---

## Vue 3 复制步骤

### 1. 安装依赖
```bash
npm i lucide-vue-next
```

### 2. 复制文件 + 直接使用，无需修改 import

### 3. 使用
```vue
<template>
  <div class="relative min-h-screen">
    <SmartSecurityBackground />
    <SmartSecurityLogin />
  </div>
</template>

<script setup>
import SmartSecurityBackground from './components/SmartSecurityBackground.vue';
import SmartSecurityLogin from './views/SmartSecurityLogin.vue';
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
│   └── SmartSecurityBackground.vue   ← 来自 apps/vue2/src/components/
└── views/
    └── SmartSecurityLogin.vue        ← 来自 apps/vue2/src/views/
```

> ✅ 这是最适合「0 改动移植」的主题：
> - 纯 CSS 动画，无 JS 动画依赖
> - Options API 单根节点结构
> - 动画 CSS 内置于 `<style scoped>`，无全局样式污染

### 3. 使用
```vue
<template>
  <div class="relative min-h-screen">
    <SmartSecurityBackground />
    <SmartSecurityLogin />
  </div>
</template>

<script>
import SmartSecurityBackground from './components/SmartSecurityBackground.vue';
import SmartSecurityLogin from './views/SmartSecurityLogin.vue';

export default {
  components: { SmartSecurityBackground, SmartSecurityLogin }
};
</script>
```

---

## 动画效果说明

| 动画类 | 效果 | 可调参数 |
| :--- | :--- | :--- |
| `.ss-animate-bloom` | 顶部星云球呼吸扩散 | `animation-duration`（默认 6.5s）|
| `.ss-animate-bloom-alt` | 底角环境光呼吸 | `animation-duration`（默认 8s）|
| `.ss-animate-trace-x` | 水平信号飞线 | `animation-duration`（默认 4.2s）|
| `.ss-animate-trace-y` | 垂直信号飞线 | `animation-duration`（默认 5s）|
| `.ss-animate-sheen` | 对角掠光扫掠 | `animation-duration`（默认 7s）|
| `.ss-animate-node` | 边缘节点脉冲亮灭 | `animation-duration`（默认 3.2s）|

---

## 常见问题

**Q：想要更多信号飞线，怎么加？**
在组件的 `horizontalTraces` 或 `verticalTraces` 数组中追加对象，
格式：`{ offset: '位置百分比', delay: '延迟秒数', length: '长度rem' }`。

**Q：背景颜色不是白色，怎么改？**
`bg-[#eff2fb]` 是浅蓝灰色背景，修改为你需要的颜色即可。
星云和飞线颜色在各元素的 `background` style 中单独调整。

**Q：动画性能怎么样？**
纯 CSS `@keyframes` 由浏览器合成线程驱动，不占用 JS 主线程，性能最优。
在低端设备上如需关闭，给背景组件加 `display: none` 条件渲染即可。
