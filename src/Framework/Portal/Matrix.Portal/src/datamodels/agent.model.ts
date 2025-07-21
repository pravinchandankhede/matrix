export interface Agent {
    name: string;
    description: string;
    type: string;
    capabilities: string[];
    status: string;
    version: string;
    createdDate: string; // ISO date string
    lastUpdatedDate: string; // ISO date string
    metadata: { [key: string]: string };
    features: string[];
    integratedTools: string[];
}
