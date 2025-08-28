import { BaseModel } from './base.model';

/**
 * Chunk strategy interface for defining chunking strategies
 */
export interface ChunkStrategy extends BaseModel {
    chunkStrategyUId: string;
    name: string;
    description: string;
    parameters?: string;
    type: string;
}

/**
 * Chunk interface representing data chunks
 */
export interface Chunk extends BaseModel {
    chunkUId: string;
    chunkId: string;
    text: string;
    type: string;
    chunkSource: string;
    chunkSourceId: string;
    chunkStrategy?: ChunkStrategy;
}
