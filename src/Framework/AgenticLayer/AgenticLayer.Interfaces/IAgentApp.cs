namespace Matrix.AgenticLayer.Interfaces;

using Matrix.AgenticLayer.AgentModels;

public interface IAgentApp
{
    AgentResponse GetChatResponseAsync(AgentRequest request);
}
