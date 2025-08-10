import { BaseModel } from './base.model';

export interface ChunkStrategy {
  strategyType: string;
  parameters: { [key: string]: any };
}

export interface Chunk extends BaseModel {
  chunkUId: string;
  chunkId: string;
  text: string;
  type: string;
  chunkSource: string;
  chunkSourceId: string;
  correlationUId: string;
  chunkStrategy?: ChunkStrategy;
}
