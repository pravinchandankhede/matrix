namespace Matrix.AgenticLayer.Builders;

using Matrix.AgenticLayer.AgentModels;
using Matrix.AgenticLayer.Interfaces;

public class AgentBuilder : IAgentBuilder
{
    public String? AgentName { get; private set; }
    public String? AgentType { get; private set; }

    public IAgentBuilder ConfigureTextEmbeddingModel(String modelName, AIModel aIModel)
    {
        throw new NotImplementedException();
    }

    public IAgentBuilder ConfigureAgent(String agentName, String agentType)
    {
        AgentName = agentName;
        AgentType = agentType;

        return this;
    }

    public IAgentApp Build()
    {
        throw new NotImplementedException();
    }
}
