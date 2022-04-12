namespace HealthyApp.Data.Models
{
    public class ExerciseUser
    {
        public int ExerciseId { get; set; }

        public Exercise Exercise { get; set; }

        public string UserId { get; set; }

        public User User { get; set; }
    }
}
