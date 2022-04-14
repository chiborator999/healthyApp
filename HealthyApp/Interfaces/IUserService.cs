using HealthyApp.Models.ExerciseModel;
using HealthyApp.Models.MealModel;

namespace HealthyApp.Interfaces
{
    public interface IUserService
    {
        Task AddProductToUserAsync(int productId);
        Task AddMealToUserAsync(int mealId, string userId);
        Task AddExerciseToUserAsync(int exerciseId, string userId);
        Task<IEnumerable<ExerciseViewModel>> GetAllExercisesAsync(string userId);
        Task<IEnumerable<MealViewModel>> GetAllMealsAsync(string userId);
    }
}
