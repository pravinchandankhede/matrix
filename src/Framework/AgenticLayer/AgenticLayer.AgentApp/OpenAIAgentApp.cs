// ------------------------------------------------------------------------------
//  Author: Pravin Chandankhede
//  Copyright (c) 2025 Pravin Chandankhede
//  This file is part of the Matrix project.
//  Licensed under the MIT License. See LICENSE file in the project root for details.
//  THIS CODE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND.
// ------------------------------------------------------------------------------

namespace Matrix.AgenticLayer.AgentApp;

using Matrix.DataModels.Agents;
using System;

internal class OpenAIAgentApp : AgentApp
{
    public OpenAIAgentApp(String agentName, String agentType)
        : base(agentName, agentType)
    {
    }

    public override AgentResponse GetChatResponseAsync(AgentRequest request)
    {
        // TODO: Implement actual logic
        return new AgentResponse { Response = $"[OpenAI] {request.Query}", IsComplete = true };
    }
}