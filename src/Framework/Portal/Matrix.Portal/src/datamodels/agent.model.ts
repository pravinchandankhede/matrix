import { BaseModel } from './base.model';

export interface Agent extends BaseModel {
    AgentUId: string;
    Type: string;
    Capabilities: string[];
    Status: string;
    Features: string[];
    IntegratedTools: string[];
}
