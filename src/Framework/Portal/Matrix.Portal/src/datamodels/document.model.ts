import { Metadata } from './base.model';

/**
 * Document interface for representing documents in the system
 */
export interface Document {
  documentUId: string;
  documentId: string;
  documentText: string;
  metadata: Metadata[];
}

/**
 * Fixed size chunk strategy interface extending chunk strategy
 */
export interface FixedSizeChunkStrategy {
  startIndex: number;
  endIndex: number;
  type: 'FixedSize';
}
