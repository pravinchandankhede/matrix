import { BaseModel } from './base.model';

/**
 * Capability interface representing agent capabilities
 */
export interface Capability extends BaseModel {
  capabilityUId: string;
  name: string;
  description: string;
  type: string;
}

/**
 * Feature interface representing agent features
 */
export interface Feature extends BaseModel {
  featureUId: string;
  name: string;
  description: string;
}

/**
 * Tool interface representing integrated tools
 */
export interface Tool extends BaseModel {
  toolUId: string;
  name: string;
  description: string;
  type: string;
  version: string;
}

/**
 * Agent interface representing an agent in the ecosystem
 */
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

/**
 * Agent request interface for agent interactions
 */
export interface AgentRequest {
  query: string;
}

/**
 * Agent response interface for agent interactions
 */
export interface AgentResponse {
  response: string;
  isComplete: boolean;
}
