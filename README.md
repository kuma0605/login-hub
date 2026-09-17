# Login Hub 🪐

> 高质量登录界面与动效背景精选合集（Showcase Monorepo）
> 
> 同时收录 **React** 与 **Vue 3** 两大生态的高水准动态登录模板，基于 `pnpm workspace` 统一管理与跨包复用。

---

## 🏗️ 项目架构

```text
login-hub/
├── apps/
│   ├── react/                  # React 登录画廊 (Vite + React 18 + TS + Tailwind + Framer Motion)
│   └── vue/                    # Vue 3 登录画廊 (Vite + Vue 3 + TS + Tailwind + SVG 动画)
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
| `pnpm dev` | **同时并行启动** React 与 Vue 画廊 | React: 5175 / Vue: 5174 |
| `pnpm dev:react` | 仅启动 React 版登录画廊 | [http://localhost:5175](http://localhost:5175) |
| `pnpm dev:vue` | 仅启动 Vue 3 版登录画廊 | [http://localhost:5174](http://localhost:5174) |

### 3. 项目构建与类型检查
```bash
# 全局生产打包 (包含 packages 和两个应用)
pnpm build

# 全局 TypeScript 类型检查
pnpm typecheck
```

---

## ✨ 首发主题：Meridian Fleet Console (IoT 网格拓扑)

- **设计规范**：
  - 底色 `base`: `#060a11`
  - 卡片 `surface`: `#0b1220`，边框 `line`: `#1d2b3f`
  - 核心高光色 `signal`: `#3ae0c6`（青绿色），次级色 `signal-dim`: `#1a6f66`
- **动效亮点**：
  - 响应式自适应 SVG 拓扑网络（160 × 100 虚拟视口，自动裁剪铺满屏幕）
  - 3 级节点架构（1 个 Hub 枢纽、4 个 Gateway 网关、13 个边缘传感器）
  - 真实遥测数据流包（Packets）沿拓扑链路动态穿梭
  - Hub 与 Gateway 周期性雷达脉冲扩散波纹
  - 支持网格密度调节（Sparse / Standard / Dense）与动画启闭
- **安全与控制台**：
  - 4 维实时设备拓扑监控微件
  - 暗色毛玻璃认证表单、密码切换、企业级 SSO (SAML/Okta, Azure AD) 与合规徽标

---

## 🎨 如何扩展新增一套登录页？

1. **注册主题元数据**：
   在 `packages/shared-data/src/themes/tokens.ts` 中的 `showcaseThemes` 注册新风格（如 `cyberpunk`、`3d-particles`、`glassmorphism`）。
2. **编写专属背景或视图**：
   - React：在 `apps/react/src/views/` 下新建对应视图，并在 `App.tsx` 中按 `themeId` 挂载。
   - Vue：在 `apps/vue/src/views/` 下新建对应 `.vue` 组件，并在 `App.vue` 中挂载。
