namespace Matrix.KnowledgeLayer.Interfaces;

using Matrix.DataModels.Knowledge;
using System;
using System.Collections.Generic;

public interface IKnowledgeRepository
{
    /// <summary>
    /// Gets the knowledge by its identifier.
    /// </summary>
    /// <param name="id">The identifier of the knowledge.</param>
    /// <returns>The knowledge if found; otherwise, null.</returns>
    Knowledge? GetKnowledgeById(Guid id);
    /// <summary>
    /// Gets all knowledge entries.
    /// </summary>
    /// <returns>A collection of all knowledge entries.</returns>
    IEnumerable<Knowledge> GetAllKnowledge();
    /// <summary>
    /// Adds a new knowledge entry.
    /// </summary>
    /// <param name="knowledge">The knowledge to add.</param>
    void AddKnowledge(Knowledge knowledge);
    /// <summary>
    /// Updates an existing knowledge entry.
    /// </summary>
    /// <param name="knowledge">The knowledge to update.</param>
    void UpdateKnowledge(Knowledge knowledge);
    /// <summary>
    /// Deletes a knowledge entry by its identifier.
    /// </summary>
    /// <param name="id">The identifier of the knowledge to delete.</param>
    void DeleteKnowledge(Guid id);
}
