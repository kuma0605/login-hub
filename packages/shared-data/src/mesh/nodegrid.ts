export type GatewayStatus = 'online' | 'syncing' | 'degraded';

export interface Gateway {
  id: string;
  label: string;
  region: string;
  devices: number;
  status: GatewayStatus;
}

export const nodegridGateways: Gateway[] = [
  { id: 'GW-01', label: 'Helios Array', region: 'us-east-1', devices: 4218, status: 'online' },
  { id: 'GW-04', label: 'Tundra Mesh', region: 'eu-north-2', devices: 1976, status: 'syncing' },
  { id: 'GW-07', label: 'Delta Yard', region: 'ap-south-1', devices: 3042, status: 'online' },
  { id: 'GW-11', label: 'Harbor Grid', region: 'us-west-2', devices: 812, status: 'degraded' }
];

export const nodegridStatusTone: Record<GatewayStatus, { dot: string; text: string; label: string }> = {
  online: { dot: 'bg-[#99f6e4]', text: 'text-[#99f6e4]', label: 'ONLINE' },
  syncing: { dot: 'bg-[#7dd3fc]', text: 'text-[#7dd3fc]', label: 'SYNCING' },
  degraded: { dot: 'bg-[#fbbf24]', text: 'text-[#fbbf24]', label: 'DEGRADED' }
};
