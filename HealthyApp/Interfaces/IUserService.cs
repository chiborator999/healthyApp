using HealthyApp.Models.ExerciseModel;

namespace HealthyApp.Interfaces
{
    public interface IUserService
    {
        Task AddProductToUserAsync(int productId);
        Task AddMealToUserAsync(int mealId);
        Task AddExerciseToUserAsync(int exerciseId, string userId);
        Task<IEnumerable<ExerciseViewModel>> GetAllExercisesAsync(string userId);
    }
}
