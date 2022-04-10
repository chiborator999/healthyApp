using HealthyApp.Data.Models;
using HealthyApp.Interfaces;
using HealthyApp.Models.MealModel;
using Microsoft.AspNetCore.Mvc;

namespace HealthyApp.Controllers
{
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

                var updatedMeal = new Meal
                {
                    Id = meal.Id,
                    MealType = mealModel.MealType,
                    MealCategory = mealModel.MealCategory
                };

                foreach (var item in mealModel.Products)
                {
                    updatedMeal.Products.Add(new MealProduct()
                    {
                        ProductId = item.ProductId,
                        MealId = meal.Id
                    });
                }

                await _mealService.UpdateMealAsync(updatedMeal);

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

        [HttpGet]
        [Route(nameof(GetMealKCal))]
        public async Task<IActionResult> GetMealKCal(int mealId)
        {
            try
            {
                return Ok(await _mealService.GetMealKCalByIdAsync(mealId));
            }
            catch (Exception ex)
            {
                return BadRequest(await _logService.LogExceptionAsync(ex));
            }
        }

        [HttpGet]
        [Route(nameof(GetMealFatKCal))]
        public async Task<IActionResult> GetMealFatKCal(int mealId)
        {
            try
            {
                return Ok(await _mealService.GetFatKCalByIdAsync(mealId));
            }
            catch (Exception ex)
            {
                return BadRequest(await _logService.LogExceptionAsync(ex));
            }
        }

        [HttpGet]
        [Route(nameof(GetMealProteinKCal))]
        public async Task<IActionResult> GetMealProteinKCal(int mealId)
        {
            try
            {
                return Ok(await _mealService.GetProteinKCalByIdAsync(mealId));
            }
            catch (Exception ex)
            {
                return BadRequest(await _logService.LogExceptionAsync(ex));
            }
        }

        [HttpGet]
        [Route(nameof(GetMealCarbohydrateKCal))]
        public async Task<IActionResult> GetMealCarbohydrateKCal(int mealId)
        {
            try
            {
                return Ok(await _mealService.GetCarbohydrateKCalByIdAsync(mealId));
            }
            catch (Exception ex)
            {
                return BadRequest(await _logService.LogExceptionAsync(ex));
            }
        }
    }
}
