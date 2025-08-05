// ------------------------------------------------------------------------------
//  Author: Pravin Chandankhede
//  Copyright (c) 2025 Pravin Chandankhede
//  This file is part of the Matrix project.
//  Licensed under the MIT License. See LICENSE file in the project root for details.
//  THIS CODE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND.
// ------------------------------------------------------------------------------

namespace Matrix.AgenticLayer.AgentApp;

using Matrix.AgenticLayer.Interfaces;
using Matrix.DataModels.Agents;

public class AgentApp : IAgentApp
{
    public AgentApp(String agentName, String agentType)
    {
        AgentName = agentName;
        AgentType = agentType;
    }

    public String AgentName { get; }
    public String AgentType { get; }

    public virtual AgentResponse GetChatResponseAsync(AgentRequest request)
    {
        // Default implementation, can be overridden
        return new AgentResponse { Response = $"[BaseAgentApp] {request.Query}", IsComplete = true };
    }
}
