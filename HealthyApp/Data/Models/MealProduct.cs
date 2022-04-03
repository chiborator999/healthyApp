namespace HealthyApp.Data.Models
{
    public class MealProduct
    {
        public int MealId { get; set; }

        public Meal Meal { get; set; }

        public int ProductId { get; set; }

        public Product Product { get; set; }
    }
}
