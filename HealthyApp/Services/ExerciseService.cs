namespace HealthyApp.Services
{
    using HealthyApp.Data;
    using HealthyApp.Data.Models;
    using HealthyApp.Interfaces;
    using HealthyApp.Models.ExerciseModel;
    using Microsoft.EntityFrameworkCore;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    public class ExerciseService : IExerciseService
    {
        private readonly HealthAppDbContext _ctx;

        public ExerciseService(HealthAppDbContext ctx)
        {
            _ctx = ctx;
        }

        public async Task CreateExerciseAsync(Exercise exercise)
        {
            await _ctx.AddAsync(exercise);
            await _ctx.SaveChangesAsync();
        }

        public async Task<IEnumerable<ExerciseViewModel>> GetAllExercisesAsync()
        {
            var exercisesList = await _ctx.Exercises.AsNoTracking().ToListAsync();

            var exercisesViewList = exercisesList.Select(exercise => new ExerciseViewModel
            {
                                                        Id = exercise.Id,
                                                        Name = exercise.Name,
                                                        KCalSpent = exercise.KCalSpent
                                                    });

            return exercisesViewList;
        }

        public async Task<ExerciseViewModel> GetExerciseByIdAsync(int exerciseId)
        {
            var exercise = await _ctx.Exercises.AsNoTracking().FirstOrDefaultAsync(exercise => exercise.Id == exerciseId);

            if (exercise is null)
            {
                throw new Exception($"Exercise with id: {exerciseId} does not exist!");
            }

            var exerciseViewById = new ExerciseViewModel
            {
                Id = exercise.Id,
                Name = exercise.Name,
                KCalSpent = exercise.KCalSpent
            };

            return exerciseViewById;
        }

        public async Task RemoveExerciseAsync(int exerciseId)
        {
            var exercise = _ctx.Exercises.FirstOrDefault(exercise => exercise.Id == exerciseId);

            if (exercise is null)
            {
                throw new Exception($"Exercise with id: {exerciseId} does not exist!");
            }

            _ctx.Exercises.Remove(exercise);
            await _ctx.SaveChangesAsync();
        }

        public async Task UpdateExerciseAsync(Exercise exercise)
        {
            _ctx.Entry(exercise).State = EntityState.Modified;
            await _ctx.SaveChangesAsync();
        }

        public async Task<Exercise> GetExerciseToUserByIdAsync(int exerciseId)
        {
            var exercise = await _ctx.Exercises.AsNoTracking().FirstOrDefaultAsync(exercise => exercise.Id == exerciseId);

            if (exercise is null)
            {
                throw new Exception($"Exercise with id: {exerciseId} does not exist!");
            }

            var exerciseViewById = new Exercise
            {
                Id = exercise.Id,
                Name = exercise.Name,
                KCalSpent = exercise.KCalSpent
            };

            return exerciseViewById;
        }
    }
}
