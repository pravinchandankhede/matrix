namespace Matrix.DataRepository.Repositories;

using Matrix.DataModels.Agents;
using Matrix.DataRepository.Interfaces;
using System;
using System.Collections.Generic;

public class AgentRepository : IAgentRepository
{
    readonly List<Agent> agentList = [];

    public AgentRepository()
    {
        String directory = AppDomain.CurrentDomain.BaseDirectory;
        String agents = File.ReadAllText(Path.Join(directory, "agents.json"));
        agentList = System.Text.Json.JsonSerializer.Deserialize<List<Agent>>(agents)!;
    }

    public Agent Add(Agent entity)
    {
        this.agentList.Add(entity);
        return entity;
    }

    public void Delete(Agent entity)
    {
        this.agentList.RemoveAll(a => a.AgentUId == entity.AgentUId);
    }

    public IEnumerable<Agent> GetAll()
    {
        return this.agentList;
    }

    public Agent GetById(Guid entityUId)
    {
        Agent? agent = agentList.FirstOrDefault(a => a.AgentUId == entityUId);

        if (agent == null)
        {
            throw new KeyNotFoundException($"Agent with ID {entityUId} not found.");
        }

        return agent;
    }

    public Agent Update(Agent entity)
    {
        Int32 agentIndex = this.agentList.FindIndex(a => a.AgentUId == entity.AgentUId);

        if (agentIndex >= 0)
        {
            this.agentList[agentIndex] = entity;
        }
        else
        {
            throw new KeyNotFoundException($"Agent with name {entity.Name} not found.");
        }

        return entity;
    }
}
