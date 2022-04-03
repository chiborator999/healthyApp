namespace HealthyApp.Interfaces
{
    using HealthyApp.Data.Models.Common;

    public interface ILogService
    {
        Task<string> LogExceptionAsync(Exception ex);
        Task<CustomException> GetExceptionByIdAsync(Guid id);
        Task<IEnumerable<CustomException>> GetTop10ExceptionAsync();
      
    }
}
