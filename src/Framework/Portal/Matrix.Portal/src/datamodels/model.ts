import { BaseModel } from './base.model';

export interface Model extends BaseModel {
    modelUId: string;
    type?: string;
    provider?: string;
    endpoint?: string;
    apiKey?: string;
    region?: string;
    isEnabled: boolean;
}
