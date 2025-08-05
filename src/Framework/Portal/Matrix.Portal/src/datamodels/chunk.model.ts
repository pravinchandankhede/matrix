import { BaseModel } from './base.model';

export interface Chunk extends BaseModel {
    ChunkId: string;
    Text: string;
    Type: string;
    ChunkSource: string;
    ChunkSourceId: string;
    CorrelationUId: string; // Guid as string
}

export interface ChunkStrategy extends BaseModel {
    ChunkStrategyUId: string;
    Text: string;
    Type: string;    
    CorrelationUId: string; // Guid as string
}
