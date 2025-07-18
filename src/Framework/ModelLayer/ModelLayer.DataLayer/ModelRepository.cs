namespace Matrix.ModelLayer.DataLayer;

using Matrix.ModelLayer.DataModels;
using System.Collections.Generic;

public class ModelRepository : IModelRepository
{
    public List<Model> modelList { get; set; } = [];

    public ModelRepository()
    {
        var directory = AppDomain.CurrentDomain.BaseDirectory;
        var models = File.ReadAllText(Path.Join(directory,"models.json"));
        // Assuming models.json contains a JSON array of Model objects
        modelList = System.Text.Json.JsonSerializer.Deserialize<List<Model>>(models) ?? new List<Model>();
    }

    public void AddModel(Model model)
    {
        modelList.Add(model);
    }

    public IEnumerable<Model> GetAllModels()
    {
        return modelList;
    }

    public Model? GetModel(String name)
    {
        return modelList.FirstOrDefault(m => m.Name.Equals(name, StringComparison.OrdinalIgnoreCase));
    }

    public void RemoveModel(String name)
    {
        modelList.RemoveAll(m => m.Name.Equals(name, StringComparison.OrdinalIgnoreCase));
    }

    public void UpdateModel(Model model)
    {
        var modelIndex = modelList.FindIndex(m => m.Name.Equals(model.Name, StringComparison.OrdinalIgnoreCase));
        if (modelIndex >= 0)
        {
            modelList[modelIndex] = model;
        }
        else
        {
            throw new KeyNotFoundException($"Model with name {model.Name} not found.");
        }
    }
}
