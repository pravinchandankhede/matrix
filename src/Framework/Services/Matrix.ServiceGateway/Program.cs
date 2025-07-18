
namespace Matrix.ServiceGateway;

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

        app.UseHttpsRedirection();
        app.UseCors(CorsPolicyName);
        app.UseAuthorization();        
        app.MapControllers();
        app.Run();
    }
}
