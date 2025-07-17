// ------------------------------------------------------------------------------
//  Author: Pravin Chandankhede
//  Copyright (c) 2025 Pravin Chandankhede
//  This file is part of the Matrix project.
//  Licensed under the MIT License. See LICENSE file in the project root for details.
//  THIS CODE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND.
// ------------------------------------------------------------------------------

namespace Matrix.ModelLayer.DataModels;

public class Model
{
    public required String Name { get; set; }
    public String? Type { get; set; }
    public String? Version { get; set; }
    public String? Description { get; set; }
    public String? Provider { get; set; }
    public String? Endpoint { get; set; }
    public String? ApiKey { get; set; }
    public String? Region { get; set; }
    public Boolean IsEnabled { get; set; } = true;
}
