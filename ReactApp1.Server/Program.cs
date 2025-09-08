
using Microsoft.EntityFrameworkCore;
using ReactApp1.Server.Data;

namespace ReactApp1.Server
{
    public class Program
    {
        public static void Main(string[] args)
        {

            var builder = WebApplication.CreateBuilder(args);

            var config = builder.Configuration;
            var mysqlDb = config["MySQL:Db"];
            var mysqlUser = config["MySQL:User"];
            var mysqlPassword = config["MySQL:Password"];
            var mysqlConn = $"server=localhost;port=3306;user={mysqlUser};password={mysqlPassword}; database={mysqlDb};CharSet=utf8;TreatTinyAsBoolean=false";
            builder.Services.AddDbContext<AppDbContext>(options =>
            options.UseMySql(mysqlConn, ServerVersion.AutoDetect(mysqlConn)
            ));



            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
            builder.Services.AddOpenApi();

            var app = builder.Build();

            app.UseDefaultFiles();
            app.MapStaticAssets();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.MapOpenApi();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();

            app.MapFallbackToFile("/index.html");

            app.Run();
        }
    }
}
