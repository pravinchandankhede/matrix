namespace Matrix.KnowledgeLayer.DataLayer;

using Matrix.DataModels.DataSources;
using Matrix.DataModels.Knowledge;
using Matrix.KnowledgeLayer.Interfaces;
using System;
using System.Collections.Generic;
using System.Text.Json;
using System.Text.Json.Serialization;

public class KnowledgeRepository : IKnowledgeRepository
{
    public List<Knowledge> _knowledgeList { get; set; } = [];

    public KnowledgeRepository()
    {
        String directory = AppDomain.CurrentDomain.BaseDirectory;
        String knowledge = File.ReadAllText(Path.Join(directory, "knowledge.json"));

        JsonSerializerOptions options = new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true,
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase, // Use original property names
        };
        options.Converters.Add(new JsonStringEnumConverter());

        _knowledgeList = System.Text.Json.JsonSerializer.Deserialize<List<Knowledge>>(knowledge, options) ?? new List<Knowledge>();
    }

    public void AddKnowledge(Knowledge knowledge)
    {
        _knowledgeList.Add(knowledge);
    }

    public void DeleteKnowledge(Guid id)
    {
        _knowledgeList.RemoveAll(k => k.KnowledgeUId == id);
    }

    public IEnumerable<Knowledge> GetAllKnowledge()
    {
        return _knowledgeList;
    }

    public Knowledge? GetKnowledgeById(Guid id)
    {
        return _knowledgeList.Find(k => k.KnowledgeUId == id);
    }

    public void UpdateKnowledge(Knowledge knowledge)
    {
        
    }
}
