import { BaseModel } from './base.model';
import { Chunk } from "./chunk.model";
import { DataSource, DataSourceCollection } from "./data-source.model";
import { Model } from "./model";

export interface Knowledge extends BaseModel {
    knowledgeUId: string;
    type: string;
    dataSourceCollection: DataSourceCollection;
    models : Model;
    status: string;
    outputDataSource : DataSource;
    chunkStrategy : Chunk;
}
