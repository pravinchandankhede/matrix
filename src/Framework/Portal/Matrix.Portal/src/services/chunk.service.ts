import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Chunk, ChunkStrategy } from '../datamodels';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ChunkService {
    private apiUrl = 'https://localhost:7179/chunks'; // Update with your actual API endpoint

    constructor(private http: HttpClient) { }

    getChunks(): Observable<Chunk[]> {
        return this.http.get<Chunk[]>(this.apiUrl);
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

    // Enhanced chunk operations
    getChunksBySource(sourceId: string): Observable<Chunk[]> {
        return this.http.get<Chunk[]>(`${this.apiUrl}/source/${sourceId}`);
    }

    getChunksByType(type: string): Observable<Chunk[]> {
        return this.http.get<Chunk[]>(`${this.apiUrl}/type/${type}`);
    }

    getChunkStrategies(): Observable<ChunkStrategy[]> {
        return this.http.get<ChunkStrategy[]>(`${this.apiUrl}/strategies`);
    }

    getChunkStrategy(id: string): Observable<ChunkStrategy> {
        return this.http.get<ChunkStrategy>(`${this.apiUrl}/strategies/${id}`);
    }

    createChunkStrategy(strategy: ChunkStrategy): Observable<ChunkStrategy> {
        return this.http.post<ChunkStrategy>(`${this.apiUrl}/strategies`, strategy);
    }

    updateChunkStrategy(strategy: ChunkStrategy): Observable<ChunkStrategy> {
        return this.http.put<ChunkStrategy>(`${this.apiUrl}/strategies/${strategy.chunkStrategyUId}`, strategy);
    }

    deleteChunkStrategy(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/strategies/${id}`);
    }

    searchChunks(query: string): Observable<Chunk[]> {
        return this.http.get<Chunk[]>(`${this.apiUrl}/search?q=${encodeURIComponent(query)}`);
    }
}
