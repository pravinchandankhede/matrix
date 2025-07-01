// ------------------------------------------------------------------------------
//  Author: Pravin Chandankhede
//  Copyright (c) 2025 Pravin Chandankhede
//  This file is part of the Matrix project.
//  Licensed under the MIT License. See LICENSE file in the project root for details.
//  THIS CODE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND.
// ------------------------------------------------------------------------------

namespace Matrix.AgenticLayer.AgentApp;

using Matrix.AgenticLayer.Interfaces;

public class AgentAppFactory
{
    public static IAgentApp CreateAgentApp(String agentName, String agentType)
    {
        if (String.IsNullOrWhiteSpace(agentType))
        {
            throw new ArgumentException("Agent type cannot be null or whitespace.", nameof(agentType));
        }

        if ((agentType == "SemanticKernel"))
        {
            return new SemanticKernelAgentApp(agentName, agentType);
        }
        else if (agentType == "OpenAI")
        {
            return new OpenAIAgentApp(agentName, agentType);
        }
        else if (agentType == "AzureOpenAI")
        {
            return new AzureOpenAIAgentApp(agentName, agentType);
        }
        else if (agentType == "Custom")
        {
            return new CustomAgentApp(agentName, agentType);
        }

        throw new NotSupportedException($"Agent type '{agentType}' is not supported.");
    }
}
