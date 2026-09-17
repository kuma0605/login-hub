export type MeshlineNodeStatus = 'online' | 'syncing' | 'warning';
export type MeshlineNodeSize = 'hub' | 'node' | 'leaf';

export interface MeshlineNode {
  id: string;
  x: number;
  y: number;
  status: MeshlineNodeStatus;
  size: MeshlineNodeSize;
}

export interface MeshlineLink {
  from: string;
  to: string;
}

export interface FloatingReadout {
  id: string;
  label: string;
  value: string;
  position: string;
}

/** 坐标按视口百分比 (0-100) 分布，铺满整个屏幕 */
export const meshlineNodes: MeshlineNode[] = [
  { id: 'n1', x: 8, y: 16, status: 'online', size: 'node' },
  { id: 'n2', x: 21, y: 38, status: 'online', size: 'hub' },
  { id: 'n3', x: 13, y: 66, status: 'syncing', size: 'leaf' },
  { id: 'n4', x: 30, y: 84, status: 'online', size: 'node' },
  { id: 'n5', x: 36, y: 12, status: 'online', size: 'leaf' },
  { id: 'n6', x: 50, y: 28, status: 'online', size: 'node' },
  { id: 'n7', x: 48, y: 72, status: 'warning', size: 'leaf' },
  { id: 'n8', x: 64, y: 88, status: 'online', size: 'node' },
  { id: 'n9', x: 67, y: 18, status: 'syncing', size: 'node' },
  { id: 'n10', x: 80, y: 44, status: 'online', size: 'hub' },
  { id: 'n11', x: 92, y: 24, status: 'online', size: 'leaf' },
  { id: 'n12', x: 88, y: 74, status: 'online', size: 'node' },
  { id: 'n13', x: 60, y: 52, status: 'online', size: 'leaf' }
];

export const meshlineLinks: MeshlineLink[] = [
  { from: 'n1', to: 'n2' },
  { from: 'n2', to: 'n3' },
  { from: 'n2', to: 'n5' },
  { from: 'n3', to: 'n4' },
  { from: 'n4', to: 'n7' },
  { from: 'n5', to: 'n6' },
  { from: 'n6', to: 'n9' },
  { from: 'n6', to: 'n13' },
  { from: 'n7', to: 'n8' },
  { from: 'n8', to: 'n12' },
  { from: 'n9', to: 'n10' },
  { from: 'n9', to: 'n11' },
  { from: 'n10', to: 'n12' },
  { from: 'n10', to: 'n13' },
  { from: 'n2', to: 'n6' }
];

/** 带有动态光点数据包流动的链路 */
export const meshlinePacketLinks: MeshlineLink[] = [
  { from: 'n1', to: 'n2' },
  { from: 'n5', to: 'n6' },
  { from: 'n9', to: 'n10' },
  { from: 'n10', to: 'n12' },
  { from: 'n4', to: 'n7' }
];

export const meshlineReadouts: FloatingReadout[] = [
  { id: 'r1', label: 'MESH', value: '12,486 online', position: 'left-8 top-24' },
  { id: 'r2', label: 'INGEST', value: '48.2k msg/s', position: 'right-10 top-28' },
  { id: 'r3', label: 'LATENCY', value: '31 ms', position: 'left-14 bottom-28' },
  { id: 'r4', label: 'UPTIME', value: '99.98 %', position: 'right-16 bottom-24' }
];

export const meshlineNodeRadius = { hub: 5, node: 3.5, leaf: 2.5 } as const;

export const meshlineStatusColor = {
  online: '#0b5cff',
  syncing: '#00976b',
  warning: '#b06a00'
} as const;
