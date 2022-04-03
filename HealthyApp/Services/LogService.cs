namespace HealthyApp.Services
{
    using HealthyApp.Data;
    using HealthyApp.Data.Models.Common;
    using HealthyApp.Interfaces;
    using Microsoft.EntityFrameworkCore;

    public class LogService : ILogService
    {
        private readonly HealthAppDbContext _ctx;
        public LogService(HealthAppDbContext ctx)
        {
            _ctx = ctx;
        }

        public async Task<CustomException> GetExceptionByIdAsync(Guid id)
        {
            return await _ctx.CustomExceptions.AsNoTracking()
                           .FirstOrDefaultAsync(u => u.Id == id);
        }

        public async Task<IEnumerable<CustomException>> GetTop10ExceptionAsync()
        {
            return await _ctx.CustomExceptions.AsNoTracking()
                .OrderByDescending(ce => ce.DateCreated).Take(10).ToListAsync();         
        }

        public async Task<string> LogExceptionAsync(Exception ex)
        {
            var ce = new CustomException(ex);
            await _ctx.CustomExceptions.AddAsync(ce);
            await _ctx.SaveChangesAsync();
            return ce.ClientErrorMessage;
        }
    }
}
