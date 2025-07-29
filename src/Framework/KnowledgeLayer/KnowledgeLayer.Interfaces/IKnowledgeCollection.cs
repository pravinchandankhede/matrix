namespace Matrix.KnowledgeLayer.Interfaces;

using Matrix.KnowledgeLayer.DataModels;

public interface IKnowledgeCollection
{
    void AddKnowledge(Knowledge knowledge);
    Knowledge? GetKnowledge(string name);
    IEnumerable<Knowledge> GetAllKnowledge();
}
