﻿namespace HealthyApp.Interfaces
{
    using HealthyApp.Data.Models;
    using HealthyApp.Models.MealModel;

    public interface IMealService
    {
        Task<IEnumerable<MealViewModel>> GetAllMealsAsync();
        Task<MealViewModel> GetMealByIdAsync(int mealId);
        Task CreateMealAsync(Meal meal);
        Task UpdateMealAsync(MealRequestModel meal, MealRequestModel oldMeal);
        Task RemoveMealAsync(int mealId);
    }
}
