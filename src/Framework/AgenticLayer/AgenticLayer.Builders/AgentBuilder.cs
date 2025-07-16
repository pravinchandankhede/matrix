// ------------------------------------------------------------------------------
//  Author: Pravin Chandankhede
//  Copyright (c) 2025 Pravin Chandankhede
//  This file is part of the Matrix project.
//  Licensed under the MIT License. See LICENSE file in the project root for details.
//  THIS CODE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND.
// ------------------------------------------------------------------------------

namespace Matrix.AgenticLayer.Builders;

using Matrix.AgenticLayer.AgentApp;
using Matrix.AgenticLayer.AgentModels;
using Matrix.AgenticLayer.Interfaces;

public class AgentBuilder : IAgentBuilder
{
    public String? AgentName { get; private set; }
    public String? AgentType { get; private set; }

    public IAgentApp? AgentApp { get; set; } = null;

    public IAgentBuilder ConfigureTextEmbeddingModel(String modelName, AIModel aIModel)
    {
        //throw new NotImplementedException();
        return this;
    }

    public IAgentBuilder ConfigureAgent(String agentName, String agentType)
    {
        AgentName = agentName;
        AgentType = agentType;

        this.AgentApp = AgentAppFactory.CreateAgentApp(agentName, agentType);

        return this;
    }

    public IAgentApp Build()
    {
        return this.AgentApp!;
        //throw new NotImplementedException();
    }

    public IAgentBuilder ConfigureTransformationModel(String modelName, AIModel aIModel)
    {
        //throw new NotImplementedException();
        return this;
    }
}
