namespace Matrix.Messaging.Interfaces;

using Matrix.Messaging.Models.Request;
using Matrix.Messaging.Models.Response;

public interface IMessagingConnector
{
   /// <summary>
    ///     Sends a message to the messaging system.
    /// </summary>
    /// <param name="message">The message to send.</param>
    /// <returns>A task that represents the asynchronous operation.</returns>
    Task SendMessageAsync(MessageRequest message);

    /// <summary>
    ///     Receives a message from the messaging system.
    /// </summary>
    /// <returns>A task that represents the asynchronous operation, containing the received message.</returns>
    Task<MessageResponse> ReceiveMessageAsync();
}
