namespace Matrix.AgenticLayer.AgentModels;

public class AIModel
{
    public String? ModelName { get; set; }
    public String? ModelType { get; set; }
    public String? ModelVersion { get; set; }
    public String? ModelDescription { get; set; }
    public String? ModelProvider { get; set; }
    public String? ModelEndpoint { get; set; }
    public String? ModelApiKey { get; set; }
    public String? ModelRegion { get; set; }
    public Boolean IsEnabled { get; set; } = true;
}
