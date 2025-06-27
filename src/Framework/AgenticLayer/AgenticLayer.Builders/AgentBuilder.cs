namespace Matrix.AgenticLayer.Builders;

using Matrix.AgenticLayer.Interfaces;

public class AgentBuilder : IAgentBuilder
{
    public String? AgentName { get; private set; }
    public String? AgentType { get; private set; }

    public void ConfigureAgent(String agentName, String agentType)
    {
        AgentName = agentName;
        AgentType = agentType;
    }
}
