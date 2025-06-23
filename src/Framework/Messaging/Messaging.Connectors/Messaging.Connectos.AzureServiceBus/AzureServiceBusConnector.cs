namespace Matrix.Messaging.Connectos.AzureServiceBus;

using Matrix.Messaging.Interfaces;
using Matrix.Messaging.Models.Request;
using Matrix.Messaging.Models.Response;
using System.Threading.Tasks;

internal class AzureServiceBusConnector : IMessagingConnector
{
    public Task<MessageResponse> ReceiveMessageAsync()
    {
        throw new NotImplementedException();
    }

    public Task SendMessageAsync(MessageRequest message)
    {
        throw new NotImplementedException();
    }
}
