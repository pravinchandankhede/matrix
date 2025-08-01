// ------------------------------------------------------------------------------
//  Author: Pravin Chandankhede
//  Copyright (c) 2025 Pravin Chandankhede
//  This file is part of the Matrix project.
//  Licensed under the MIT License. See LICENSE file in the project root for details.
//  THIS CODE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND.
// ------------------------------------------------------------------------------

namespace Matrix.DataModels.Agents;

using System.Collections.Generic;

/// <summary>
/// Represents an agent in the ecosystem, including its name, metadata, features, capabilities, and integrated tools.
/// </summary>
public class Agent
{
    /// <summary>
    /// Gets or sets the unique identifier for the agent.
    /// </summary>
    public Guid AgentUId { get; set; }

    /// <summary>
    /// The unique name of the agent.
    /// </summary>
    public String Name { get; set; } = String.Empty;

    /// <summary>
    /// Description of the agent, providing a brief overview of its purpose and functionality.
    /// </summary>
    public String Description { get; set; } = String.Empty;

    /// <summary>
    /// Type of the agent, which can be used to categorize or classify the agent (e.g., "chatbot", "data-processor", etc.).
    /// </summary>
    public String Type { get; set; } = String.Empty;

    /// <summary>
    /// A list of capabilities supported by the agent.
    /// </summary>
    public List<String> Capabilities { get; set; } = new();

    /// <summary>
    /// Status like Active, Inactive, Maintenance, etc., indicating the current operational state of the agent.
    /// </summary>
    public String Status { get; set; } = String.Empty;

    /// <summary>
    /// Version of the agent, which can be used to track updates or changes in functionality.
    /// </summary>
    public String Version { get; set; } = String.Empty;

    /// <summary>
    /// Creation date of agent.
    /// </summary>
    public DateTime CreatedDate { get; set; }

    /// <summary>
    /// Last updated on.
    /// </summary>
    public DateTime LastUpdatedDate { get; set; }

    /// <summary>
    /// Arbitrary metadata describing the agent as a property bag (e.g., description, version, author, etc.).
    /// </summary>
    public Dictionary<String, String> Metadata { get; set; } = new();

    /// <summary>
    /// A list of features provided by the agent.
    /// </summary>
    public List<String> Features { get; set; } = new();    

    /// <summary>
    /// A list of tools that the agent integrates with.
    /// </summary>
    public List<String> IntegratedTools { get; set; } = new();
}
