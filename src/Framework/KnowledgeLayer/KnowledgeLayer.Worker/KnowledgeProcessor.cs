namespace Matrix.KnowledgeLayer.Worker;

using Matrix.ChunkEngine.Interfaces;
using Matrix.ChunkEngine.Worker.Strategies;
using Matrix.DataModels.Chunks;
using Matrix.DataSourceLayer.DataLayer;
using Matrix.DataSourceLayer.Interfaces;
using Matrix.KnowledgeLayer.Interfaces;

public class KnowledgeProcessor
{
    private readonly IKnowledgeRepository _knowledgeRepository;
    private readonly IDataSourceRepository _dataSourceRepository;
    private readonly DataSourceManager _dataSourceManager;
    private readonly IChunkProcessor _chunkProcessor;

    public KnowledgeProcessor(IKnowledgeRepository knowledgeRepository,
            IDataSourceRepository dataSourceRepository,
            DataSourceManager dataSourceManager,
            IChunkProcessor chunkProcessor)
    {
        this._knowledgeRepository = knowledgeRepository;
        this._dataSourceRepository = dataSourceRepository;
        this._dataSourceManager = dataSourceManager;
        this._chunkProcessor = chunkProcessor;
    }

    public void ProcessKnowledge()
    {
        // Implementation of knowledge processing logic
        // This is a placeholder for the actual processing code
        Console.WriteLine("Processing knowledge...");

        //fetch all data sources
        //for each data source, fetch the data
        //for each data item, chunk the data item
        //for each chunk, generte embeddings
        //for each embedding, store it in the knowledge base using vector DB.

        var knowledgeItems = _knowledgeRepository.GetAllKnowledge();
        foreach (var item in knowledgeItems)
        {
            var dataSourceCollection = item.DataSourceCollection;

            foreach (var dataSource in dataSourceCollection.DataSources)
            {
                // Fetch data from the data source
                Console.WriteLine($"Fetching data from {dataSource.Name}...");

                var documents = this._dataSourceManager.Load(dataSource);

                var chunkStrategy = new FixedSizeStrategy();

                // Process each data item
                foreach (var document in documents)
                {
                    // Chunk the data item
                    var chunks =_chunkProcessor.GetChunks(document, chunkStrategy);

                    foreach (var chunk in chunks)
                    {
                        // Generate embeddings for each chunk
                        var embedding = GenerateEmbedding(chunk);
                        // Store the embedding in the knowledge base
                        _knowledgeRepository.AddKnowledge(new Knowledge
                        {
                            DataSource = dataSource,
                            Chunk = chunk,
                            Embedding = embedding
                        });
                    }
                }
            }
        }
    }
}
