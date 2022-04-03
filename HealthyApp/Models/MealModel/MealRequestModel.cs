namespace HealthyApp.Models.MealModel
{
    using HealthyApp.Data.Enum;
    using HealthyApp.Data.Models;

    public class MealRequestModel
    {
        public int Id { get; set; }

        public MealType MealType { get; set; }

        public MealCategory MealCategory { get; set; }

        public HashSet<MealProduct> Products { get; set; } = new HashSet<MealProduct>();
    }
}
