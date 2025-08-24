namespace Matrix.KnowledgeLayer.Worker;

using Matrix.ChunkEngine.Interfaces;
using Matrix.ChunkEngine.Worker.Strategies;
using Matrix.DataModels.Chunks;
using Matrix.DataModels.Knowledge;
using Matrix.DataSourceLayer.DataLayer;
using Matrix.DataSourceLayer.Interfaces;
using Matrix.EmbeddingEngine.Interfaces;
using Matrix.KnowledgeLayer.Interfaces;

public class KnowledgeProcessor
{
    private readonly IKnowledgeRepository _knowledgeRepository;
    private readonly IDataSourceRepository _dataSourceRepository;
    private readonly DataSourceManager _dataSourceManager;
    private readonly IChunkProcessor _chunkProcessor;
    private readonly IEmbedProcessor _embedProcessor;

    public KnowledgeProcessor(IKnowledgeRepository knowledgeRepository,
            IDataSourceRepository dataSourceRepository,
            DataSourceManager dataSourceManager,
            IChunkProcessor chunkProcessor,
            IEmbedProcessor embedProcessor)
    {
        this._knowledgeRepository = knowledgeRepository;
        this._dataSourceRepository = dataSourceRepository;
        this._dataSourceManager = dataSourceManager;
        this._chunkProcessor = chunkProcessor;
        this._embedProcessor = embedProcessor;
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

        IEnumerable<DataModels.Knowledge.Knowledge> knowledgeItems = _knowledgeRepository.GetAllKnowledge();
        foreach (DataModels.Knowledge.Knowledge item in knowledgeItems)
        {
            DataModels.DataSources.DataSourceCollection dataSourceCollection = item.DataSourceCollection;

            foreach (DataModels.DataSources.DataSource dataSource in dataSourceCollection.DataSources)
            {
                // Fetch data from the data source
                Console.WriteLine($"Fetching data from {dataSource.Name}...");

                List<Document> documents = this._dataSourceManager.Load(dataSource);
                FixedSizeStrategy chunkStrategy = new FixedSizeStrategy();

                // Process each data item
                foreach (Document document in documents)
                {
                    // Chunk the data item
                    IEnumerable<Chunk> chunks = _chunkProcessor.GetChunks(document, chunkStrategy);

                    foreach (Chunk chunk in chunks)
                    {
                        // Generate embeddings for each chunk
                        var embeddings = _embedProcessor.GetEmbeddings(chunk.Text);

                        // Store the embedding in the knowledge base
                        _knowledgeRepository.AddKnowledge(new Knowledge
                        {
                            KnowledgeUId = Guid.NewGuid(),
                            Name = item.Name,
                            Type = item.Type,
                            DataSourceCollection = dataSourceCollection,
                            Model = item.Model,
                            Status = "Processed",
                            OutputDataSource = item.OutputDataSource,
                            ChunkStrategy = item.ChunkStrategy
                        });
                    }
                }
            }
        }
    }
}
