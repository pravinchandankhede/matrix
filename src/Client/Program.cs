using Matrix.AgenticLayer.AgentModels;
using Matrix.AgenticLayer.BaseAgent;
using Matrix.AgenticLayer.Interfaces;

public static class Program
{
    public static void Main(String[] args)
    {
        // This is the entry point of the application.
        // You can add your application logic here.

        var builder = AgentFactory.CreateBuilder()
            .ConfigureAgent("ExampleAgent", "TypeA")
            .ConfigureTextEmbeddingModel("ExampleModel", new AIModel
            {
                ModelName = "ExampleModel",
                ModelType = "TextEmbedding",
                ModelVersion = "1.0",
                ModelDescription = "An example text embedding model.",
                ModelProvider = "ExampleProvider",
                ModelEndpoint = "https://api.example.com/embedding",
                ModelApiKey = "your-api-key",
                ModelRegion = "us-west-1"
            });

        IAgentApp agent = builder.Build();

        var response = agent.GetChatResponse("who are you");

        Console.WriteLine($"Response {response}");
    }
}