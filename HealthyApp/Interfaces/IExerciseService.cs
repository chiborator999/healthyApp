namespace HealthyApp.Interfaces
{
    using HealthyApp.Data.Models;
    using HealthyApp.Models.ExerciseModel;

    public interface IExerciseService
    {
        Task<IEnumerable<ExerciseViewModel>> GetAllExercisesAsync();
        Task<ExerciseViewModel> GetExerciseByIdAsync(int exerciseId);
        Task CreateExerciseAsync(Exercise exercise);
        Task UpdateExerciseAsync(Exercise exercise);
        Task RemoveExerciseAsync(int exerciseId);
    }
}
