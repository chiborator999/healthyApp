using HealthyApp.Data.Models;
using HealthyApp.Interfaces;
using HealthyApp.Models.ExerciseModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HealthyApp.Controllers
{
    [Authorize]
    public class ExerciseController : ApiController
    {
        private readonly IExerciseService _exerciseService;
        private readonly ILogService _logService;

        public ExerciseController(IExerciseService exerciseService, ILogService logService)
        {
            _exerciseService = exerciseService;
            _logService = logService;
        }

        [HttpPost]
        [Route(nameof(Create))]
        public async Task<IActionResult> Create([FromBody] ExerciseRequestModel exerciseModel)
        {
            try
            {
                var exercise = new Exercise
                {
                    Name = exerciseModel.Name,
                    KCalSpent = exerciseModel.KCalSpent
                };

                await _exerciseService.CreateExerciseAsync(exercise);

                return Ok($"Successfuly created Exercise with id: {exercise.Id}");
            }
            catch (Exception ex)
            {
                return BadRequest(await _logService.LogExceptionAsync(ex));
            };
        }

        [HttpPut]
        [Route(nameof(Update))]
        public async Task<IActionResult> Update([FromBody] ExerciseRequestModel exerciseModel)
        {
            try
            {
                var exercise = await _exerciseService.GetExerciseByIdAsync(exerciseModel.Id);

                if(exercise == null)
                {
                    return BadRequest($"Exercise with id: {exerciseModel.Id} can not be found!");
                }

                var updatedExercise = new Exercise
                {
                    Id = exercise.Id,
                    Name = exerciseModel.Name,
                    KCalSpent = exerciseModel.KCalSpent
                };

                await _exerciseService.UpdateExerciseAsync(updatedExercise);

                return Ok($"Successfuly updated Exercise with id: {exercise.Id}");
            }
            catch (Exception ex)
            {
                return BadRequest(await _logService.LogExceptionAsync(ex));
            };
        }

        [HttpDelete]
        [Route(nameof(Remove))]
        public async Task<IActionResult> Remove(int exerciseId)
        {
            try
            {
                await _exerciseService.RemoveExerciseAsync(exerciseId);
                return Ok($"Successfuly remove Exercise with id: {exerciseId}");
            }
            catch (Exception ex)
            {
                return BadRequest(await _logService.LogExceptionAsync(ex));
            }
        }

        [HttpGet]
        [Route(nameof(GetById))]
        public async Task<IActionResult> GetById(int exerciseId)
        {
            try
            {
                return Ok(await _exerciseService.GetExerciseByIdAsync(exerciseId));
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
                return Ok(await _exerciseService.GetAllExercisesAsync());
            }
            catch (Exception ex)
            {
                return BadRequest(await _logService.LogExceptionAsync(ex));
            }
        }
    }
}
