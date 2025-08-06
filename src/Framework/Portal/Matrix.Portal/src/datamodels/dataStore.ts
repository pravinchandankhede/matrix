import { CustomizableModel } from './base.model';

export interface DataStore extends CustomizableModel {
  DataStoreUId: string;
  Type: string; // Type of the data store (e.g., SQL, NoSQL, FileSystem)
}

// TODO: Define DataStore model based on C# source if available
export interface DataStore {
  [key: string]: any;
}
