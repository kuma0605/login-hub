# Login Hub 🪐

> 高质量登录界面与动效背景精选合集（Showcase Monorepo）
> 
> 同时收录 **React**、**Vue 3** 以及 **Vue 2 (2.6.11 兼容)** 三大生态的高水准动态登录模板，基于 `pnpm workspace` 统一管理与跨包复用。

---

## 🏗️ 项目架构

```text
login-hub/
├── apps/
│   ├── react/                  # React 登录画廊 (Vite + React 18 + TS + Tailwind + Framer Motion)
│   ├── vue/                    # Vue 3 登录画廊 (Vite + Vue 3 + TS + Tailwind + SVG 动画)
│   └── vue2/                   # Vue 2 登录画廊 (Vite + Vue 2.7/2.6.11 Options API + lucide-vue)
├── packages/
│   └── shared-data/            # 纯 TS 共享模块：拓扑节点数据、图算法、主题 Tokens、画廊清单
├── pnpm-workspace.yaml         # Monorepo 工作区定义
├── tsconfig.base.json          # 全局 TypeScript 基础规范
└── package.json                # 根工作区聚合命令
```

---

## 🚀 快速开始

### 1. 安装全量依赖
在根目录下运行：
```bash
pnpm install
```

### 2. 启动开发服务器

