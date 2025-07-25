﻿namespace Matrix.AgenticLayer.AgentModels;

public class AgentResponse
{
    public String Response { get; set; }
    public Boolean IsComplete { get; set; }

    override public String ToString()
    {
        return $"Response: {Response}, IsComplete: {IsComplete}";
    }
}
