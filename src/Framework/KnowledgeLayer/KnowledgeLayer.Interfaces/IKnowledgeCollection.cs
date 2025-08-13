namespace Matrix.KnowledgeLayer.Interfaces;

using Matrix.DataModels.Knowledge;

public interface IKnowledgeCollection
{
    void AddKnowledge(Knowledge knowledge);
    Knowledge? GetKnowledge(string name);
    IEnumerable<Knowledge> GetAllKnowledge();
}
