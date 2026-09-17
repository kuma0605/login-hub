export interface ShowcaseTheme {
  id: string;
  name: string;
  category: string;
  description: string;
  status: 'active' | 'upcoming';
  tags: string[];
  frameworks: ('react' | 'vue')[];
  colors: Record<string, string>;
}

export const iotMeshTokens = {
  base: '#060a11',
  surface: '#0b1220',
  line: '#1d2b3f',
  signal: '#3ae0c6',
  signalDim: '#1a6f66',
  ink: '#e8eefa',
  muted: '#8194ae',
  accent: '#2dd4bf',
  alert: '#f43f5e'
} as const;

export const showcaseThemes: ShowcaseTheme[] = [
  {
    id: 'iot-mesh',
    name: 'Meridian Fleet Console',
    category: 'IoT 拓扑网络',
    description: '响应式矢量网格拓扑、动态遥测数据流、雷达脉冲扩散与暗色微透玻璃中控台。',
    status: 'active',
    tags: ['SVG Topology', 'Data Flow', 'Glassmorphism', 'Reduced Motion'],
    frameworks: ['react', 'vue'],
    colors: iotMeshTokens
  },
  {
    id: 'meshline-iot',
    name: 'Meshline IoT Console',
    category: 'IoT 蓝图科技',
    description: '浅色工业蓝图网格、居中登录卡片、雷达脉冲光环、垂直扫描线与四角遥测浮动面板。',
    status: 'active',
    tags: ['Light Tech Grid', 'Radar Wave', 'Floating Telemetry', 'Scanline'],
    frameworks: ['react', 'vue'],
    colors: {
      base: '#eef3f8',
      surface: '#ffffff',
      line: '#d7e1ec',
      signal: '#0b5cff',
      signalDim: '#e4edff',
      ink: '#0a1526',
      muted: '#5b6d80'
    }
  },
  {
    id: 'nodegrid-neon',
    name: 'Nodegrid Neon Portal',
    category: 'IoT 霓虹电路',
    description: '深海霓虹电路芯片、交错转折脉冲电流、网格扫描线与操作员控制台。',
    status: 'active',
    tags: ['Canvas Circuit', 'Neon Pulse', 'Scanline HUD', 'Telemetry Rail'],
    frameworks: ['react', 'vue'],
    colors: {
      base: '#12304a',
      surface: 'rgba(31, 72, 102, 0.55)',
      line: 'rgba(103, 232, 249, 0.32)',
      signal: '#67e8f9',
      signalDim: '#1a4160',
      ink: '#e8f7ff',
      muted: '#a9cadd'
    }
  }
];

export const showcaseCategories = [
  '全部风格',
  'IoT 拓扑网络',
  'IoT 蓝图科技',
  'IoT 霓虹电路'
] as const;

export type ShowcaseCategory = typeof showcaseCategories[number];

