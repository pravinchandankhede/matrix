// ------------------------------------------------------------------------------
//  Author: Pravin Chandankhede
//  Copyright (c) 2025 Pravin Chandankhede
//  This file is part of the Matrix project.
//  Licensed under the MIT License. See LICENSE file in the project root for details.
//  THIS CODE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND.
// ------------------------------------------------------------------------------

namespace Matrix.ModelLayer.Registry;

using Matrix.DataModels.Models;
using Matrix.ModelLayer.DataLayer;
using Matrix.ModelLayer.Interfaces;
using System.Collections.Generic;

/// <summary>
/// A registry for managing Models in the ecosystem, allowing registration, update, retrieval, listing, and removal of Models.
/// </summary>
public class ModelRegistry
{
    private readonly IModelRepository _repository = new ModelRepository();

    /// <summary>
    /// Registers a new Model in the registry.
    /// </summary>
    /// <param name="Model">The Model to register.</param>
    /// <returns>True if the Model was added; false if an Model with the same name already exists.</returns>
    public void RegisterModel(Model Model)
    {
        _repository.AddModel(Model);
    }

    /// <summary>
    /// Updates an existing Model in the registry.
    /// </summary>
    /// <param name="Model">The Model with updated information.</param>
    /// <returns>True if the Model was updated.</returns>
    public Boolean UpdateModel(Model Model)
    {
        _repository.UpdateModel(Model);
        return true;
    }

    /// <summary>
    /// Retrieves an Model by name.
    /// </summary>
    /// <param name="name">The name of the Model.</param>
    /// <returns>The Model if found; otherwise, null.</returns>
    public Model? GetModel(String name)
    {
        Model? Model = _repository.GetModel(name);
        return Model;
    }

    /// <summary>
    /// Gets all registered Models in the registry.
    /// </summary>
    /// <returns>An enumerable of all Models.</returns>
    public IEnumerable<Model> GetAllModels() => _repository.GetAllModels();

    /// <summary>
    /// Removes an Model from the registry by name.
    /// </summary>
    /// <param name="name">The name of the Model to remove.</param>
    /// <returns>True if the Model was removed; otherwise, false.</returns>
    public Boolean RemoveModel(String name)
    {
        _repository.RemoveModel(name);
        return true;
    }
}
