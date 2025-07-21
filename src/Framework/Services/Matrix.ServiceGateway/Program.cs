namespace Matrix.ServiceGateway;

using Microsoft.Extensions.Configuration;
using Ocelot.DependencyInjection;
using Ocelot.Middleware;

public class Program
{
    public static void Main(String[] args)
    {
        WebApplicationBuilder builder = WebApplication.CreateBuilder(args);
        
        builder.Services.AddControllers();
        // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();

        builder.Configuration
            .AddOcelot("ocelot.json", optional: false, reloadOnChange: true);
        builder.Services.AddOcelot(builder.Configuration);

        builder.Services.AddSwaggerForOcelot(builder.Configuration);
        
        // Read allowed origins from configuration
        String[]? allowedOrigins = builder.Configuration.GetSection("Cors:AllowedOrigins").Get<String[]>();
        const String CorsPolicyName = "AppCorsPolicy";
        builder.Services.AddCors(options =>
        {
            options.AddPolicy(name: CorsPolicyName,
                policy =>
                {
                    if (allowedOrigins != null && allowedOrigins.Length > 0)
                    {
                        policy.WithOrigins(allowedOrigins)
                              .AllowAnyHeader()
                              .AllowAnyMethod();
                    }
                });
        });

        WebApplication app = builder.Build();

        // Configure the HTTP request pipeline.
        app.UseSwagger();        
        app.UseSwaggerForOcelotUI();
        //app.UseHttpsRedirection();
        app.UseCors(CorsPolicyName);
        //app.UseAuthorization();        
        app.MapControllers();
        // Use Ocelot middleware
        app.UseOcelot().Wait();

        app.Run();
    }
}
