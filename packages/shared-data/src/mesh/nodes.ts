export type MeshNodeKind = 'hub' | 'gateway' | 'device';

export interface MeshNode {
  id: number;
  x: number;
  y: number;
  kind: MeshNodeKind;
  name?: string;
  status?: 'nominal' | 'active' | 'syncing';
}

/** 160 x 100 虚拟视口坐标空间 */
export const meshNodes: MeshNode[] = [
  { id: 0, x: 52, y: 48, kind: 'hub', name: 'Fleet-Nexus-01', status: 'nominal' },
  { id: 1, x: 24, y: 26, kind: 'gateway', name: 'GW-Northwest', status: 'active' },
  { id: 2, x: 30, y: 74, kind: 'gateway', name: 'GW-Southwest', status: 'active' },
  { id: 3, x: 84, y: 32, kind: 'gateway', name: 'GW-Northeast', status: 'active' },
  { id: 4, x: 92, y: 70, kind: 'gateway', name: 'GW-Southeast', status: 'active' },
  { id: 5, x: 10, y: 14, kind: 'device', name: 'Sensor-A01' },
  { id: 6, x: 7, y: 42, kind: 'device', name: 'Sensor-A02' },
  { id: 7, x: 16, y: 58, kind: 'device', name: 'Sensor-B01' },
  { id: 8, x: 38, y: 11, kind: 'device', name: 'Sensor-B02' },
  { id: 9, x: 14, y: 88, kind: 'device', name: 'Sensor-C01' },
  { id: 10, x: 44, y: 91, kind: 'device', name: 'Sensor-C02' },
  { id: 11, x: 66, y: 86, kind: 'device', name: 'Sensor-D01' },
  { id: 12, x: 100, y: 17, kind: 'device', name: 'Sensor-E01' },
  { id: 13, x: 112, y: 49, kind: 'device', name: 'Sensor-E02' },
  { id: 14, x: 128, y: 25, kind: 'device', name: 'Sensor-F01' },
  { id: 15, x: 134, y: 73, kind: 'device', name: 'Sensor-F02' },
  { id: 16, x: 118, y: 89, kind: 'device', name: 'Sensor-G01' },
  { id: 17, x: 68, y: 19, kind: 'device', name: 'Sensor-G02' }
];

export const meshLinks: Array<[number, number]> = [
  [0, 1],
  [0, 2],
  [0, 3],
  [0, 4],
  [0, 17],
  [1, 5],
  [1, 6],
  [1, 8],
  [2, 7],
  [2, 9],
  [2, 10],
  [3, 12],
  [3, 17],
  [3, 13],
  [4, 13],
  [4, 15],
  [4, 16],
  [4, 11],
  [12, 14],
  [13, 14]
];

export interface MeshPacket {
  from: number;
  to: number;
  delay: number;
  duration: number;
}

/** 遥测数据流传输路径：边缘传感器 -> 网关 -> 汇聚到 Hub */
export const meshPackets: MeshPacket[] = [
  { from: 5, to: 1, delay: 0, duration: 2.6 },
  { from: 1, to: 0, delay: 2.6, duration: 2.2 },
  { from: 9, to: 2, delay: 1.1, duration: 2.9 },
  { from: 2, to: 0, delay: 4.0, duration: 2.1 },
  { from: 14, to: 13, delay: 0.6, duration: 2.4 },
  { from: 13, to: 4, delay: 3.0, duration: 2.3 },
  { from: 4, to: 0, delay: 5.3, duration: 2.8 },
  { from: 12, to: 3, delay: 1.8, duration: 2.5 },
  { from: 3, to: 0, delay: 4.3, duration: 2.4 },
  { from: 11, to: 4, delay: 2.2, duration: 2.7 }
];

export type MeshDensity = 'sparse' | 'standard' | 'dense';

export function visibleIds(density: MeshDensity): Set<number> {
  if (density === 'dense') return new Set(meshNodes.map((n) => n.id));
  const keepEveryOther = density === 'sparse';
  const ids = new Set<number>();
  let deviceIndex = 0;
  for (const node of meshNodes) {
    if (node.kind !== 'device') {
      ids.add(node.id);
      continue;
    }
    const keep = keepEveryOther ? deviceIndex % 2 === 0 : deviceIndex % 4 !== 3;
    if (keep) ids.add(node.id);
    deviceIndex += 1;
  }
  return ids;
}

export const nodeRadius: Record<MeshNodeKind, number> = {
  hub: 3.2,
  gateway: 1.9,
  device: 1.1
};

export const nodeStrokeColor: Record<MeshNodeKind, string> = {
  hub: '#3ae0c6',
  gateway: '#1a6f66',
  device: '#25384f'
};
