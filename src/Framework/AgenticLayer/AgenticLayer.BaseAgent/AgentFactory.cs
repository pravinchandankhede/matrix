namespace Matrix.AgenticLayer.BaseAgent;

using Matrix.AgenticLayer.Builders;
using Matrix.AgenticLayer.Interfaces;

public class AgentFactory
{
    public static IAgentBuilder CreateBuilder()
    {
        return new AgentBuilder();
    }
}