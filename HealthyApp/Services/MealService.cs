﻿namespace HealthyApp.Services
{
    using HealthyApp.Data;
    using HealthyApp.Data.Models;
    using HealthyApp.Interfaces;
    using HealthyApp.Models.MealModel;
    using HealthyApp.Models.ProductModel;
    using Microsoft.EntityFrameworkCore;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    public class MealService : IMealService
    {
        private readonly HealthAppDbContext _ctx;

        public MealService(HealthAppDbContext ctx)
        {
            _ctx = ctx;
        }

        public async Task CreateMealAsync(Meal meal)
        {
            await _ctx.AddAsync(meal);
            await _ctx.SaveChangesAsync();
        }

        public async Task<IEnumerable<MealViewModel>> GetAllMealsAsync()
        {
            var mealList = await _ctx.Meals.Include(mp => mp.Products).ThenInclude(p => p.Product).AsNoTracking().ToListAsync();

            var allMealViewList = mealList.Select(m => new MealViewModel
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
            });

            return allMealViewList;
        }

    public async Task<MealViewModel> GetMealByIdAsync(int mealId)
    {
        var meal = await _ctx.Meals.Include(mp => mp.Products).ThenInclude(m => m.Product).AsNoTracking().FirstOrDefaultAsync(m => m.Id == mealId);

        if (meal is null)
        {
            throw new Exception($"Meal with id: {mealId} does not exist!");
        }

        var mealViewById = new MealViewModel
        {
            Id = meal.Id,
            MealType = meal.MealType,
            MealCategory = meal.MealCategory,
            Products = meal.Products.Select(mp => mp.Product)
                                    .Select(p => new ProductViewModel {
                                        Id = p.Id,
                                        Name = p.Name,
                                        KCal = p.KCal,
                                        Fat = p.Fat,
                                        Protein = p.Protein,
                                        Carbohydrate = p.Carbohydrate
                                    }).ToList()
        };

        return mealViewById;
    }

    public async Task RemoveMealAsync(int mealId)
    {
        var meal = _ctx.Meals.FirstOrDefault(meal => meal.Id == mealId);

        if (meal is null)
        {
            throw new Exception($"Meal with id: {mealId} does not exist!");
        }

        _ctx.Meals.Remove(meal);
        await _ctx.SaveChangesAsync();
    }

    public async Task UpdateMealAsync(Meal meal)
    {
        _ctx.Entry(meal).State = EntityState.Modified;
        await _ctx.SaveChangesAsync();
    }
}
}