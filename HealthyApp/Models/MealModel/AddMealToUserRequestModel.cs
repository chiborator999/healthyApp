using System.ComponentModel.DataAnnotations;

namespace HealthyApp.Models.ExerciseModel
{
    public class AddMealToUserRequestModel
    {
        public int mealId { get; set; }

        [Required]
        public string userId { get; set; }
    }
}
