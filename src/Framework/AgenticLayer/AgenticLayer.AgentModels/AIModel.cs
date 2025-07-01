// ------------------------------------------------------------------------------
//  Author: Pravin Chandankhede
//  Copyright (c) 2025 Pravin Chandankhede
//  This file is part of the Matrix project.
//  Licensed under the MIT License. See LICENSE file in the project root for details.
//  THIS CODE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND.
// ------------------------------------------------------------------------------

namespace Matrix.AgenticLayer.AgentModels;

public class AIModel
{
    public String? ModelName { get; set; }
    public String? ModelType { get; set; }
    public String? ModelVersion { get; set; }
    public String? ModelDescription { get; set; }
    public String? ModelProvider { get; set; }
    public String? ModelEndpoint { get; set; }
    public String? ModelApiKey { get; set; }
    public String? ModelRegion { get; set; }
    public Boolean IsEnabled { get; set; } = true;
}
