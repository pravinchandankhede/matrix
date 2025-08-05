import { BaseModel } from './base.model';
import { Chunk } from "./chunk.model";
import { DataSource, DataSourceCollection } from "./data-source.model";
import { Model } from "./model";

export interface Knowledge extends BaseModel {
    KnowledgeUId: string;
    Type: string;
    DataSourceCollection: DataSourceCollection;
    Models : Model;
    Status: string;
    OutputDataSource : DataSource;
    ChunkStrategy : Chunk;
}
