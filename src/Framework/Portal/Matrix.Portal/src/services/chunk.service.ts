import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Chunk } from '../datamodels/chunk.model';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ChunkService {
    private apiUrl = 'https://localhost:7179/chunks'; // Update with your actual API endpoint

    constructor(private http: HttpClient) { }

    getChunks(): Observable<Chunk[]> {
        return this.http.get<Chunk[]>(this.apiUrl);
    }

    addChunk(chunk: Chunk): Observable<Chunk> {
        return this.http.post<Chunk>(this.apiUrl, chunk);
    }
}
