namespace HealthyApp.Interfaces
{
    using HealthyApp.Data.Models;
    using HealthyApp.Models.MealModel;

    public interface IMealService
    {
        Task<IEnumerable<MealViewModel>> GetAllMealsAsync();
        Task<MealViewModel> GetMealByIdAsync(int mealId);
        Task<double> GetMealKCalByIdAsync(int mealId);
        Task<double> GetFatKCalByIdAsync(int mealId);
        Task<double> GetProteinKCalByIdAsync(int mealId);
        Task<double> GetCarbohydrateKCalByIdAsync(int mealId);
        Task CreateMealAsync(Meal meal);
        Task UpdateMealAsync(Meal meal);
        Task RemoveMealAsync(int mealId);
    }
}
