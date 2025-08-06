import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Chunk } from '../datamodels/chunk.model';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ChunkService {
    private apiUrl = 'https://localhost:7179/chunks'; // Update with your actual API endpoint

    constructor(private http: HttpClient) { }

    getChunks(): Observable<Chunk[]> {
        // For now, return mock data until API is available
        return of(this.getMockChunks());
    }

    getChunk(id: string): Observable<Chunk> {
        return this.http.get<Chunk>(`${this.apiUrl}/${id}`);
    }

    createChunk(chunk: Chunk): Observable<Chunk> {
        return this.http.post<Chunk>(this.apiUrl, chunk);
    }

    updateChunk(chunk: Chunk): Observable<Chunk> {
        return this.http.put<Chunk>(`${this.apiUrl}/${chunk.chunkUId}`, chunk);
    }

    deleteChunk(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

    private getMockChunks(): Chunk[] {
        return [
            {
                chunkUId: 'chunk-001',
                chunkId: 'CHK-001',
                text: 'This is a sample chunk of text that contains customer information and product details for analysis.',
                type: 'Text',
                chunkSource: 'customer-db',
                chunkSourceId: 'ds-001',
                correlationUId: 'chunk-corr-001',
                chunkStrategy: {
                    strategyType: 'FixedSize',
                    parameters: { chunkSize: 1000, overlap: 100 }
                }
            },
            {
                chunkUId: 'chunk-002',
                chunkId: 'CHK-002',
                text: 'Product inventory and pricing information for Q3 2024 analysis and reporting purposes.',
                type: 'Text',
                chunkSource: 'product-api',
                chunkSourceId: 'ds-002',
                correlationUId: 'chunk-corr-002',
                chunkStrategy: {
                    strategyType: 'Semantic',
                    parameters: { minChunkSize: 500, maxChunkSize: 1500 }
                }
            },
            {
                chunkUId: 'chunk-003',
                chunkId: 'CHK-003',
                text: 'Financial data and transaction records for monthly reporting and audit purposes.',
                type: 'Data',
                chunkSource: 'finance-system',
                chunkSourceId: 'ds-003',
                correlationUId: 'chunk-corr-003',
                chunkStrategy: {
                    strategyType: 'Document',
                    parameters: { pageSize: 10, overlap: 2 }
                }
            }
        ];
    }
}
