namespace Matrix.AgenticLayer.BaseAgent;

using Matrix.AgenticLayer.Builders;
using Matrix.AgenticLayer.Interfaces;

internal class AgentFactory
{
    internal static IAgentBuilder CreateBuilder()
    {
        return new AgentBuilder();
    }
}