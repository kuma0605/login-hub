export interface ShowcaseTheme {
  id: string;
  name: string;
  category: string;
  description: string;
  status: 'active' | 'upcoming';
  tags: string[];
  frameworks: ('react' | 'vue')[];
  colors: Record<string, string>;
  components: {
    background: string;
    login: string;
  };
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
    colors: iotMeshTokens,
    components: {
      background: 'DeviceMeshBackground',
      login: 'IotMeshLogin'
    }
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
    },
    components: {
      background: 'MeshlineBackground',
      login: 'MeshlineLogin'
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
    },
    components: {
      background: 'CircuitField',
      login: 'NodegridLogin'
    }
  },
  {
    id: 'smart-security',
    name: 'Smart Security Network',
    category: '智能安防感知网络',
    description: '边缘算力 · 设备直连。呼吸蓝紫星云、双向光轨穿梭、节点星芒闪烁与对角流动光泽。',
    status: 'active',
    tags: ['Edge AI', 'Signal Traces', 'Light Sheen', 'Perimeter Security'],
    frameworks: ['react', 'vue'],
    colors: {
      base: '#eff2fb',
      surface: '#ffffff',
      line: '#dde3f5',
      signal: '#4f6ae8',
      signalDim: '#dce4ff',
      ink: '#151b38',
      muted: '#646d99'
    },
    components: {
      background: 'SmartSecurityBackground',
      login: 'SmartSecurityLogin'
    }
  }
];

export interface SecurityCapability {
  id: string;
  title: string;
  device: string;
  description: string;
}

export const securityCapabilities: SecurityCapability[] = [
  {
    id: 'vision',
    title: '视频感知',
    device: '枪机 / 球机',
    description: '接入现有摄像机，画面在边缘侧结构化，不回传原始视频流。'
  },
  {
    id: 'access',
    title: '通道管控',
    device: '道闸 / 立柱',
    description: '识别结果直接驱动抬杆与放行，从判定到执行控制在 300 毫秒内。'
  },
  {
    id: 'compute',
    title: '边缘算力',
    device: '一体化主机',
    description: '单台主机承载 16 路推理，断网期间本地判定并在恢复后补传。'
  },
  {
    id: 'ops',
    title: '设备运维',
    device: '统一控制台',
    description: '离线、遮挡、掉线设备自动告警，现场无需逐台人工排查。'
  }
];

export const showcaseCategories = [
  '全部风格',
  'IoT 拓扑网络',
  'IoT 蓝图科技',
  'IoT 霓虹电路',
  '智能安防感知网络'
] as const;

export type ShowcaseCategory = typeof showcaseCategories[number];

