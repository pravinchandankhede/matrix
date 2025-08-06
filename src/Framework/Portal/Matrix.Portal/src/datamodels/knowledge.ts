import { DataSourceCollection } from './data-source-collection.model';
import { Model } from './model';
import { DataSource } from './data-source.model';
import { Chunk } from './chunk.model';

export interface Knowledge {
  knowledgeUId: string;
  type: string;
  dataSourceCollection: DataSourceCollection;
  model: Model;
  status: string;
  outputDataSource: DataSource;
  chunkStrategy: Chunk;
}
