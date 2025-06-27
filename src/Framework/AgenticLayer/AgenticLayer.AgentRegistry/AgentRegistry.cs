namespace Matrix.AgenticLayer.AgentRegistry;

using System.Collections.Concurrent;
using Matrix.AgenticLayer.AgentModels;
using System.Collections.Generic;

/// <summary>
/// A registry for managing agents in the ecosystem, allowing registration, update, retrieval, listing, and removal of agents.
/// </summary>
public class AgentRegistry
{
    private readonly ConcurrentDictionary<string, Agent> _agents = new();

    /// <summary>
    /// Registers a new agent in the registry.
    /// </summary>
    /// <param name="agent">The agent to register.</param>
    /// <returns>True if the agent was added; false if an agent with the same name already exists.</returns>
    public bool RegisterAgent(Agent agent)
    {
        return _agents.TryAdd(agent.Name, agent);
    }

    /// <summary>
    /// Updates an existing agent in the registry.
    /// </summary>
    /// <param name="agent">The agent with updated information.</param>
    /// <returns>True if the agent was updated.</returns>
    public bool UpdateAgent(Agent agent)
    {
        _agents[agent.Name] = agent;
        return true;
    }

    /// <summary>
    /// Retrieves an agent by name.
    /// </summary>
    /// <param name="name">The name of the agent.</param>
    /// <returns>The agent if found; otherwise, null.</returns>
    public Agent? GetAgent(string name)
    {
        _agents.TryGetValue(name, out var agent);
        return agent;
    }

    /// <summary>
    /// Gets all registered agents in the registry.
    /// </summary>
    /// <returns>An enumerable of all agents.</returns>
    public IEnumerable<Agent> GetAllAgents() => _agents.Values;

    /// <summary>
    /// Removes an agent from the registry by name.
    /// </summary>
    /// <param name="name">The name of the agent to remove.</param>
    /// <returns>True if the agent was removed; otherwise, false.</returns>
    public bool RemoveAgent(string name)
    {
        return _agents.TryRemove(name, out _);
    }
}
