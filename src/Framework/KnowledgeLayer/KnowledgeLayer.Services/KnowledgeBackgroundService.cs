namespace KnowledgeLayer.Services;

using Matrix.KnowledgeLayer.Worker;
using Microsoft.Extensions.Hosting;
using System.Threading;
using System.Threading.Tasks;

public class KnowledgeBackgroundService : BackgroundService
{
    private readonly KnowledgeProcessor _knowledgeProcessor;

    public KnowledgeBackgroundService(KnowledgeProcessor knowledgeProcessor)
    {
        _knowledgeProcessor = knowledgeProcessor;
    }

    protected override Task ExecuteAsync(CancellationToken stoppingToken)
    {
        return Task.Run(() =>
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                _knowledgeProcessor.ProcessKnowledge();
                Task.Delay(TimeSpan.FromMinutes(5), stoppingToken).Wait(stoppingToken);
            }
        }, stoppingToken);
    }
}