| 命令 | 说明 | 预览地址 |
| :--- | :--- | :--- |
| `pnpm dev` | **同时并行启动** React、Vue 3 与 Vue 2 画廊 | 5175 / 5174 / 5176 |
| `pnpm dev:react` | 仅启动 React 版登录画廊 | [http://localhost:5175](http://localhost:5175) |
| `pnpm dev:vue` | 仅启动 Vue 3 版登录画廊 | [http://localhost:5174](http://localhost:5174) |
| `pnpm dev:vue2` | 仅启动 Vue 2 版登录画廊（兼容 2.6.11） | [http://localhost:5176](http://localhost:5176) |

### 3. 项目构建与类型检查
```bash
# 全局生产打包 (包含 packages 和两个应用)
pnpm build

# 全局 TypeScript 类型检查
pnpm typecheck
```

---

## ✨ 已收录主题概览

全站采用极简沉浸式全屏展示，通过**底部微光小圆点（●）**一键平滑切换，页面**右上角**提供可复用组件名称与**一键复制代码**支持：

| 序号 | 主题名称 | 风格分类 | 核心动效与微交互 | 背景组件 | 界面组件 |
| :---: | :--- | :--- | :--- | :--- | :--- |
| **01** | **Meridian Fleet Console** | 暗黑赛博拓扑 | • 全局深海科技蓝微晶格背景<br>• 双区对称高光星云照亮<br>• 响应式自适应 SVG 拓扑与数据包穿梭<br>• 纯净冷感冰蓝脉冲环 | `<DeviceMeshBackground />` | `<IotMeshLogin />` |
| **02** | **Meshline IoT Console** | 浅色工业蓝图 | • 浅色精密蓝图网格 (`.grid-field`)<br>• 居中多层雷达光环脉冲<br>• 工业取景器直角框修饰<br>• 纵向全息扫描流光 (`.scan-line`) | `<MeshlineBackground />` | `<MeshlineLogin />` |
| **03** | **Nodegrid Neon Portal** | 霓虹电路控制台 | • Canvas 晶体管电路网络<br>• 90° 智能转弯流光电流脉冲<br>• 实时遥测 Sparkline 动态折线图 (msg/s)<br>• 四大分布式网关动态状态监测 | `<CircuitField />` | `<NodegridLogin />` |
| **04** | **Smart Security Network** | 智能安防边缘网络 | • 蓝紫星云呼吸扩散 (`animate-bloom`)<br>• 双向 X/Y 信号流光穿梭飞线<br>• 对角 45° 掠日动态高光扫掠<br>• 4 类边缘感知设备状态与 3D 等距网络 | `<SmartSecurityBackground />` | `<SmartSecurityLogin />` |

---

## 🧩 如何复用组件？

每个主题由**独立的背景动效组件**和**前端登录卡片组件**解耦构成，互不干扰，开箱即用：

1. **直接查看与复制**：
   在运行页面右上角悬浮栏中，点击对应的 `【背景】` 或 `【界面】` 按钮，即可将组件 JSX / Vue 标签直接复制到剪贴板。
2. **源码对应位置**：
   - **React**：背景位于 `apps/react/src/components/`，界面位于 `apps/react/src/views/`
   - **Vue 3**：背景位于 `apps/vue/src/components/`，界面位于 `apps/vue/src/views/`
   - **Vue 2 (2.6.11 兼容)**：背景位于 `apps/vue2/src/components/`，界面位于 `apps/vue2/src/views/`
   - **数据源**：拓扑节点、数据链路与网关状态统一来自 `@login-hub/shared-data`

3. **如何在 Vue 2.6.11 项目中 0 改动直接复制？**：
   - 直接拷贝 `apps/vue2/src/components/` 与 `apps/vue2/src/views/` 下对应的 `.vue` 组件文件到你的业务工程。
   - 所有 Vue 2 组件均严格采用 **Vue 2 Options API**（单根节点 `<template>`、`data()`、`methods`、`mounted()`、`beforeDestroy()`）。
   - 图标依赖安装：`npm install lucide-vue`（Vue 2 版本），或者直接替换为项目现有的 svg/iconfont 图标。
   - 动画样式：拷贝 `apps/vue2/src/index.css` 中的 HUD 与微动画样式到全局样式表。

---

## 🎨 如何扩展新增一套登录页？

1. **注册主题元数据**：
   在 `packages/shared-data/src/themes/tokens.ts` 中的 `showcaseThemes` 注册新主题：
   ```ts
   {
     id: 'your-theme',
     name: 'Your Theme Name',
     category: '风格分类',
     description: '主题描述...',
     status: 'active',
     tags: ['Tag1', 'Tag2'],
     frameworks: ['react', 'vue'],
     colors: { ... },
     components: {
       background: 'YourBackgroundComponent',
       login: 'YourLoginComponent'
     }
   }
   ```
2. **编写背景与界面**：
   - React：在 `apps/react/` 下分别实现背景与视图，并在 `App.tsx` 中按 `themeId` 挂载。
   - Vue 3：在 `apps/vue/` 下分别实现背景与视图，并在 `App.vue` 中按 `themeId` 挂载。
   - Vue 2 (2.6.11 兼容)：在 `apps/vue2/` 下分别实现背景与视图，并在 `App.vue` 中按 `themeId` 挂载。

3. **在 `App.vue` 中挂载（以 Vue 2 为例）**：
   ```vue
   <!-- apps/vue2/src/App.vue -->
   <YourBackground v-else-if="themeId === 'your-theme'" />
   <YourLoginView v-else-if="themeId === 'your-theme'" />
   ```

4. **在 `tokens.ts` 的 `frameworks` 字段中声明适配生态**：
   ```ts
   frameworks: ['react', 'vue', 'vue2']
   ```
   - `'vue2'` 表示当前主题已在 `apps/vue2/` 下提供 Vue 2 兼容实现。

---

## 📖 复制指南

想将某个主题移植到自己的项目？查看详细复制文档：

👉 **[docs/copy-guide.md](./docs/copy-guide.md)** — 总索引，含通用前提与依赖说明

| 主题 | 文档 |
| :--- | :--- |
| Meridian Fleet Console | [docs/theme-iot-mesh.md](./docs/theme-iot-mesh.md) |
| Meshline IoT Console | [docs/theme-meshline.md](./docs/theme-meshline.md) |
| Nodegrid Neon Portal | [docs/theme-nodegrid.md](./docs/theme-nodegrid.md) |
| Smart Security Network | [docs/theme-smart-security.md](./docs/theme-smart-security.md) |
