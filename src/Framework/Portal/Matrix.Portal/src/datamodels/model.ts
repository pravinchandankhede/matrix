export interface Model {
    modelUId: string;
    name: string;
    type?: string;
    version?: string;
    description?: string;
    provider?: string;
    endpoint?: string;
    apiKey?: string;
    region?: string;
    isEnabled: boolean;
}
