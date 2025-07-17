namespace Matrix.ModelLayer.DataLayer;

using Matrix.ModelLayer.DataModels;

public interface IModelRepository
{
    void AddModel(Model model);
    Model? GetModel(String name);
    IEnumerable<Model> GetAllModels();
    void RemoveModel(String name);
    void UpdateModel(Model model);
}
