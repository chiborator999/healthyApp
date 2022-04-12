namespace HealthyApp.Data.Models
{
    public class MealUser
    {
        public int MealId { get; set; }

        public Meal Meal { get; set; }

        public string UserId { get; set; }

        public User User { get; set; }
    }
}
