namespace Matrix.Messaging.Models;
using System;

/// <summary>
/// Represents the base structure for a message, containing common properties such as sender, recipient, content, and metadata.
/// </summary>
/// <remarks>
/// This class serves as a foundational type for messages, providing standard properties that can be extended in derived types.
/// It includes metadata such as a unique identifier, timestamp, and correlation ID for tracking purposes.
/// </remarks>
public class MessageBase
{
    /// <summary>
    /// Gets or sets the unique identifier for the message.
    /// </summary>
    public String? MessageId { get; set; }

    /// <summary>
    /// Gets or sets the identifier of the sender.
    /// </summary>
    public String? SenderId { get; set; }

    /// <summary>
    /// Gets or sets the identifier of the recipient.
    /// </summary>
    public String? RecipientId { get; set; }

    /// <summary>
    /// Gets or sets the content of the message.
    /// </summary>
    public String? Content { get; set; }

    /// <summary>
    /// Gets or sets the timestamp indicating when the message was created or sent (in UTC).
    /// </summary>
    public DateTime Timestamp { get; set; } = DateTime.UtcNow;

    /// <summary>
    /// Gets or sets a value indicating whether the message has been read.
    /// </summary>
    public Boolean IsRead { get; set; } = false;

    /// <summary>
    /// Gets or sets the correlation identifier used for tracking related messages or operations.
    /// </summary>
    public Guid CorrelationId { get; set; } = Guid.NewGuid();
}
