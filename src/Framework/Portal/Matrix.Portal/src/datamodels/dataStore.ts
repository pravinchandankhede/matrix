import { CustomizableModel } from './base.model';

export interface DataStore extends CustomizableModel {
  dataStoreUId: string;
  type: string; // Type of the data store (e.g., SQL, NoSQL, FileSystem)
}
