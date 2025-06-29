namespace Matrix.AgenticLayer.Interfaces;

using Matrix.AgenticLayer.AgentModels;

public interface IAgentBuilder
{
    IAgentBuilder ConfigureAgent(String agentName, String agentType);
    IAgentBuilder ConfigureTextEmbeddingModel(String modelName, AIModel aIModel);
}