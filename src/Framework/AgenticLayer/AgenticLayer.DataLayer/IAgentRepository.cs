namespace Matrix.AgenticLayer.DataLayer;

using Matrix.AgenticLayer.AgentModels;
using System;

public interface IAgentRepository
{
    void AddAgent(Agent agent);
    void UpdateAgent(Agent agent);
    Agent? GetAgent(String name);
    void RemoveAgent(String name);
    IEnumerable<Agent> GetAllAgents();
}
