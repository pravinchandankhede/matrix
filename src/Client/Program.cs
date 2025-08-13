// ------------------------------------------------------------------------------
//  Author: Pravin Chandankhede
//  Copyright (c) 2025 Pravin Chandankhede
//  This file is part of the Matrix project.
//  Licensed under the MIT License. See LICENSE file in the project root for details.
//  THIS CODE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND.
// ------------------------------------------------------------------------------

using Matrix.DataModels.Agents;
using Matrix.AgenticLayer.AgentRegistry;
using Matrix.AgenticLayer.BaseAgent;
using Matrix.AgenticLayer.Interfaces;
using Matrix.ModelLayer.DataLayer;
using Matrix.DataModels.Models;

public static class Program
{
    public static void Main()
    {
        var builder = AgentFactory.CreateBuilder()
            .ConfigureAgent("ExampleAgent", "SemanticKernel")
            .ConfigureTextEmbeddingModel("ExampleModel", new Model
            {
                Name = "ExampleModel",
                Type = "TextEmbedding",
                Version = "1.0",
                Description = "An example text embedding model.",
                Provider = "ExampleProvider",
                Endpoint = "https://api.example.com/embedding",
                ApiKey = "your-api-key",
                Region = "us-west-1"
            })
            .ConfigureTransformationModel("ModelName", new Model
            {
                Name = "GPT Transform Model",
                Type = "GPT",
                Version = "1.0",
                Description = "An example transformation model.",
                Provider = "ExampleProvider",
                Endpoint = "https://api.example.com/transform",
                ApiKey = "your-api",
                Region = "us-west-1"
            });

        IAgentApp agent = builder.Build();

        var response = agent.GetChatResponseAsync(new AgentRequest
        {
            Query = "who are you"
        });

        Console.WriteLine($"Response {response}");

        AgentRegistry agentRegistry = new AgentRegistry();
        agentRegistry.GetAllAgents().ToList().ForEach(m =>
        Console.WriteLine(m.Name));

        ModelRepository modelRepository = new ModelRepository();
        modelRepository.GetAllModels().ToList().ForEach(m => {
            Console.WriteLine(m.Name);
        });
    }
}