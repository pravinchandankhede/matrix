import { BaseModel } from './base.model';

export interface Capability extends BaseModel {
  capabilityUId: string;
  name: string;
  description: string;
  type: string;
}

export interface Feature extends BaseModel {
  featureUId: string;
  name: string;
  description: string;
  type: string;
  configuration: { [key: string]: any };
}

export interface Tool extends BaseModel {
  toolUId: string;
  name: string;
  description: string;
  type: string;
  configuration: { [key: string]: any };
}

export interface Agent extends BaseModel {
  agentUId: string;
  name: string;
  description: string;
  type: string;
  capabilities: Capability[];
  status: string;
  version: string;
  features: Feature[];
  tools: Tool[];
}
