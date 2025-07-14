namespace AgenticLayer.DataLayer;

using Matrix.AgenticLayer.AgentModels;

internal class AgentRepository : IAgentRepository
{
    readonly List<Agent> agentList = [];

    public AgentRepository()
    {
        var agents = File.ReadAllText("agents.json");
        agentList = System.Text.Json.JsonSerializer.Deserialize<List<Agent>>(agents)!;
    }

    public void AddAgent(Agent agent)
    {
        this.agentList.Add(agent);
    }

    public Agent? GetAgent(String name)
    {
        return this.agentList.FirstOrDefault(a => a.Name.Equals(name, StringComparison.OrdinalIgnoreCase));
    }

    public IEnumerable<Agent> GetAllAgents()
    {
        return this.agentList;
    }

    public void RemoveAgent(String name)
    {
        this.agentList.RemoveAll(a => a.Name.Equals(name, StringComparison.OrdinalIgnoreCase));
    }

    public void UpdateAgent(Agent agent)
    {
        var agentIndex = this.agentList.FindIndex(a => a.Name.Equals(agent.Name, StringComparison.OrdinalIgnoreCase));
        if (agentIndex >= 0)
        {
            this.agentList[agentIndex] = agent;
        }
        else
        {
            throw new KeyNotFoundException($"Agent with name {agent.Name} not found.");
        }
    }
}
