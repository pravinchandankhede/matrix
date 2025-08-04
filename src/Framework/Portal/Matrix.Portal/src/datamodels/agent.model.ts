import { BaseModel } from './base.model';

export interface Agent extends BaseModel {
    agentUId: string;
    type: string;
    capabilities: string[];
    status: string;
    features: string[];
    integratedTools: string[];
}
