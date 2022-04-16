using System.ComponentModel.DataAnnotations;

namespace HealthyApp.Models.MealModel
{
    public class RemoveUserMealModel
    {
        public int mealId { get; set; }

        [Required]
        public string userId { get; set; }
    }
}
