using HealthyApp.Data;
using Microsoft.EntityFrameworkCore;

namespace HealthyApp.Infrastructure
{
    public static class ApplicationBuilderExtensions
    {
        public static void ApplyMigrations(this IApplicationBuilder applicationBuilder)
        {
            using var services = applicationBuilder.ApplicationServices.CreateScope();

            var dbContext = services.ServiceProvider.GetService<HealthAppDbContext>();

            dbContext.Database.Migrate();
        }
    }
}
