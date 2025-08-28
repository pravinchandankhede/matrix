namespace KnowledgeLayer.Services;

using Matrix.ChunkEngine.Interfaces;
using Matrix.ChunkEngine.Worker;
using Matrix.DataSourceLayer.DataLayer;
using Matrix.DataSourceLayer.Interfaces;
using Matrix.EmbeddingEngine.Interfaces;
using Matrix.EmbeddingEngine.Worker;
using Matrix.KnowledgeLayer.DataLayer;
using Matrix.KnowledgeLayer.Interfaces;
using Matrix.KnowledgeLayer.Worker;
using System.Text.Json;
using System.Text.Json.Serialization;

public class Program
{
    public static void Main(String[] args)
    {
        WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

        // Add services to the container.

        builder.Services.AddControllers()
            .AddJsonOptions(options =>
            {
                options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
                options.JsonSerializerOptions.PropertyNameCaseInsensitive = true;
                options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase; // Use original property names
            });
        // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();

        builder.Services.AddSingleton<IKnowledgeRepository, KnowledgeRepository>();
        builder.Services.AddSingleton<IDataSourceRepository, DataSourceRepository>();
        builder.Services.AddSingleton<DataSourceManager>();
        builder.Services.AddSingleton<IChunkProcessor, ChunkProcessor>();
        builder.Services.AddSingleton<IEmbedProcessor, EmbedProcessor>();
        builder.Services.AddSingleton<KnowledgeProcessor>();
        //builder.Services.AddHostedService<KnowledgeBackgroundService>();

        WebApplication app = builder.Build();

        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseHttpsRedirection();

        app.UseAuthorization();

        app.MapControllers();

        app.Run();
    }
}
