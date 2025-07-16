// ------------------------------------------------------------------------------
//  Author: Pravin Chandankhede
//  Copyright (c) 2025 Pravin Chandankhede
//  This file is part of the Matrix project.
//  Licensed under the MIT License. See LICENSE file in the project root for details.
//  THIS CODE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND.
// ------------------------------------------------------------------------------

namespace Matrix.AgenticLayer.AgentRegistry;

using Matrix.AgenticLayer.AgentModels;
using System.Collections.Concurrent;
using System.Collections.Generic;
using Matrix.AgenticLayer.DataLayer;

/// <summary>
/// A registry for managing agents in the ecosystem, allowing registration, update, retrieval, listing, and removal of agents.
/// </summary>
public class AgentRegistry
{
    private readonly IAgentRepository _repository = new AgentRepository();

    /// <summary>
    /// Registers a new agent in the registry.
    /// </summary>
    /// <param name="agent">The agent to register.</param>
    /// <returns>True if the agent was added; false if an agent with the same name already exists.</returns>
    public void RegisterAgent(Agent agent)
    {
        _repository.AddAgent( agent);
    }

    /// <summary>
    /// Updates an existing agent in the registry.
    /// </summary>
    /// <param name="agent">The agent with updated information.</param>
    /// <returns>True if the agent was updated.</returns>
    public Boolean UpdateAgent(Agent agent)
    {
        _repository.UpdateAgent(agent);
        return true;
    }

    /// <summary>
    /// Retrieves an agent by name.
    /// </summary>
    /// <param name="name">The name of the agent.</param>
    /// <returns>The agent if found; otherwise, null.</returns>
    public Agent? GetAgent(String name)
    {
        var agent = _repository.GetAgent(name);
        return agent;
    }

    /// <summary>
    /// Gets all registered agents in the registry.
    /// </summary>
    /// <returns>An enumerable of all agents.</returns>
    public IEnumerable<Agent> GetAllAgents() => _repository.GetAllAgents();

    /// <summary>
    /// Removes an agent from the registry by name.
    /// </summary>
    /// <param name="name">The name of the agent to remove.</param>
    /// <returns>True if the agent was removed; otherwise, false.</returns>
    public Boolean RemoveAgent(String name)
    {
        _repository.RemoveAgent(name);
        return true;
    }
}
