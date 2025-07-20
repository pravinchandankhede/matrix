export interface Agent {
  name: string;
  status: 'Running' | 'Idle' | string;
  type: string;
  description: string;
}
