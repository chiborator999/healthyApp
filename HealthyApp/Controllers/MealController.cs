﻿using HealthyApp.Data.Models;
using HealthyApp.Interfaces;
using HealthyApp.Models.MealModel;
using HealthyApp.Models.MealProductModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HealthyApp.Controllers
{
    [Authorize]
    public class MealController : ApiController
    {
        private readonly IMealService _mealService;
        private readonly IProductService _productService;
        private readonly ILogService _logService;

        public MealController(IMealService mealService, IProductService productService, ILogService logService)
        {
            _mealService = mealService;
            _logService = logService;
            _productService = productService;
        }

        [HttpPost]
        [Route(nameof(Create))]
        public async Task<IActionResult> Create([FromBody] MealRequestModel mealModel)
        {
            try
            {
                var meal = new Meal
                {
                    MealType = mealModel.MealType,
                    MealCategory = mealModel.MealCategory
                };

                foreach (var item in mealModel.Products)
                {
                    meal.Products.Add(new MealProduct()
                    {
                        ProductId = item.ProductId,
                        MealId = meal.Id
                    });
                }

                await _mealService.CreateMealAsync(meal);

                return Ok($"Successfuly created Meal with id: {meal.Id}");
            }
            catch (Exception ex)
            {
                return BadRequest(await _logService.LogExceptionAsync(ex));
            };
        }

        [HttpPut]
        [Route(nameof(Update))]
        public async Task<IActionResult> Update([FromBody] MealRequestModel mealModel)
        {
            try
            {
                var meal = await _mealService.GetMealByIdAsync(mealModel.Id);

                if (meal == null)
                {
                    return BadRequest($"Meal with id: {mealModel.Id} can not be found!");
                }

                var oldMeal = new MealRequestModel
                {
                    Id = meal.Id,
                    MealType = meal.MealType,
                    MealCategory = meal.MealCategory,
                    Products = meal.Products.Select(p => new MealProductRequestModel()
                    {
                        ProductId = p.Id
                    }).ToHashSet()
                };

                var updatedMeal = new MealRequestModel
                {
                    Id = meal.Id,
                    MealType = mealModel.MealType,
                    MealCategory = mealModel.MealCategory
                };

                foreach (var item in mealModel.Products)
                {
                    updatedMeal.Products.Add(new MealProductRequestModel()
                    {
                        ProductId = item.ProductId,
                    });
                }

                await _mealService.UpdateMealAsync(updatedMeal, oldMeal);

                return Ok($"Successfuly updated Meal with id: {meal.Id}");
            }
            catch (Exception ex)
            {
                return BadRequest(await _logService.LogExceptionAsync(ex));
            };
        }

        [HttpDelete]
        [Route(nameof(Remove))]
        public async Task<IActionResult> Remove(int mealId)
        {
            try
            {
                await _mealService.RemoveMealAsync(mealId);
                return Ok($"Successfuly remove Meal with id: {mealId}");
            }
            catch (Exception ex)
            {
                return BadRequest(await _logService.LogExceptionAsync(ex));
            }
        }

        [HttpGet]
        [Route(nameof(GetById))]
        public async Task<IActionResult> GetById(int mealId)
        {
            try
            {
                return Ok(await _mealService.GetMealByIdAsync(mealId));
            }
            catch (Exception ex)
            {
                return BadRequest(await _logService.LogExceptionAsync(ex));
            }
        }

        [HttpGet]
        [Route(nameof(GetAll))]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                return Ok(await _mealService.GetAllMealsAsync());
            }
            catch (Exception ex)
            {
                return BadRequest(await _logService.LogExceptionAsync(ex));
            }
        }
    }
}
