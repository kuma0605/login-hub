# 组件复制指南

> 本指南帮助你将 Login Hub 中的登录主题快速移植到自己的项目。
> 每个主题均提供 **React**、**Vue 3**、**Vue 2 (2.6.11)** 三套完整复制步骤。

---

## 主题速查

| 主题 | 风格 | 动画技术 | 主要外部依赖 | 详细文档 |
| :--- | :--- | :--- | :--- | :--- |
| **Meridian Fleet Console** | 暗黑赛博拓扑 | SVG SMIL + CSS Gradient | 无 | [theme-iot-mesh.md](./theme-iot-mesh.md) |
| **Meshline IoT Console** | 浅色工业蓝图 | Framer Motion / SVG SMIL | `framer-motion`（仅 React） | [theme-meshline.md](./theme-meshline.md) |
| **Nodegrid Neon Portal** | 霓虹电路控制台 | Canvas 2D + rAF | 无 | [theme-nodegrid.md](./theme-nodegrid.md) |
| **Smart Security Network** | 智能安防边缘网络 | 纯 CSS keyframes | 无 | [theme-smart-security.md](./theme-smart-security.md) |

---

## 通用前提

在复制任何主题之前，确保目标项目已满足以下条件：

### 必须
- **Tailwind CSS v3**（所有布局和间距均使用 Tailwind 工具类）

### 按框架
| 框架 | 图标库 | 安装命令 |
| :--- | :--- | :--- |
| React | `lucide-react` | `npm i lucide-react` |
| Vue 3 | `lucide-vue-next` | `npm i lucide-vue-next` |
| Vue 2 | `lucide-vue` | `npm i lucide-vue` |

### 全局样式（来自 `index.css`）
以下两个工具类被多个主题的登录卡片共用，复制时需一并加入全局样式表：

```css
/* 复制到你的全局 CSS 文件 */
.glass-panel {
  background: rgba(11, 18, 32, 0.75);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(29, 43, 63, 0.85);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.05);
}
.glass-pill {
  background: rgba(11, 18, 32, 0.8);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(29, 43, 63, 0.9);
}
```

---

## 拓扑数据说明

**Meridian Fleet Console** 和 **Meshline IoT Console** 和 **Nodegrid Neon Portal**
的节点坐标、连线数据均来自 `packages/shared-data`。

复制时有两种方式处理：

**方式 A（推荐）：内联数据**
直接将 `packages/shared-data/src/mesh/` 下对应的 `.ts` 文件复制到你的项目，
修改 import 路径为相对路径即可。

**方式 B：自定义数据**
参考 `.ts` 文件中的数据结构，替换为你自己的节点和连线数据。

---

## 动画 CSS 说明

经过重构，**SmartSecurityBackground** 和 **MeshlineBackground**
的所有动画 CSS 均已**内置在组件文件内部**，无需额外引入全局样式。

其余主题（Meridian、Nodegrid）的动画均通过 **SVG SMIL** 或 **Canvas API** 实现，
同样无全局 CSS 依赖。
