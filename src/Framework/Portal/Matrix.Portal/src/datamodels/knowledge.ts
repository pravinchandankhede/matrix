import { DataSourceCollection } from './data-source-collection.model';
import { Model } from './model';
import { DataSource } from './data-source.model';
import { Chunk } from './chunk.model';

/**
 * Knowledge interface representing knowledge management entities
 */
export interface Knowledge {
  knowledgeUId: string;
  name: string;
  type: string;
  dataSourceCollection: DataSourceCollection;
  model: Model;
  status: string;
  outputDataSource: DataSource;
  chunkStrategy: Chunk;
}
