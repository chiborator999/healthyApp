using System.ComponentModel.DataAnnotations;

namespace HealthyApp.Models.ExerciseModel
{
    public class ExerciseViewModel
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string KCalSpent { get; set; }
    }
}
