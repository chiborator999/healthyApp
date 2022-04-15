namespace HealthyApp.Services
{
    using HealthyApp.Data;
    using HealthyApp.Data.Models;
    using HealthyApp.Interfaces;
    using HealthyApp.Models.ExerciseModel;
    using HealthyApp.Models.MealModel;
    using HealthyApp.Models.ProductModel;
    using Microsoft.EntityFrameworkCore;
    using System.Globalization;
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

            var exerciseUser = _ctx.ExerciseUsers.Select(e => e.ExerciseId == exercise.Id && e.UserId == user.Id).FirstOrDefault();
            if (exerciseUser)
            {
                throw new Exception($"Exercise with id: {exerciseId} is already in user list!");
            }

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

        public async Task AddMealToUserAsync(int mealId, string userId)
        {
            var user = _ctx.Users.FirstOrDefault(u => u.Id == userId);
            if (user == null)
            {
                throw new Exception($"User with id: {userId} does not exist!");
            }

            var meal = _ctx.Meals.FirstOrDefault(m => m.Id == mealId);
            if (meal == null)
            {
                throw new Exception($"Meal with id: {mealId} does not exist!");
            }

            var model = new MealUser { Meal = meal, MealId = meal.Id, User = user, UserId = user.Id };

            bool mealUser = _ctx.MealUsers.Select(m => m.MealId == meal.Id && m.UserId == user.Id).FirstOrDefault();
            if (mealUser)
            {
                throw new Exception($"Meal with id: {meal.Id} is already in user list!");
            }

            user.MealUsers.Add(model);
            await _ctx.SaveChangesAsync();
        }

        public async Task<IEnumerable<MealViewModel>> GetAllMealsAsync(string userId)
        {
            var mealUsersList = await _ctx.MealUsers.Where(m => m.UserId == userId).Include(p => p.Meal).AsNoTracking().ToListAsync();

            var mealsWithProducts = await _ctx.Meals.Include(mp => mp.Products).ThenInclude(p => p.Product).AsNoTracking().ToListAsync();

            var mealIds = mealUsersList.Select(m => m.MealId).ToList();

            var mealList = mealsWithProducts.Where(m => mealIds.Contains(m.Id));

            var userMealsViewList = mealList.Select(m => new MealViewModel
            {
                Id = m.Id,
                MealType = m.MealType,
                MealCategory = m.MealCategory,
                Products = m.Products.Select(mp => mp.Product)
                         .Select(p => new ProductViewModel
                         {
                             Id = p.Id,
                             Name = p.Name,
                             KCal = p.KCal,
                             Fat = p.Fat,
                             Protein = p.Protein,
                             Carbohydrate = p.Carbohydrate
                         }).ToList(),

                TotalKCal = m.Products.Select(mp => mp.Product.KCal)
                           .Sum(f => {
                               double result;
                               Double.TryParse(f.ToString(), NumberStyles.AllowDecimalPoint, CultureInfo.InvariantCulture, out result);
                               return result;
                           }),
            });

            return userMealsViewList;
        }

        public Task AddProductToUserAsync(int productId)
        {
            throw new NotImplementedException();
        }
    }
}
