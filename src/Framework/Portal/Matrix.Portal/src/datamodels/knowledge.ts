import { BaseModel } from './base.model';
import { DataSourceCollection } from './data-source-collection.model';
import { Model } from './model';
import { DataSource } from './data-source.model';
import { Chunk } from './chunk.model';

/**
 * Knowledge interface representing knowledge management entities
 */
export interface Knowledge extends BaseModel {
    knowledgeUId: string;
    name: string;
    description: string;
    type: string;
    dataSourceCollection: DataSourceCollection;
    model: Model;
    status: string;
    outputDataSource: DataSource;
    chunkStrategy: Chunk;
    version: string;
}

/**
 * Knowledge request interface for knowledge processing
 */
export interface KnowledgeRequest {
    query: string;
    type: string;
}

/**
 * Knowledge response interface for knowledge processing
 */
export interface KnowledgeResponse {
    response: string;
    isComplete: boolean;
    progress: number;
}
