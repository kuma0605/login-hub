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
    id: 'cyberpunk-neon',
    name: 'NeoMatrix Cyberpunk',
    category: '赛博霓虹',
    description: '故障艺术字体、霓虹流光扫描线与重工业未来认证协议。',
    status: 'upcoming',
    tags: ['Scanlines', 'Glitch Art', 'Neon Glow'],
    frameworks: ['react', 'vue'],
    colors: {
      base: '#05050c',
      signal: '#ff0055',
      signalDim: '#00f0ff',
      surface: '#0f0f1c'
    }
  },
  {
    id: 'particles-3d',
    name: 'Celestial 3D Particles',
    category: '3D 粒子流',
    description: '基于 WebGL / Canvas 的粒子力场涡流与平滑鼠标引力交互。',
    status: 'upcoming',
    tags: ['Canvas/WebGL', 'Interactive Physics', 'Constellations'],
    frameworks: ['react', 'vue'],
    colors: {
      base: '#030712',
      signal: '#818cf8',
      signalDim: '#4338ca',
      surface: '#0f172a'
    }
  },
  {
    id: 'frosted-glass',
    name: 'Minimal Frosted Aura',
    category: '极简毛玻璃',
    description: '柔和径向弥散光晕、高级超清双层毛玻璃质感与微交互表单。',
    status: 'upcoming',
    tags: ['Backdrop Blur', 'Ambient Glow', 'Clean SaaS'],
    frameworks: ['react', 'vue'],
    colors: {
      base: '#090d16',
      signal: '#38bdf8',
      signalDim: '#0284c7',
      surface: 'rgba(255,255,255,0.04)'
    }
  }
];


export const showcaseCategories = [
  '全部风格',
  'IoT 拓扑网络',
  '赛博霓虹',
  '3D 粒子流',
  '极简毛玻璃'
] as const;

export type ShowcaseCategory = typeof showcaseCategories[number];
