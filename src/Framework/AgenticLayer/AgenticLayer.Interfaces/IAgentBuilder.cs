// ------------------------------------------------------------------------------
//  Author: Pravin Chandankhede
//  Copyright (c) 2025 Pravin Chandankhede
//  This file is part of the Matrix project.
//  Licensed under the MIT License. See LICENSE file in the project root for details.
//  THIS CODE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND.
// ------------------------------------------------------------------------------

namespace Matrix.AgenticLayer.Interfaces;

using Matrix.DataModels.Models;

public interface IAgentBuilder
{
    IAgentApp Build();
    IAgentBuilder ConfigureAgent(String agentName, String agentType);
    IAgentBuilder ConfigureTextEmbeddingModel(String modelName, Model model);
    IAgentBuilder ConfigureTransformationModel(String modelName, Model model);
}