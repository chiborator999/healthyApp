using System.ComponentModel.DataAnnotations;

namespace HealthyApp.Models.ExerciseModel
{
    public class RemoveUserExerciseModel
    {
        public int exerciseId { get; set; }

        [Required]
        public string userId { get; set; }
    }
}
