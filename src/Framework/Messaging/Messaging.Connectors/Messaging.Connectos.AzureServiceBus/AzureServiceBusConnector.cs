// ------------------------------------------------------------------------------
//  Author: Pravin Chandankhede
//  Copyright (c) 2025 Pravin Chandankhede
//  This file is part of the Matrix project.
//  Licensed under the MIT License. See LICENSE file in the project root for details.
//  THIS CODE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND.
// ------------------------------------------------------------------------------

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
