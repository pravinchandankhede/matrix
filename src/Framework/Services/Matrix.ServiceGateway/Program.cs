
namespace Matrix.ServiceGateway;

using Ocelot.DependencyInjection;
using Ocelot.Middleware;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Add services to the container.

        builder.Services.AddControllers();
        // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();

        builder.Configuration
            .AddOcelot("ocelot.json", optional: false, reloadOnChange: true)
            ;
        builder.Services.AddOcelot(builder.Configuration);

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

        var app = builder.Build();

        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        //app.UseHttpsRedirection();
        app.UseCors(CorsPolicyName);
        //app.UseAuthorization();        
        app.MapControllers();

        // Use Ocelot middleware
        app.UseOcelot().Wait();

        app.Run();
    }
}
