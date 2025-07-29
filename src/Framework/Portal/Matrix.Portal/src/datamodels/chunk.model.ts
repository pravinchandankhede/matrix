export interface Chunk {
    chunkId: string;
    text: string;
    type: string;
    chunkSource: string;
    chunkSourceId: string;
    correlationUId: string; // Guid as string
}
