// ------------------------------------------------------------------------------
//  Author: Pravin Chandankhede
//  Copyright (c) 2025 Pravin Chandankhede
//  This file is part of the Matrix project.
//  Licensed under the MIT License. See LICENSE file in the project root for details.
//  THIS CODE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND.
// ------------------------------------------------------------------------------

namespace Matrix.AgenticLayer.BaseAgent;

using Matrix.AgenticLayer.Builders;
using Matrix.AgenticLayer.Interfaces;

public class AgentFactory
{
    public static IAgentBuilder CreateBuilder()
    {
        return new AgentBuilder();
    }
}