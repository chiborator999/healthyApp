namespace HealthyApp.Data.Models
{
    using System.ComponentModel.DataAnnotations;

    public class Exercise
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string KCalSpent { get; set; }

        public ICollection<ExerciseUser> ExerciseUser { get; set; }
    }
}
