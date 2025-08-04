import { BaseModel } from './base.model';

export interface Chunk extends BaseModel {
    chunkId: string;
    text: string;
    type: string;
    chunkSource: string;
    chunkSourceId: string;
    correlationUId: string; // Guid as string
}

export interface ChunkStrategy extends BaseModel {
    chunkStrategyUId: string;
    text: string;
    type: string;    
    correlationUId: string; // Guid as string
}
