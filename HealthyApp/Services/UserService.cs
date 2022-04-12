namespace HealthyApp.Services
{
    using HealthyApp.Data;
    using HealthyApp.Data.Models;
    using HealthyApp.Interfaces;
    using HealthyApp.Models.ExerciseModel;
    using Microsoft.EntityFrameworkCore;
    using System.Threading.Tasks;

    public class UserService : IUserService
    {
        private readonly HealthAppDbContext _ctx;

        public UserService( HealthAppDbContext ctx)
        {
            _ctx = ctx;
        }

        public async Task AddExerciseToUserAsync(int exerciseId, string userId)
        {
           var user = _ctx.Users.FirstOrDefault(u => u.Id == userId);
            if (user == null)
            {
                throw new Exception($"User with id: {userId} does not exist!");
            }

            var exercise = _ctx.Exercises.FirstOrDefault(e => e.Id == exerciseId);
            if (exercise == null)
            {
                throw new Exception($"Exercise with id: {exerciseId} does not exist!");
            }

            var model = new ExerciseUser { Exercise = exercise, ExerciseId = exercise.Id, User = user, UserId = user.Id};

            user.ExerciseUser.Add(model);
            await _ctx.SaveChangesAsync();
        }

        public async Task<IEnumerable<ExerciseViewModel>> GetAllExercisesAsync(string userId)
        {
            var exerciseList = await _ctx.ExerciseUsers.Include(e => e.Exercise).Where(u => u.UserId == userId).AsNoTracking().ToListAsync();

            var exerciseViewList = exerciseList.Select(e => e.Exercise).Select(ue => new ExerciseViewModel
            {
                Id = ue.Id,
                Name = ue.Name,
                KCalSpent = ue.KCalSpent,
            });

            return exerciseViewList;
        }

        public Task AddMealToUserAsync(int mealId)
        {
            throw new NotImplementedException();
        }

        public Task AddProductToUserAsync(int productId)
        {
            throw new NotImplementedException();
        }
    }
}
