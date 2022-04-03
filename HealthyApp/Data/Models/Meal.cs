namespace HealthyApp.Data.Models
{
    using HealthyApp.Data.Enum;

    public class Meal
    {
        public int Id { get; set; }

        public MealType MealType { get; set; }

        public MealCategory MealCategory { get; set; }

        public ICollection<MealProduct> Products { get; set; } = new HashSet<MealProduct>();
    }
}
