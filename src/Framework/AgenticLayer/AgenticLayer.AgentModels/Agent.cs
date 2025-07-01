// ------------------------------------------------------------------------------
//  Author: Pravin Chandankhede
//  Copyright (c) 2025 Pravin Chandankhede
//  This file is part of the Matrix project.
//  Licensed under the MIT License. See LICENSE file in the project root for details.
//  THIS CODE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND.
// ------------------------------------------------------------------------------

namespace Matrix.AgenticLayer.AgentModels;

using System.Collections.Generic;

/// <summary>
/// Represents an agent in the ecosystem, including its name, metadata, features, capabilities, and integrated tools.
/// </summary>
public class Agent
{
    /// <summary>
    /// The unique name of the agent.
    /// </summary>
    public String Name { get; set; } = String.Empty;

    /// <summary>
    /// Arbitrary metadata describing the agent as a property bag (e.g., description, version, author, etc.).
    /// </summary>
    public Dictionary<String, String> Metadata { get; set; } = new();

    /// <summary>
    /// A list of features provided by the agent.
    /// </summary>
    public List<String> Features { get; set; } = new();

    /// <summary>
    /// A list of capabilities supported by the agent.
    /// </summary>
    public List<String> Capabilities { get; set; } = new();

    /// <summary>
    /// A list of tools that the agent integrates with.
    /// </summary>
    public List<String> IntegratedTools { get; set; } = new();
}
