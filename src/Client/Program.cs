// ------------------------------------------------------------------------------
//  Author: Pravin Chandankhede
//  Copyright (c) 2025 Pravin Chandankhede
//  This file is part of the Matrix project.
//  Licensed under the MIT License. See LICENSE file in the project root for details.
//  THIS CODE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND.
// ------------------------------------------------------------------------------

using Matrix.AgenticLayer.AgentModels;
using Matrix.AgenticLayer.BaseAgent;
using Matrix.AgenticLayer.Interfaces;

public static class Program
{
    public static void Main(String[] args)
    {
        var builder = AgentFactory.CreateBuilder()
            .ConfigureAgent("ExampleAgent", "TypeA")
            .ConfigureTextEmbeddingModel("ExampleModel", new AIModel
            {
                ModelName = "ExampleModel",
                ModelType = "TextEmbedding",
                ModelVersion = "1.0",
                ModelDescription = "An example text embedding model.",
                ModelProvider = "ExampleProvider",
                ModelEndpoint = "https://api.example.com/embedding",
                ModelApiKey = "your-api-key",
                ModelRegion = "us-west-1"
            })
            .ConfigureTransformationModel("ModelName", new AIModel
            {
                ModelName = "GPT Transform Model",
                ModelType = "GPT",
                ModelVersion = "1.0",
                ModelDescription = "An example transformation model.",
                ModelProvider = "ExampleProvider",
                ModelEndpoint = "https://api.example.com/transform",
                ModelApiKey = "your-api",
                ModelRegion = "us-west-1"
            });

        IAgentApp agent = builder.Build();

        var response = agent.GetChatResponseAsync(new AgentRequest
        {
            Query = "who are you"
        });

        Console.WriteLine($"Response {response}");
    }
}