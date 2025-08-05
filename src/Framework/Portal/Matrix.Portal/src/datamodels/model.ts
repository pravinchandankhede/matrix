import { BaseModel } from './base.model';

export interface Model extends BaseModel {
    ModelUId: string;
    Type?: string;
    Provider?: string;
    Endpoint?: string;
    ApiKey?: string;
    Region?: string;
    IsEnabled: boolean;
}
