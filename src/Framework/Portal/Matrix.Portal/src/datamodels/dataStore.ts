import { BaseModel } from './base.model';

/**
 * Data store interface for managing data storage entities
 * This interface may need to be updated when the corresponding C# model is available
 */
export interface DataStore extends BaseModel {
  dataStoreUId: string;
  type: string; // Type of the data store (e.g., SQL, NoSQL, FileSystem)
  isCustom: boolean;
  owner: string;
}
