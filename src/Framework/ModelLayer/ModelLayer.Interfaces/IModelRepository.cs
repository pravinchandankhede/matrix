namespace Matrix.ModelLayer.Interfaces;

using Matrix.DataModels.Models;

public interface IModelRepository
{
    void AddModel(Model model);
    Model? GetModel(Guid modelUId);
    IEnumerable<Model> GetAllModels();
    void RemoveModel(String name);
    void UpdateModel(Model model);
}
